(function () {
  var header = document.querySelector(".blog-site-header");
  if (!header) return;

  // 헤더 스페이서 추가
  var spacer = document.createElement("div");
  spacer.className = "blog-header-spacer";
  header.parentNode.insertBefore(spacer, header.nextSibling);

  // 프로그레스 바 생성
  var progressBar = document.createElement("div");
  progressBar.className = "blog-progress-bar";
  progressBar.style.top = "42px";
  var progressInner = document.createElement("div");
  progressInner.className = "blog-progress-bar-inner";
  progressBar.appendChild(progressInner);
  document.body.appendChild(progressBar);

  // 위로가기 버튼 생성
  var scrollBtn = document.createElement("button");
  scrollBtn.className = "blog-scroll-top";
  scrollBtn.setAttribute("aria-label", "맨 위로 이동");
  scrollBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(scrollBtn);

  // 스크롤 이벤트
  var lastY = 0;
  var headerVisible = true;

  window.addEventListener("scroll", function () {
    var currentY = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 프로그레스 바
    var progress = docHeight > 0 ? Math.min(100, (currentY / docHeight) * 100) : 0;
    progressInner.style.width = progress + "%";
    if (progress <= 0) {
      progressBar.style.display = "none";
    } else {
      progressBar.style.display = "";
    }

    // 헤더 숨김/표시
    if (currentY <= 10) {
      headerVisible = true;
    } else if (currentY < lastY) {
      headerVisible = true;
    } else if (currentY > lastY + 5) {
      headerVisible = false;
    }

    if (headerVisible) {
      header.classList.remove("is-hidden");
      progressBar.style.top = "42px";
    } else {
      header.classList.add("is-hidden");
      progressBar.style.top = "0px";
    }

    if (currentY < lastY || currentY > lastY + 5) {
      lastY = currentY;
    }

    // 위로가기 버튼
    if (currentY > 300) {
      scrollBtn.classList.add("is-visible");
    } else {
      scrollBtn.classList.remove("is-visible");
    }
  }, { passive: true });
})();
