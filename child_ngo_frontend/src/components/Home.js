import Login from './Login';
function Home(){
    var token = localStorage.getItem('userToken');
    if(token === null){
        return(<div><h3>Please Login First</h3>
        <Login />
        </div>);
    }
    else{
    return(
        <div className="container">
            <div className="row child-info">
                <div className="col-4 child-info-det text-left ml-2">
                    <span>Name : </span><span>Ramesh Prakash</span>
                </div>
                <div className="col-4 child-info-det">
                    <span>Organization : </span><span>Bal Vikas</span>
                </div>
                <div className="col-4 child-info-det text-right mr-2">
                    <span>Designation : </span><span>Cluster Coordinator</span>
                </div>
            </div>
            <div className="row child-image-row">
                <div className="col-12 child-image-wrapper mt-5">
                    <img className="child-image" src="../assets/images/child_1.jpg" />;
                </div>
            </div>

        </div>
    )
    }
}
export default Home;