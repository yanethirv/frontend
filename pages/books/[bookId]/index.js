import Link from "next/link"

export async function getStaticProps({ params }) {
    //console.log(params.bookId)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bookId}`)
    
    const data = await response.json()
    //console.log(data)
    return {
        props: {
            book: data
        }
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)

    const data = await response.json()

    return {
        paths: data.map(book => ({
            params: {bookId: String(book.id)}
        })),
        fallback: false
    }
}

const BookDetail = ({ book }) => {
    return (
        <>
            <h1>{book.title}</h1>
            <Link href="/books">Book List</Link>
        </>
    )
}

export default BookDetail