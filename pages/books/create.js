import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const BookCreate = () => {

    const router = useRouter()

    //GETTER, SETTER
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })
        //console.log(response)

        if (response.ok){
            setErrors([])
            setBookTitle('')
            
            return router.push('/books')
        }

        const data = await response.json()
        setErrors(data.errors)
        setSubmitting(false)
    }

    return (
        <>
            <h1>Book Create</h1>
    
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setBookTitle(e.target.value)}
                    value={bookTitle}
                    disabled={submitting}
                    type="text"
                    data-cy="input-book-title"
                />
                <button 
                    disabled={submitting}
                    data-cy="button-submit-book"
                >{submitting ? 'Submitting...' : 'Submit'}</button>
                {errors.title && (
                    <span style={{ color: 'red', display: 'block'}}>
                        {errors.title}
                    </span>
                )}
            </form>
            <br/>

            <Link href="/books">Book List</Link>
        </>
    )
}

export default BookCreate