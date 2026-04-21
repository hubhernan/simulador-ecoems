-- 1. Tabla de Perfiles de Usuario (se sincroniza con auth.users de Supabase)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla para almacenar los Resultados de los Exámenes
CREATE TABLE public.exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  exam_id TEXT NOT NULL,          -- Ej. 'exam-1', 'exam-2'
  score INTEGER NOT NULL,         -- Aciertos totales
  time_spent INTEGER NOT NULL,    -- Tiempo en segundos
  answers JSONB NOT NULL,         -- Respuestas del usuario en formato JSON
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) para seguridad
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para Perfiles
CREATE POLICY "Usuarios pueden ver su propio perfil" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Políticas de seguridad para Resultados de Exámenes
CREATE POLICY "Usuarios pueden ver sus propios resultados" 
  ON public.exam_results FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden insertar sus propios resultados" 
  ON public.exam_results FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Función para crear perfil automáticamente al registrarse (Opcional, pero recomendada)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función cuando un usuario se registra
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
