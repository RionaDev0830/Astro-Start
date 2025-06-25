import { create } from 'zustand'

const useContactStore = create((set) => ({
  contactData: {
    email: "",
    name: "",
    phone: "",
    message: "",
    street: "",
    place: "",
    category: "",
    abo: "",
  },
  setContactData: (data) => set((state) => ({
    contactData: {
      ...state.contactData,
      ...data
    }
  })),
  resetContactData: () => set({
    contactData: {
      email: "",
      name: "",
      phone: "",
      message: "",
      street: "",
      place: "",
      category: "",
      abo: "",
    }
  })
}))

export default useContactStore 