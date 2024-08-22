
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/ChatStore'
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/UserStore';
import './Detail.css'
const Detail = () => {

  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();

  const {currentUser} = useUserStore();

  const handleBlock = async () => {
     if (!user) return;
    
     const userDocRef = doc(db, "users", currentUser.id)
     try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked 
        ? arrayRemove(user.id) 
        : arrayUnion(user.id)
      });
      changeBlock()
     } catch (error) {
      console.log(error);
      
     }
  }

  return (
    <div className='detail'>
    <div className='user'>
      <img src={user?.avatar || "./avatar.png"} alt=''/>
      <h3>{user?.username}</h3>
      <p>Hello, I am using chatApp!</p>
   <div/>
    <div className='info'>
      <div className='option'>
        <div className='title'>
          <span>Chat settings</span>
          <img src='./arrowUp.png' alt=''/>
        </div>
      </div>

      <div className='option'>
        <div className='title'>
          <span>Privacy & help</span>
          <img src='./arrowUp.png' alt=''/>
        </div>
      </div>

      <div className='option'>
        <div className='title'>
          <span>Shared photos</span>
          <img src='./arrowDown.png' alt=''/>
        </div>
        <div className='photos'>
           <div className='photoItem'>
           <div className='photoDetail'>
           <img src='Chat-image-pexels.jpg'/>
           <span>photo_2024_2.png</span>
           </div>
            <img src='./download.png' alt='' className='icon'/>
           </div>

           <div className='photoItem'>
           <div className='photoDetail'>
           <img src='Chat-image-pexels.jpg'  />
           <span>photo_2024_2.png</span>
           </div>
            <img src='./download.png' alt=''  className='icon'/>
           </div>

           <div className='photoItem'>
           <div className='photoDetail'>
           <img src='Chat-image-pexels.jpg'  />
           <span>photo_2024_2.png</span>
           </div>
            <img src='./download.png' alt=''  className='icon'/>
           </div>
         
        </div>
      </div>

      <div className='option'>
        <div className='title'>
          <span>Shared Files</span>
          <img src='./arrowUp.png' alt=''/>
        </div>
      </div>
      <button onClick={handleBlock}>{
      
       isCurrentUserBlocked 
       ? "You are Blocked!" 
       : isReceiverBlocked 
       ? "User Blocked" 
       : "Block user"

      }</button>
    </div>
    <button className='logout' onClick={()=> auth.signOut()}>Logout</button>
    </div>
    </div>
   
  )
}

export default Detail
