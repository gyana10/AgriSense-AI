import {
  FaSeedling,
  FaChartLine,
  FaBug,
  FaCloudSunRain,
  FaRobot,
  FaLeaf,
} from "react-icons/fa";

import Card from "../common/Card";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const services = [
  {
    title: "Crop Recommendation",
    description:
      "Recommend the best crop using soil nutrients, weather and pH.",
    icon: <FaSeedling className="text-5xl text-green-600" />,
  },
  {
    title: "Yield Prediction",
    description:
      "Predict crop yield and estimate production before harvesting.",
    icon: <FaChartLine className="text-5xl text-green-600" />,
  },
  {
    title: "Disease Detection",
    description:
      "Detect plant diseases using Computer Vision and Deep Learning.",
    icon: <FaLeaf className="text-5xl text-green-600" />,
  },
  {
    title: "Pest Detection",
    description:
      "Detect pests using YOLO models with confidence scores.",
    icon: <FaBug className="text-5xl text-green-600" />,
  },
  {
    title: "Weather Intelligence",
    description:
      "Monitor weather, rainfall and disease outbreak risks.",
    icon: <FaCloudSunRain className="text-5xl text-green-600" />,
  },
  {
    title: "AI Assistant",
    description:
      "Ask agriculture questions and receive AI-powered recommendations.",
    icon: <FaRobot className="text-5xl text-green-600" />,
  },
];

function Services() {
  return (
    <section id="modules" className="bg-slate-50 py-20">
      <Container>
        <SectionTitle
          title="AI Powered Modules"
          subtitle="Everything you need for intelligent precision agriculture."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index}>
              <div className="text-center">
                <div className="mb-5 flex justify-center">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 text-slate-600">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;