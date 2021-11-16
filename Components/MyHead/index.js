import Head from 'next/head';

function MyHead() {
    return (
        <Head>
            <title>flower categorizer</title>
            <meta name="description" content="A flower categorizer website" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default MyHead;