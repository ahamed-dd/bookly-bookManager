import { useEffect, useState } from "react"
import axios from "axios"
import "@radix-ui/themes/styles.css";
import { DropdownMenu, Button } from "@radix-ui/themes";
import "./styles.css"


type BookData = {
    id: number
    book_name: string
    author?: string
    published_at?: number
    description?: string
    bookmark?: string
    choices?: string
}

const BASE_URL = import.meta.env.VITE_BASE_URL


export default function Home() {
  const [bookData, setbookData] = useState<BookData[]>([])
  const [formData, setFormData] = useState({
  book_name: "",
  published_at: null as number | null,
  author: "",
  description: "",
  bookmark: "",
  choices: ""
})
  const [filterChoice, setFilterChoice] = useState<string>("all")
  const [editingBook, setEditingBook] = useState<BookData | null>(null);
  const [editFormData, setEditFormData] = useState<BookData | null>(null);


  async function getBookData(): Promise<BookData[]> {
    const response = await axios.get(`${BASE_URL}/books/`)
    return response.data
   }
  
  async function writebookData(data: Omit<BookData, "id">) {
    const response = await axios.post(`${BASE_URL}/books/`, data)
    return response.data
    }

  async function updateBookData(id: number, data: Partial<BookData>) {
   const response = await axios.put(`${BASE_URL}/books/${id}`, data);
   return response.data;
   }
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value } = e.target  
    setFormData(prev => ({...prev, [name]: value}))      
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [name]:
          name === "published_at" ? (value ? Number(value) : null) : value,
      });
    }
  }

  async function handleSubmit(e: React.FocusEvent) {
    e.preventDefault()

    const newbook = await writebookData(formData)

    setbookData(prev => ([...prev, newbook]))

    setFormData({
        book_name: "",
        published_at: null as number | null,
        author: "",
        description: "",
        bookmark: "",
        choices: ""
    })
  }

  async function handleUpdate() {
    if (editFormData && editingBook) {
      const updated = await updateBookData(editingBook.id, editFormData);
      setbookData((prev) =>
        prev.map((book) => (book.id === editingBook.id ? updated : book))
      );
      setEditingBook(null);
      setEditFormData(null);
    }
  }

  function handleFilterChange(choice: string) {
  setFilterChoice(choice)
  }

  const filteredBooks = bookData.filter(book => {
  if (filterChoice === "all") return true
  return book.choices === filterChoice
})


  useEffect(() => {
  getBookData().then(setbookData)
  }, [])


  return (
    <>
      <div className="toppage">
        <form onSubmit={handleSubmit}>
          <input
            name="book_name"
            placeholder="Book name"
            value={formData.book_name}
            onChange={handleChange}
            required
          />

          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
          />

          <button type="submit">Add Book</button>
          <div className="choice-group">
            <p>Choice</p>

            <label>
              <input
                type="radio"
                name="choices"
                value="wish"
                checked={formData.choices === "wish"}
                onChange={handleChange}
              />
              Wish to Read
            </label>

            <label>
              <input
                type="radio"
                name="choices"
                value="read"
                checked={formData.choices === "read"}
                onChange={handleChange}
              />
              Read
            </label>

            <label>
              <input
                type="radio"
                name="choices"
                value="favourite"
                checked={formData.choices === "favourite"}
                onChange={handleChange}
              />
              Favourite
            </label>
          </div>
        </form>
      </div>

      <div className="bottompage">
        <div className="book">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" size="4">
                {filterChoice === "all"
                  ? "All Books"
                  : filterChoice === "wish"
                  ? "Wish to Read"
                  : filterChoice === "read"
                  ? "Read"
                  : "Favourites"}
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="2">
              <DropdownMenu.Item onClick={() => handleFilterChange("all")}>
                All Books
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => handleFilterChange("wish")}>
                Wish to Read
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => handleFilterChange("read")}>
                Read
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => handleFilterChange("favourite")}
              >
                Favourites
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        {filteredBooks.length > 0 && (
          <div>
            {filteredBooks.map((book) => (
              <div className="box">
                <h3>{book.book_name}</h3>
                {book.published_at && <p>{book.published_at}</p>}
                {book.author && <p>{book.author}</p>}
                {book.description && <p>{book.description}</p>}
                {book.bookmark && <p>{book.bookmark}</p>}
                <p>{book.choices}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}