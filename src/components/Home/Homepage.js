import videoHompage from '../../asset/video-homepage.mp4'

const Homepage = (props) => {
    return (
        <div>
            <video>
                <source src={videoHompage}
                    type="" />
            </video>
        </div>
    )
}
export default Homepage