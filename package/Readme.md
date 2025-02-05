#### React components to get user interactions through a function.


## 🚀 Usage
Wrap your application with the **ConjureProvider**.
In your layout.tsx (for NEXT.js projects) or App.tsx (for React projects)
```tsx
import { ConjureProvider } from "conjure-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ConjureProvider>
            {children}
        </ConjureProvider>
    );
}
```

## 📜 License
This project is licensed under the ISC License.

## 🏗  Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.