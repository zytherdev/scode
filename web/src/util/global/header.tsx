import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { routes } from "../global"
import { logo } from "./logo"
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "../components/ui/icons"

type HeaderProps = {
  dark: boolean
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}

const NAV_ITEMS = [
  { name: "Home", route: routes.home },
  { name: "Documentation", route: routes.doc },
  { name: "Encrypt", route: routes.encrypt },
  { name: "Decrypt", route: routes.decrypt },
  { name: "API", route: "https://api.scode.zyther.dev" },
]

export default function Header({ dark, setDark }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const toggleTheme = () => {
    setDark(!dark)
    localStorage.setItem("scode-app-theme", dark ? "light" : "dark")
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/95 backdrop-blur-xl dark:border-white/5 dark:bg-black/95">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10"
          aria-label="Global"
        >
          <Link to={routes.home} className="group flex items-center gap-3">
            <span className="sr-only">SCode</span>
            <img className="h-7 w-auto" src={logo} alt="SCode" />
            <span className="hidden font-mono text-xs text-gray-400 transition-colors group-hover:text-gray-900 sm:inline dark:text-gray-500 dark:group-hover:text-lime-400">
              /scode
            </span>
          </Link>

          {/* nav desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.route}>
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent dark:via-lime-400" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ações */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-lime-400"
            >
              {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>

            <a
              href="https://github.com/zytherdev/scode"
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center gap-2 rounded-full border border-gray-900 bg-gray-900 px-4 text-xs font-medium text-white transition-colors hover:bg-gray-700 md:inline-flex dark:border-lime-400 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
            >
              Get started
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-white/5"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* mbile mnu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white md:hidden dark:bg-[#0a0a0a]"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200/60 px-6 dark:border-white/5">
            <Link
              to={routes.home}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <img className="h-7 w-auto" src={logo} alt="SCode" />
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                /scode
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-lime-400"
              >
                {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* main nav */}
          <nav className="flex flex-1 flex-col justify-center px-6 py-8">
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.route}>
                  <NavLink
                    to={item.route}
                    className={({ isActive }) =>
                      `group flex items-baseline gap-6 rounded-2xl px-4 py-4 transition-colors ${
                        isActive
                          ? "bg-gray-100 dark:bg-white/5"
                          : "hover:bg-gray-50 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`font-mono text-xs transition-colors ${
                            isActive
                              ? "text-lime-600 dark:text-lime-400"
                              : "text-gray-400 dark:text-gray-600"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-3xl font-semibold tracking-tight transition-colors ${
                            isActive
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`ml-auto text-2xl transition-all ${
                            isActive
                              ? "translate-x-0 opacity-100 text-lime-600 dark:text-lime-400"
                              : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-gray-400 dark:text-gray-500"
                          }`}
                          aria-hidden
                        >
                          →
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* footer */}
          <div className="shrink-0 border-t border-gray-200/60 px-6 py-6 dark:border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-gray-400 dark:text-gray-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                <span>by</span>
                <a
                  href="https://zyther.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 underline decoration-dotted underline-offset-4 dark:text-white"
                >
                  Zyther Dev
                </a>
              </div>

              <a
                href="https://github.com/zytherdev/scode"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-gray-900 px-4 text-xs font-medium text-white transition-colors hover:bg-gray-700 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
              >
                Get started →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}