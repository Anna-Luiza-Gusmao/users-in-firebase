import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { UsersContextProvider } from "./context/users"
import { Routers } from "./routers/Routers"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <UsersContextProvider>
          <Routers />
        </UsersContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
