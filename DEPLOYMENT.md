# 🚀 Despliegue Rápido: Segua-AI

## Backend → Railway | Frontend → Vercel

---

## ⚡ PASO 1: Backend en Railway (2 min)

1. Ve a https://railway.app → Login con GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Selecciona: **jfigueroah04/Segua-AI**
4. En "Select Service Path": elige **backend/**
5. Click "Deploy"

**Una vez desplegado:**
- Ve a tu proyecto → Variables
- Agrega estas variables:

```
ENVIRONMENT=production
DEBUG=False
ANTHROPIC_API_KEY=tu_key_aqui
SUPABASE_URL=tu_url_aqui
SUPABASE_KEY=tu_key_aqui
SUPABASE_ANON_KEY=tu_key_aqui
GOOGLE_CLIENT_ID=tu_id_aqui
GOOGLE_CLIENT_SECRET=tu_secret_aqui
ALLOWED_ORIGINS=https://tu-frontend.vercel.app
FRONTEND_URL=https://tu-frontend.vercel.app
```

- Copia la **URL de Railway** (algo como `https://segua-ai-backend.up.railway.app`)

---

## ⚡ PASO 2: Frontend en Vercel (2 min)

1. Ve a https://vercel.com → Login con GitHub
2. Click "Add New Project" → Importa **jfigueroah04/Segua-AI**
3. En configuración:
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
4. En Environment Variables, agrega:

```
VITE_API_URL=https://segua-ai-backend.up.railway.app
```

(Reemplaza con tu URL de Railway del paso anterior)

5. Click "Deploy"

---

## ✅ Verificar que funciona

**Frontend:** https://tu-proyecto.vercel.app
**Backend API:** https://segua-ai-backend.up.railway.app/docs

Si el frontend no se conecta, revisa:
- CORS: Backend debe permitir `https://tu-frontend.vercel.app`
- API URL: Frontend debe apuntar correctamente a Railway

---

## 🔄 Redeploys automáticos

Cada push a `main` redesplegará automáticamente en ambas plataformas ✨
