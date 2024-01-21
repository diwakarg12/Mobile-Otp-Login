import './App.css'
import Phoneumber from './Component/Phoneumber';

function App() {

  return (
    <div className='bg-slate-700 flex flex-col items-center justify-center text-white text-xl font-semibold pt-10 pb-10'>
      <h1 className='capitalize mb-10 text-4xl'>Login with Mobile otp</h1>
      <Phoneumber />
    </div>
  )
}

export default App
