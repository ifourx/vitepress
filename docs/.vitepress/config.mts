import { DefaultTheme, defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Flygar's Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: nav(),

    sidebar: {
      "/pages/linux/": sidebarLinux(),
      "/pages/docker/": sidebarDocker(),

      "/pages/rust/": sidebarRust(),
      "/pages/golang/": sidebarGolang(),
      "/pages/python/": sidebarPython(),

      "/pages/misc/": sidebarMisc(),
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    // Home
    {
      text: "Home",
      link: "/",
    },
    // Pages
    {
      text: "Pages",
      activeMatch: "/pages/",
      items: [
        {
          items: [
            { text: "Linux", link: "/pages/linux/" },
            { text: "Docker", link: "/pages/docker/" },
          ],
        },
        {
          items: [
            { text: "Rust", link: "/pages/rust/" },
            { text: "Python", link: "/pages/python/" },
            { text: "Golang", link: "/pages/golang/" },
          ],
        },
        {
          items: [{ text: "Misc", link: "/pages/misc/" }],
        },
      ],
    },
    // statusBadge
    { component: "StatusBadge" },
  ];
}
function sidebarLinux(): DefaultTheme.SidebarItem[] | undefined {
  return [
    {
      text: "Linux",
      collapsed: false,
      items: [
        { text: "VPS 安全指北", link: "/pages/linux/vps_reload" },
        { text: "H-UI 面板", link: "/pages/linux/hui" },
        { text: "Git", link: "/pages/linux/git" },
        { text: "How To", link: "/pages/linux/how_to" },
        { text: "ssh", link: "/pages/linux/ssh" },
        { text: "WSL", link: "/pages/linux/wsl" },
      ],
    },
    {
      text: "Tools",
      collapsed: false,
      items: [
        { text: "oh-my-zsh", link: "/pages/linux/tools/ohmyzsh" },
        { text: "starship", link: "/pages/linux/tools/starship" },
        { text: "shortkeys", link: "/pages/linux/tools/shortkeys" },
        { text: "tmux", link: "/pages/linux/tools/tmux" },
      ],
    },
  ];
}
function sidebarDocker(): DefaultTheme.SidebarItem[] | undefined {
  return [
    {
      text: "Docker",
      collapsed: false,
      items: [{ text: "Cheat sheet", link: "/pages/docker/cheat_sheet" }],
    },
  ];
}
function sidebarOpenclaw(): DefaultTheme.SidebarItem[] | undefined {
  return [];
}

function sidebarRust(): DefaultTheme.SidebarItem[] | undefined {
  return [
    {
      text: "Rust",
      items: [
        { text: "cargo", link: "/pages/rust/cargo" },
        { text: "所有权", link: "/pages/rust/ownership" },
        { text: "集合", link: "/pages/rust/collections" },
        { text: "错误处理", link: "/pages/rust/error" },
        { text: "生命周期", link: "/pages/rust/lifetime" },
        { text: "特征", link: "/pages/rust/trait" },
        { text: "闭包和迭代器", link: "/pages/rust/closures_Iterators" },
        { text: "智能指针", link: "/pages/rust/smart_pointer" },
        { text: "无畏并发", link: "/pages/rust/fearless_concurrency" },
        { text: "模式与匹配", link: "/pages/rust/match" },
        { text: "枚举与结构体", link: "/pages/rust/struct_enum" },
        { text: "泛型", link: "/pages/rust/generic" },
      ],
    },
  ];
}

function sidebarGolang(): DefaultTheme.SidebarItem[] | undefined {
  return [
    {
      text: "Golang",
      items: [{ text: "todo", link: "/pages/golang/todo" }],
    },
  ];
}

function sidebarPython(): DefaultTheme.SidebarItem[] | undefined {
  return [
    {
      text: "Python",
      items: [{ text: "todo", link: "/pages/python/todo" }],
    },
  ];
}

function sidebarMisc(): DefaultTheme.SidebarItem[] | undefined {
  return [
    {
      text: "Docs",
      collapsed: false,
      items: [
        { text: "Copilot", link: "/pages/misc/docs/copilot" },
        { text: "Copilot CLI", link: "/pages/misc/docs/copilot_cli" },
        { text: "Openclaw", link: "/pages/misc/docs/openclaw" },
      ],
    },

    {
      text: "Tips",
      collapsed: false,
      items: [
        { text: "Did You Know", link: "/pages/misc/tips/did_you_know" },
        { text: "Tools font", link: "/pages/misc/tips/font" },
      ],
    },

    {
      text: "Examples",
      collapsed: false,
      items: [
        { text: "Markdown Examples", link: "/pages/misc/markdown-examples" },
        { text: "Runtime API Examples", link: "/pages/misc/api-examples" },
      ],
    },
  ];
}
