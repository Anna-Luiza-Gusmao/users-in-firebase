import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar"
import { DashboardContainer } from "./styles"
import Chart from "react-apexcharts"
import { collection } from "@firebase/firestore"
import { getDocs } from "firebase/firestore"
import { firestore } from "../../firebase/config"


export function Dashboard() {
    const allUsers = collection(firestore, "users")
    let [amountUsers, setAmountUsers] = useState<number[]>([])

    const series = [{ name: "usuários", data: amountUsers }]
    const options = {
        options: {
            chart: {
                id: "bar"
            },
        },
        title: {
            text: "Total de Usuários",
            margin: 20,
            style: {
                fontSize:  '16px',
                fontWeight:  'bold',
                fontFamily:  'Lato',
                color:  '#404040'
            },
        },
        series: series,
        plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            },
        },
        xaxis: {
            categories: ['administrador', 'supervisor']
        },
        fill: {
            colors: ['#f59654', '#FF974F']
        },
        dataLabels: {
            style: {
              colors: ['#F2F2F2']
            }
        },
    }
    
    useEffect(() => {
        async function loadUsers() {
            const querySnapshot = await getDocs(allUsers)
            let administrators = 0
            let supervisors = 0
            querySnapshot.forEach((doc) => {
                if(doc.data().typeUser === 'administrador') {
                    administrators = administrators + 1
                }else{
                    supervisors = supervisors + 1
                }
            })

            setAmountUsers([administrators, supervisors])
        }
        loadUsers()
    }, [])

    return (
        <>
            <NavBar />
            <DashboardContainer>
                <section>
                    <Chart
                        options={options}
                        type="bar"
                        width="500"
                        series={series}
                    />
                </section>
            </DashboardContainer>
        </>
    )
}