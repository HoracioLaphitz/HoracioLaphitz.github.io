import { useState, useEffect, useCallback, useRef } from "react";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import { PUBLIC_POSITIONING } from "@data/public-positioning.v1";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy — detect which section is in view
  useEffect(() => {
    const sectionIds = ["inicio", "about", "proyectos", "skills", "experience", "contacto"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const map: Record<string, string> = {
            inicio: "/",
            about: "#about",
            proyectos: "#proyectos",
            skills: "#skills",
            experience: "#experience",
            contacto: "#contacto",
          };
          setActiveSection(map[id] ?? "/");
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -40% 0px",
      threshold: 0,
    });

    for (const section of sections) {
      observerRef.current.observe(section);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  const navItems = [
    { name: "Sobre m\u00ED", path: "#about" },
    { name: "Proyectos", path: "#proyectos" },
    { name: "Stack", path: "#skills" },
    { name: "Contacto", path: "#contacto" },
  ];

  const menuLabel = isMenuOpen ? "Cerrar men\u00FA" : "Abrir men\u00FA";

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      if (path.startsWith("#")) {
        e.preventDefault();
        if (window.location.pathname === "/") {
          const el = document.querySelector(path);
          if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 56;
            window.scrollTo({ top, behavior: "smooth" });
          }
        } else {
          window.location.href = `/${path}`;
        }
        setIsMenuOpen(false);
      }
    },
    [],
  );

  const navClass = scrolled
    ? "bg-skin-primary border-b border-skin-border shadow-sm"
    : "bg-skin-primary border-b border-skin-border/60";

  return (
    <>
      <a
        href="#main-content"
        className="focus-ring fixed left-4 top-2 z-[60] -translate-y-20 rounded-lg bg-skin-primary px-4 py-3 text-sm font-semibold text-skin-text shadow-md focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <nav
        aria-label="Navegaci\u00F3n principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${navClass}`}
      >
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <a
              href="/"
              className="focus-ring flex items-center gap-2 text-skin-text hover:opacity-75 transition-opacity duration-200"
            >
              <Logo size="sm" />
              <span className="sr-only">{PUBLIC_POSITIONING.identity.name}</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    aria-current={isActive ? "true" : undefined}
                    className={`focus-ring inline-flex min-h-11 items-center rounded-lg px-3.5 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-skin-text font-semibold"
                        : "text-skin-muted hover:text-skin-text"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="ml-2 pl-2 border-l border-skin-border/40">
                <ThemeToggle />
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl text-skin-muted hover:bg-skin-secondary hover:text-skin-text"
                aria-label={menuLabel}
                aria-expanded={isMenuOpen}
                aria-controls="navigation-menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div
              id="navigation-menu"
              className="border-t border-skin-border bg-skin-primary px-2 py-3 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.path;
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      aria-current={isActive ? "true" : undefined}
                      className={`focus-ring flex min-h-11 items-center rounded-lg px-4 text-sm transition-colors ${
                        isActive
                          ? "bg-skin-secondary text-skin-text font-semibold"
                          : "text-skin-muted hover:bg-skin-secondary hover:text-skin-text"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
