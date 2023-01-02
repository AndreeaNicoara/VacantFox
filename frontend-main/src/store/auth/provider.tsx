import R from 'react';

interface AuthContextType {
   user: any;
   signin: (user, callback: VoidFunction) => void;
   signout: (callback: VoidFunction) => void;
}

const AuthContext = R.createContext<AuthContextType>(null as any);

export default function AuthProvider(props: R.PropsWithChildren) {
   const [user, setUser] = R.useState<any>(null);

   const signin = (newUser, callback: VoidFunction) => {
      setUser({
         ...newUser.user,
         // TODO: should use cookie instead of Bearer token in the request header
         token: newUser.token,
      });
      callback && callback();
   };

   const signout = (callback: VoidFunction) => {
      setUser(null);
      callback && callback();
   };

   const value = { user, signin, signout };

   return (
      <AuthContext.Provider value={value}>
         {props.children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   return R.useContext(AuthContext);
}
