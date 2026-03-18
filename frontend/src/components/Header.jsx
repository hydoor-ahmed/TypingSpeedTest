import logo from "../assets/images/logo-small.svg"
import personalBest from "../assets/images/icon-personal-best.svg"

const Header = ({personalBestWpm}) => {
  return (
    <div className="flex justify-between py-6">
      <div className="flex items-center justify-center gap-2">
        <img src={logo} alt="Logo" />
        <div>
          <h1 className="font-bold text-xl">Typing Speed Test</h1>
          <p className="text-neutral-500 text-xs">Type as fast as you can in 60 seconds</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img src={personalBest} alt="Personal best wpm" />
        <h3><span className="text-neutral-500">Personal best:</span> {personalBestWpm} WPM</h3>
      </div>
    </div>
  )
}

export default Header