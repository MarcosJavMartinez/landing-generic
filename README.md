# Landing Premium - Next.js + Tailwind

Landing profesional moderna con diseño responsivo, modo oscuro, carrusel de portafolio y sistema de contacto integrado.

### 🌐 [Ver demo en vivo →](https://landing-generic-ten.vercel.app/)

## 📸 Vista previa

![Landing de GenStudio](docs/preview.jpg)

## 🎯 Stack

- **Next.js 16** - React framework
- **Tailwind CSS 4** - Utility-first CSS
- **TypeScript** - Type safety
- **Resend** - Email delivery
- **next-themes** - Dark mode

## 🚀 Setup Local

### 1. Instala dependencias
```bash
npm install
```

### 2. Configura variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_TO_EMAIL=tu-email@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_WHATSAPP_PHONE=+54XXXXXXXXXX  # optional
```

### 3. Corre servidor local
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000)

## 🔨 Build & Deploy

```bash
# Build para producción
npm run build

# Start en producción
npm start
```

## 📋 Estructura

```
src/
├── app/
│   ├── page.tsx          # Home page principal
│   ├── layout.tsx        # Layout global
│   ├── globals.css       # Estilos globales
│   └── api/contact/      # API route para emails
├── components/           # Componentes reutilizables
│   ├── ContactForm.tsx
│   ├── PortfolioCarousel.tsx
│   ├── Navbar.tsx
│   └── ...
└── types/                # Type definitions
```

## 🎨 Features

✅ 100% Responsive (mobile-first)  
✅ Dark mode integrado  
✅ Animaciones subtle (Apple-style)  
✅ Carrusel infinito con scroll/click  
✅ Formulario con validación  
✅ Email delivery con Resend  
✅ Chat flotante WhatsApp (opcional)  
✅ Código limpio y escalable  

## 📞 Contacto

Sistema automático de emails con validación de spam (honeypot field).
