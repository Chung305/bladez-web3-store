import Image from "next/image";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  UncontrolledCarousel,
} from "reactstrap";
const Team = () => {
  const teamBlade = [
    {
      name: "Chung",
      discord: "#Ocbladez",
      image: "/team/bladezClub.png",
      role: "Founder",
    },
    // {
    //   name: "Alex",
    //   discord: "#ToeFu",
    //   image: "/team/Alex.png",
    //   role: "Product Designer",
    // },
    // {
    //   name: "Fabain",
    //   discord: "#Xmanny",
    //   image: "/team/Fabain.png",
    //   role: "Community Manager",
    // },
    // {
    //   name: "Tyler",
    //   discord: "#Redsy",
    //   image: "/team/Tyler.png",
    //   role: "Marketing Manager",
    // },
  ];

  return (
    <div className="page-container">
      <h1>The Team</h1>
      <div className="team-image-container">
        {teamBlade.map((team) => (
          <Card className="team-card">
            <CardBody>
              <CardTitle tag="h3">{team.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {team.discord}
              </CardSubtitle>
            </CardBody>
            <img className="team-image" src={team.image} />
            <CardBody>
              <h3>{team.role}</h3>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
