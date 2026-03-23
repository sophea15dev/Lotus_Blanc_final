import Navbar from './component/Navbar'; 
import Footer from './component/Footer';  

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* The rest of your website content goes here */}
      <main className="p-10 text-center">
        <h1 className="text-4xl font-bold mt-20">Welcome to Lotus Blanc</h1>
        <p className="text-gray-600 mt-4">Experience fine dining and bakery excellence.</p>
      </main>
      <Footer />
    </div>
    
  )
}

export default App;