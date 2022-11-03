import Link from "next/link"

export async function getStaticProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    //console.log(books)
    const data = await response.json()
    //console.log(data)
    return {
        props: {
            books: data
        }
    }
}

const BookList = ({ books }) => {
    async function handleDelete(e, bookId) {
        e.preventDefault()

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })

        if (response.ok) {
            window.location.href = '/books'
        }
    }

    return (
        <>
            <h1>Books</h1>
            <ul data-cy="book-list">
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link 
                            href={`/books/${book.id}`} 
                            data-cy={`link-to-visit-book-${book.id}`}>{book.title}</Link>
                        {' - '}
                        <Link 
                            href={`/books/${book.id}/edit`}
                            data-cy={`link-to-edit-book-${book.id}`}>Edit</Link>
                        {' - '}
                        <form 
                            onSubmit={(e) => handleDelete(e, book.id)} 
                            style={{ display: 'inline' }}>
                            <button
                                data-cy={`link-to-delete-book-${book.id}`}>Delete</button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/books/create">Create Book</Link>
        </>
    )
}

export default BookList