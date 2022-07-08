import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charset="UTF-8" />
                <meta name="description" content="A fun quiz to Refresh JS concepts." />
                <meta name="keywords" content="JavaScript, Quiz, js, learning" />
                <meta name="author" content="Harsh Bansal" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    href="https://fonts.googleapis.com/css?family=Mulish"
                    rel="stylesheet"
                />
                <title>Javascript Quiz</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}