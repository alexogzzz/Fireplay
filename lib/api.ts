// Colección de URLs de imágenes de videojuegos para usar como placeholders
const gameImages = [
  "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg", // GTA 5
  "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg", // The Witcher 3
  "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg", // Portal 2
  "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg", // Red Dead Redemption 2
  "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg", // God of War
  "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg", // Cyberpunk 2077
  "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg", // Bioshock Infinite
  "https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg", // Fallout 4
  "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg", // Doom
  "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg", // Skyrim
  "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg", // Minecraft
  "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg", // Horizon Zero Dawn
  "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg", // Death Stranding
  "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg", // Resident Evil 2
  "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg", // Half-Life 2
  "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg", // Control
  "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg", // Hades
  "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg", // Assassin's Creed Valhalla
  "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg", // Destiny 2
  "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg", // Half-Life: Alyx
  "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg", // Persona 5
  "https://media.rawg.io/media/games/4e0/4e0e7b6d6906a131307c94266e5c9a1c.jpg", // Star Wars Jedi: Fallen Order
  "https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg", // Borderlands 2
  "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg"  // The Elder Scrolls V: Skyrim
];

// Función para obtener una imagen aleatoria de la colección
function getRandomGameImage(seed: number | string) {
  // Convertir el seed a número si es una cadena
  const numericSeed = typeof seed === 'string' 
    ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) 
    : seed;
  
  // Usar el seed para seleccionar una imagen
  const index = numericSeed % gameImages.length;
  return gameImages[index];
}

/**
 * Obtiene una lista de juegos con paginación y ordenamiento
 */
export async function fetchGames(page = 1, ordering = "-rating") {
  console.log(`Simulando fetchGames con page=${page}, ordering=${ordering}`);
  
  // Simular un pequeño retraso para que parezca una API real
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generar datos simulados
  const results = Array(12).fill(null).map((_, i) => {
    const id = (page - 1) * 12 + i + 1;
    return {
      id,
      name: `Juego de ejemplo ${id}`,
      slug: `juego-ejemplo-${id}`,
      background_image: getRandomGameImage(id), // Usar imagen de videojuego
      rating: ordering.includes('rating') 
        ? (ordering.startsWith('-') ? 5 - (i * 0.2) : 3 + (i * 0.2)) // Ordenar por rating
        : 3 + Math.random() * 2,
      released: ordering.includes('released')
        ? new Date(ordering.startsWith('-') ? 2023 - i : 2010 + i, 0, 1).toISOString().split('T')[0] // Ordenar por fecha
        : "2023-01-01",
      genres: [
        { id: 1, name: "Acción" }, 
        { id: Math.floor(Math.random() * 5) + 2, name: ["Aventura", "RPG", "Estrategia", "Deportes", "Simulación"][Math.floor(Math.random() * 5)] }
      ],
      ratings_count: Math.floor(Math.random() * 1000) + 100
    };
  });
  
  return {
    results,
    next: page < 3 ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    count: 36
  };
}

/**
 * Busca juegos por nombre
 */
export async function searchGames(query: string, page = 1) {
  console.log(`Simulando searchGames con query=${query}, page=${page}`);
  
  // Simular un pequeño retraso
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generar resultados de búsqueda simulados
  const count = Math.floor(Math.random() * 3) + 3; // Entre 3 y 5 resultados
  const results = Array(count).fill(null).map((_, i) => {
    return {
      id: 1000 + i,
      name: `Resultado para "${query}" ${i + 1}`,
      slug: `resultado-${query.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      background_image: getRandomGameImage(query + i), // Usar imagen de videojuego
      rating: 3 + Math.random() * 2,
      released: new Date(2020 + i, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      genres: [
        { id: 1, name: "Acción" }, 
        { id: 2, name: "Aventura" }
      ],
      ratings_count: Math.floor(Math.random() * 500) + 50
    };
  });
  
  return {
    results,
    next: null,
    previous: null,
    count
  };
}

/**
 * Obtiene los detalles de un juego por su slug
 */
interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  description: string;
  rating: number;
  ratings_count: number;
  released: string;
  website: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string }; requirements?: { minimum?: string; recommended?: string } }[];
  developers: { id: number; name: string }[];
  publishers: { id: number; name: string }[];
  esrb_rating: { id: number; name: string };
  screenshots: { id: number; image: string }[];
  tags: { id: number; name: string }[];
}

export async function fetchGameBySlug(slug: string): Promise<Game> {
  console.log(`Simulando fetchGameBySlug con slug=${slug}`);
  
  // Simular un pequeño retraso
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Extraer un ID del slug para generar datos consistentes
  const id = slug.includes('-') 
    ? parseInt(slug.split('-').pop() || "999") 
    : 999;
  
  // Generar un juego simulado
  return {
    id,
    slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    background_image: getRandomGameImage(id), // Imagen principal
    description: `
      <p>Descripción de ejemplo para <strong>${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>. Esta es una descripción simulada para desarrollo.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
      nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, 
      nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
      <h3>Características principales:</h3>
      <ul>
        <li>Gráficos de última generación</li>
        <li>Historia inmersiva</li>
        <li>Multijugador cooperativo</li>
        <li>Mundo abierto para explorar</li>
      </ul>
    `,
    rating: 4.5,
    ratings_count: 1250,
    released: "2023-01-01",
    website: "https://example.com",
    genres: [
      { id: 1, name: "Acción" }, 
      { id: 2, name: "Aventura" },
      { id: 3, name: "RPG" }
    ],
    platforms: [
      { 
        platform: { id: 1, name: "PC" }, 
        requirements: { 
          minimum: "Sistema operativo: Windows 10<br>Procesador: Intel Core i5-2500K / AMD FX-6300<br>Memoria: 8 GB RAM<br>Gráficos: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB", 
          recommended: "Sistema operativo: Windows 10<br>Procesador: Intel Core i7-4770K / AMD Ryzen 5 1500X<br>Memoria: 16 GB RAM<br>Gráficos: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 8GB" 
        } 
      },
      { platform: { id: 2, name: "PlayStation 5" } },
      { platform: { id: 3, name: "Xbox Series X" } }
    ],
    developers: [{ id: 1, name: "Desarrollador Ejemplo" }],
    publishers: [{ id: 1, name: "Publisher Ejemplo" }],
    esrb_rating: { id: 4, name: "Mature" },
    screenshots: [
      { id: 1, image: getRandomGameImage(id + 100) },
      { id: 2, image: getRandomGameImage(id + 200) },
      { id: 3, image: getRandomGameImage(id + 300) },
      { id: 4, image: getRandomGameImage(id + 400) }
    ],
    tags: [
      { id: 1, name: "Acción" }, 
      { id: 2, name: "Multijugador" },
      { id: 3, name: "Mundo abierto" },
      { id: 4, name: "Primera persona" },
      { id: 5, name: "Cooperativo" }
    ]
  };
}
