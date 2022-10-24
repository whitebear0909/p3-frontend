import { Theme, merge } from "theme-ui"
import base from "./base"

// Use this gradient
// linear-gradient(30deg, rgba(231,152,89,0.95) 20%, rgba(214,83,206,1) 80%)

const dark: Theme = merge(base, {
  fonts: {
    body: '"BlinkMacSystemFont"',
    heading: '"Helvetica Neue"',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: "white",
    background: "#1e1c1c",
    secondary: "white"
  },
  buttons: {
    primary: {
      fontFamily: "inherit",
      color: "white",
      borderRadius: 8,
      textTransform: "uppercase",
      bg: "#1c304e",
      transition: "background 100ms ease-in-out",
      "&:hover": {
        bg: "#305fa5",
        color: "black"
      },
      cursor: "pointer"
    },
  },
  cards: {
    primary: {
      background: "#060606",
      borderRadius: 8,
    }
  },
  forms: {
    input: {
      fontFamily: "body",
      backgroundColor: "secondary",
      border: "transparent",
      color: "black",
      outlineColor: "secondary",
      borderRadius: 8
    }
  },
  text: {
    heading: {
      letterSpacing: "1px"
    }
  }
})

export default dark
