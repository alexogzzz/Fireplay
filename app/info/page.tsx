import Image from "next/image"

export default function InfoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Sobre Fireplay</h1>
        <p className="text-gray-600 mb-8 text-center">Conoce más sobre nuestro proyecto y las tecnologías utilizadas</p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nuestro proyecto</h2>
            <p className="text-gray-700 mb-4">
              Fireplay es una aplicación web moderna que simula una tienda de videojuegos online. Ha sido desarrollada
              como proyecto educativo para demostrar el uso de tecnologías modernas en el desarrollo web.
            </p>
            <p className="text-gray-700 mb-4">
              La aplicación permite a los usuarios explorar un catálogo de videojuegos, buscar títulos específicos, ver
              detalles de cada juego, guardar favoritos y simular un proceso de compra.
            </p>
            <p className="text-gray-700">
              Aunque se trata de una aplicación simulada, implementa todas las funcionalidades que tendría una tienda
              real, incluyendo autenticación de usuarios, persistencia de datos y diseño responsive.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/Link.jpeg"
              alt="Sobre el proyecto"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Tecnologías utilizadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Next.js 15</h3>
            <p className="text-gray-700">
              Framework de React que permite la creación de aplicaciones web modernas con renderizado del lado del
              servidor y generación de sitios estáticos.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">React 19</h3>
            <p className="text-gray-700">
              Biblioteca JavaScript para construir interfaces de usuario interactivas y reactivas con un enfoque basado
              en componentes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Tailwind CSS 4</h3>
            <p className="text-gray-700">
              Framework CSS utilitario que permite crear diseños personalizados sin salir del HTML, facilitando el
              desarrollo responsive.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Firebase</h3>
            <p className="text-gray-700">
              Plataforma de desarrollo de aplicaciones que proporciona autenticación de usuarios y base de datos en
              tiempo real (Firestore).
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">RAWG API</h3>
            <p className="text-gray-700">
              API externa que proporciona información detallada sobre videojuegos, incluyendo imágenes, descripciones y
              valoraciones.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">PWA</h3>
            <p className="text-gray-700">
              Tecnología que permite que la aplicación web funcione como una aplicación nativa, incluso sin conexión a
              internet.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Objetivos del proyecto</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-16">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong>Desarrollo moderno:</strong> Demostrar el uso de tecnologías modernas en el desarrollo web,
                incluyendo Next.js 15, React 19 y Tailwind CSS 4.
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong>Autenticación y persistencia:</strong> Implementar un sistema de autenticación de usuarios y
                persistencia de datos utilizando Firebase.
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong>Experiencia de usuario:</strong> Crear una interfaz de usuario intuitiva, atractiva y responsive
                que funcione en dispositivos móviles, tablets y ordenadores.
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong>Integración de API:</strong> Consumir datos de una API externa (RAWG) para mostrar información
                real y actualizada sobre videojuegos.
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-500 rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <strong>PWA:</strong> Implementar las características de una Progressive Web App para permitir la
                instalación y el uso sin conexión.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
