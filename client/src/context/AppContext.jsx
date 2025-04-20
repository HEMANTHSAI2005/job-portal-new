import { createContext, useEffect, useState } from "react"
import { jobsData } from "../assets/assets"
import { toast } from "react-toastify"
import axios from "axios"
import { useUser, useAuth } from "@clerk/clerk-react"

export const AppContext = createContext(); 

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()


    console.log("Backend URL:", backendUrl);


    const[searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //function to fetch jobs


    // const fetchJobs = async ()=>{
    //     setJobs(jobsData)
    // }
    const fetchJobs = async () => {
        console.log("outside trycatch")
        try {
            console.log("start")
            console.log(backendUrl+`/api/jobs`)
            const {data} = await axios.get(backendUrl+'/api/jobs')
            console.log("after api")
            if(data.success){
                console.log("success")
                setJobs(data.jobs)
                console.log(data.jobs)
            }else{
                console.log("unsuccess")
                toast.error(data.message)
            }
        } catch (error) {
            console.log("inside catch")
            toast.error(error.message)
        }
    }

    //Function to fetch company data
    const fetchCompanyData = async() =>{
        try {
            const response = await axios.get(backendUrl+'/api/company/company',{headers:{token: companyToken}})

            const data = response.data;

            if(data.success){
                setCompanyData(data.company) 
                console.log(data)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async () =>{
        try {
            
            const token = await getToken();

            const {data} = await axios.get(backendUrl+'/api/users/user',
                {headers: {Authorization:`Bearer ${token}`}})

            if(data.success){ 
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to fetch user's applied applications data
    const fetchUserApplications = async () => {
        try {
            const token = await getToken()

            const {data} = await axios.get(backendUrl+'/api/users/applications',
                {headers: { Authorization : `Bearer ${token}`}}
            )

            if(data.success){
                setUserApplications(data.applications)
            }
            else{
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        console.log("useEffect called - fetching jobs...");
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if(storedCompanyToken)
        {
            setCompanyToken(storedCompanyToken)
        }
    },[])



    useEffect(()=>{
        if(companyToken){
            fetchCompanyData()
        }

    },[companyToken])

    //user details
    useEffect(()=>{
        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    },[user])

    const value = {
        setSearchFilter,searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData, fetchUserApplications,
    }                       

    return (
        <AppContext.Provider value={value}> 
            {props.children} {/* ✅ Allow children to use context */}
        </AppContext.Provider>
    );
};


