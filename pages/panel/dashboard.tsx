import Main from "../../components/main";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../store";
import { Gender } from "../auth/register";

const data = [
  { name: "Timer Left", value: 400 },
  { name: "Timer Spent", value: 300 },
];
const COLORS = ["#404040", "#FF8042"];

export default function Dashboard() {
  const { details } = useSelector<
    AppReducerType,
    {
      details: {
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
        gender?: Gender;
        registrationNumber?: string;
        phone_number?: string;
        verificationCode?: string;
        isVerified?: boolean;
        date?: Date;

        yearOfStudy?: string;
        department?: string;
        nationality?: string;
        state?: string;
        lga?: string;
        address?: string;
        guardian_firstName?: string;
        guardian_lastName?: string;
        guardian_relationship?: string;
        guardian_phoneNumber?: string;
        _id?: string;
        userID?: string;
      };
    }
  >((state) => {
    return {
      details: state.record.details,
    };
  });
  return (
    <>
      <Main>
        <section className="Dashboard">
          <div className="welcome_banner">
            <div className="preview">
              <div className="content_txt">
                <h4>Welcome to HRRS Dashboard</h4>
                <p>
                  Update your profile and start the room reservation process
                </p>
              </div>
              <div className="content_image"></div>
            </div>
          </div>
          <div className="preview_task">
            <h3>Task</h3>
            <div className="tasks">
              <span className="task">Make payment before deadline</span>
              <span className="task">Make reservation for a room</span>
              <span className="task">Upload a clear profile picture</span>
              <span className="task">Fill out your profile details</span>
            </div>
          </div>
          <div className="dead_line_preview">
            <h3>DeadlineTimer</h3>
            <div className="pie_chart">
              <ResponsiveContainer
                minWidth={300}
                width="30%"
                height="30%"
                minHeight={300}
                maxHeight={400}
              >
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <span className="txt">reservation time : timer</span>
            <span className="txt">
              reservation time : <span>status</span>
            </span>
            <ul>
              <li>Hostel Details</li>
              <span className="txt">reservation time : timer</span>
              <span className="txt">reservation time : timer</span>
              <span className="txt">reservation time : timer</span>
            </ul>
          </div>
        </section>
      </Main>
    </>
  );
}
