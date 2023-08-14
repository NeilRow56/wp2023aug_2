import SignInForm from "../components/signin-form";



const SignUpPage = () => {
  return (
    <main className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md" >
        <SignInForm />
      </div>
     </main> 
  );
};

export default SignUpPage;