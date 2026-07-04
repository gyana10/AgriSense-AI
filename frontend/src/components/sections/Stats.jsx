import { FaSeedling, FaRobot, FaChartLine, FaUsers } from "react-icons/fa";
import Card from "../common/Card";
import Container from "../common/Container";

const stats = [
  {
    icon: <FaChartLine className="text-4xl text-green-600" />,
    value: "98%",
    title: "Prediction Accuracy",
  },
  {
    icon: <FaSeedling className="text-4xl text-green-600" />,
    value: "50+",
    title: "Supported Crops",
  },
  {
    icon: <FaRobot className="text-4xl text-green-600" />,
    value: "24/7",
    title: "AI Monitoring",
  },
  {
    icon: <FaUsers className="text-4xl text-green-600" />,
    value: "10K+",
    title: "Farmers Supported",
  },
];

function Stats() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Card key={index}>
              <div className="text-center">
                <div className="flex justify-center">{item.icon}</div>

                <h2 className="mt-4 text-4xl font-bold text-slate-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-slate-600">
                  {item.title}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Stats;