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

   async function deleteBookData(id: number) {
     await axios.delete(`${BASE_URL}/books/${id}`);
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

  async function handleDelete(id: number) {
    await deleteBookData(id);
    setbookData((prev) => prev.filter((book) => book.id !== id));
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

          <input
            id="published_at"
            name="published_at"
            type="number"
            placeholder="e.g., 2024"
            value={formData.published_at || ""}
            onChange={handleChange}
          />

          <textarea
            id="description"
            name="description"
            placeholder="Book description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />

          <input
            id="bookmark"
            name="bookmark"
            placeholder="Current page or chapter"
            value={formData.bookmark}
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
        {filteredBooks.length > 0 ? (
          <div>
            {filteredBooks.map((book) => (
              <div className="box">
                <div>
                  <button
                    className="icon-button"
                    onClick={() => {
                      setEditingBook(book);
                      setEditFormData(book);
                    }}
                    title="Edit book"
                  >
                    ✏️
                  </button>

                  <button 
                      className="icon-button delete"
                      onClick={() => handleDelete(book.id)}
                      title="Delete book"
                    >
                      🗑️
                    </button>
                </div>
                <h3>{book.book_name}</h3>
                {book.published_at && <p>{book.published_at}</p>}
                {book.author && <p>{book.author}</p>}
                {book.description && <p>{book.description}</p>}
                {book.bookmark && <p>{book.bookmark}</p>}
                <p>{book.choices}</p>
                {book.choices === "wish" && "📚 Wish to Read"}
                {book.choices === "read" && "✅ Read"}
                {book.choices === "favourite" && "⭐ Favourite"}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No books found. Add your first book above!</p>
          </div>
        )}
      </div>
        <Dialog.Root open={!!editingBook} onOpenChange={(open) => {
        if (!open) {
          setEditingBook(null)
          setEditFormData(null)
        }
      }}></Dialog.Root>

      <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Edit Book</Dialog.Title>
          {editFormData && (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="edit_book_name">Book Name *</label>
                <input
                  id="edit_book_name"
                  name="book_name"
                  value={editFormData.book_name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_author">Author</label>
                <input
                  id="edit_author"
                  name="author"
                  value={editFormData.author || ""}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_published_at">Published Year</label>
                <input
                  id="edit_published_at"
                  name="published_at"
                  type="number"
                  value={editFormData.published_at || ""}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_description">Description</label>
                <textarea
                  id="edit_description"
                  name="description"
                  value={editFormData.description || ""}
                  onChange={handleEditChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_bookmark">Bookmark</label>
                <input
                  id="edit_bookmark"
                  name="bookmark"
                  value={editFormData.bookmark || ""}
                  onChange={handleEditChange}
                />
              </div>

              <div className="choice-group">
                <label>Reading Status</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="choices"
                      value="wish"
                      checked={editFormData.choices === "wish"}
                      onChange={handleEditChange}
                    />
                    <span>Wish to Read</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="choices"
                      value="read"
                      checked={editFormData.choices === "read"}
                      onChange={handleEditChange}
                    />
                    <span>Read</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="choices"
                      value="favourite"
                      checked={editFormData.choices === "favourite"}
                      onChange={handleEditChange}
                    />
                    <span>Favourite</span>
                  </label>
                </div>
              </div>

              <div className="dialog-actions">
                <Button 
                  variant="soft" 
                  color="gray"
                  onClick={() => {
                    setEditingBook(null)
                    setEditFormData(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>
      <div>
        
      </div>
    </>
  );
}