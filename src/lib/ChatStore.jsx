
import { create } from 'zustand'
import { useUserStore } from './UserStore';

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser

    //CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
       return set({
        chatId,
        user: null,
        isCurrentBlocked: true,
        isReceiverBlocked: false,
       });
    }
    
     //CHECK IF CURRENT USER IS BLOCKED
    else if (currentUser.blocked.includes(user.id)) {
        return set({
         chatId,
         user: user,
         isCurrentBlocked: false,
         isReceiverBlocked: true,
        });
     } else{
      
    return set({
      chatId,
      user,
      isCurrentBlocked: false,
      isReceiverBlocked: false,
     });
    }
  },
  changeBlock: () => {
    set((state) => ({...state, isReceiverBlocked: !state.isReceiverBlocked}));
  },
       
}))