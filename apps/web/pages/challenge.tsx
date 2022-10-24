import { useState } from "react";
import { Button, Box, Card, Flex, Heading, Input, ThemeProvider, themes, Text } from "ui";

type AvailableThemes = keyof typeof themes;

interface ITweet {
  time: string
  content: string
}

export default function Challenge() {
  const defaultTheme: AvailableThemes = "nineties"
  const [currentTheme, setCurrentTheme] = useState<AvailableThemes>(defaultTheme)
  const [tweets, setTweets] = useState<ITweet[]>([])
  const [tweet, setTweet] = useState<ITweet>({time: '', content: ''})
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isError, setIsError] = useState<boolean>(false)
  
  function handleContentChange(e) {
    setIsError(false)
    setTweet({
      time: '',
      content: e.target.value
    })
  }

  function handleTweet() {
    if(tweet.content === '' || tweet.content == undefined){
      setErrorMessage('Please fill the content')
      setIsError(true)
      return
    }

    if(tweet.content.length < 5 || tweet.content.length > 30){
      setErrorMessage('The length of characters should be between 5 and 30.')
      setIsError(true)
      return
    }

    const time = new Date()
    tweet.time = time.getMonth().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + '/' + time.getDay().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + '/' + time.getFullYear() + ' ' + time.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + ':' + time.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + ':' + time.getSeconds().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    
    setIsError(false)
    const currentTweets = [...tweets]
    currentTweets.push({...tweet})
    setTweets(currentTweets)
    setTweet({
      time: '',
      content: ''
    })
  }

  function renderTweet(t: ITweet, i: Int16Array) {
    return (
      <Card key={i} mb={4} ml={4} p={3} >
        <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Heading as="h3">Vuk Matijevic</Heading>
          <Box as="time" color="lightgray">{t.time}</Box>
        </Flex>
        <Box as="p" sx={{ pt: 2 }}>{t.content}</Box>
      </Card>
    )
  }

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Flex sx={{ justifyContent: "center", maxWidth: "850px", margin: "64px auto" }}>
        <Box sx={{ width: "40%" }} >
          <Card sx={{ p: 4 }}>
            <Heading as="h1">
              Welcome back, Human!
            </Heading>
            <Box mt={4}>
              <Input placeholder="Please write content..." onChange={handleContentChange} value={tweet.content}/>
              {isError && (<Text sx={{
                            fontSize: 1,
                            fontWeight: 'bold',
                            color: 'red',
                            display: 'block'
                          }}>{errorMessage}</Text>)}
              <Button mt={2} onClick={handleTweet}>Tweet</Button>
            </Box>

            <Heading as="h5" mt={4} mb={2}>Theme switcher</Heading>
            <Button onClick={() => setCurrentTheme("modern")}>Modern</Button>
            <Button onClick={() => setCurrentTheme("nineties")} ml={2}>90s</Button>
            <Button onClick={() => setCurrentTheme("dark")} ml={2}>Dark</Button>
          </Card>
        </Box>

        <Box sx={{ width: "60%" }}>
          {
            tweets.map((item, i) => {
              return renderTweet(item, i)
            })
          }
        </Box>
      </Flex>
    </ThemeProvider >
  );
}
