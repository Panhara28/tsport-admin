import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  SHOW_RIGHT_SIDEBAR,
  SHOW_SIDEBAR,
  CHANGE_PRELOADER,
  TOGGLE_LEFTMENU,
} from "./actionTypes"

export const changeLayout = (layout: string) => ({
  type: CHANGE_LAYOUT,
  payload: layout,
})

export const changePreloader = (layout: any) => ({
  type: CHANGE_PRELOADER,
  payload: layout,
})

export const changeLayoutWidth = (width: any) => ({
  type: CHANGE_LAYOUT_WIDTH,
  payload: width,
})

export const changeSidebarTheme = (theme: any) => ({
  type: CHANGE_SIDEBAR_THEME,
  payload: theme,
})

export const changeSidebarType: any = (sidebarType: string, isMobile: boolean | undefined) => {
  return {
    type: CHANGE_SIDEBAR_TYPE,
    payload: { sidebarType, isMobile },
  }
}

export const changeTopbarTheme = (topbarTheme: string) => ({
  type: CHANGE_TOPBAR_THEME,
  payload: topbarTheme,
})

export const showRightSidebarAction = (isopen: boolean) => ({
  type: SHOW_RIGHT_SIDEBAR,
  payload: isopen,
})

export const showSidebar = (isopen: any) => ({
  type: SHOW_SIDEBAR,
  payload: isopen,
})

export const toggleLeftmenu = (isopen: any) => ({
  type: TOGGLE_LEFTMENU,
  payload: isopen,
})
