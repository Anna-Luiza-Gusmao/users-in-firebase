import { NavBar } from "../../components/NavBar"
import { DashboardContainer } from "./styles"
import Chart from "react-apexcharts"

export function Dashboard() {
    const series = [{ name: "usuários", data: [2, 1] }];
    const options = {
        options: {
            chart: {
                id: "bar"
            },
            legend: {
                show: true,
                position: 'right',
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
        labels: ["Administrador", "Supervisor"],
        fill: {
            colors: ['#f59654', '#FF974F']
        },
        dataLabels: {
            style: {
              colors: ['#F2F2F2']
            }
        },
    }

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