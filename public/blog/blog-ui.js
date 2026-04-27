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
  progressBar.style.top = "52px";
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

  // 하단 고정 메뉴
  var bottomNav = document.createElement("nav");
  bottomNav.className = "blog-bottom-nav";
  var navItems = [
    { href: "/", label: "홈", path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
    { href: "/tarot/draw/?master=sera", label: "운세보기", path: "M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M12 2v4 M12 18v4" },
    { href: "/blog/", label: "블로그", path: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" },
    { href: "/faq/", label: "FAQ", path: "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01" },
  ];
  var currentPath = window.location.pathname;
  var navInner = document.createElement("div");
  navInner.className = "blog-bottom-nav-inner";
  navItems.forEach(function (item) {
    var a = document.createElement("a");
    a.href = item.href;
    var isActive = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href.split("?")[0]);
    a.className = "blog-bottom-nav-item" + (isActive ? " is-active" : "");
    var color = isActive ? "#7B3BC7" : "#999";
    a.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + item.path + '"/></svg><span>' + item.label + "</span>";
    navInner.appendChild(a);
  });
  bottomNav.appendChild(navInner);
  document.body.appendChild(bottomNav);

  // 하단 여백
  var navSpacer = document.createElement("div");
  navSpacer.style.height = "68px";
  document.body.appendChild(navSpacer);

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
      progressBar.style.top = "52px";
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
