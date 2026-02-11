import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Users, User2, MapPin } from "lucide-react";

interface School {
  name: string;
  address: string;
  principal: string;
  students: number | string;
  staff: number | string;
}

const schools: School[] = [
  {
    name: "Kendriya Vidyalay Ambazhari Nagpur",
    address: "4XPH+MRQ, Ordnance Factory Ambajhari, Defence Estate, Amravati Rd, Nagpur, Maharashtra 440021",
    principal: "Mr. P.S Kombade",
    students: 1419,
    staff: 51,
  },
  {
    name: "New Z P School",
    address: "10, Hingna road, Electronic zone square, Opposite Indian oil petrol pump, M.I.D.C, Hingna Rd, Gajanan Nagar, Lokmanya Nagar, Nagpur Maharashtra 441110",
    principal: "N/A",
    students: "N/A",
    staff: "N/A",
  },
  {
    name: "ZP Primary School",
    address: "National highway 255, Bazaar, Raipur, Hingna 441110",
    principal: "N/A",
    students: "N/A",
    staff: "N/A",
  },
  {
    name: "The Pride School",
    address: "367, Lokmanya Nagar, Hingna Rd, behind Ram Mandir Rd, Nagpur, Maharashtra 441110",
    principal: "Atmesh Sinha",
    students: 233,
    staff: 8,
  },
  {
    name: "Patwardhan School",
    address: "43JW+86P, Wardha Rd, Sitabuldi, Nagpur, Maharashtra 440001",
    principal: "N/A",
    students: 250,
    staff: 11,
  },
  {
    name: "Indira Gandhi High School",
    address: "Plot No.51, Sharda Nagar, Old Subhedar Layout, Jawahar Nagar, Ayodhya Nagar, Nagpur, Maharashtra 440024",
    principal: "N/A",
    students: 172,
    staff: 16,
  },
  {
    name: "MKH Sancheti Public School",
    address: "Wardha Road, Opposite Sai Mandir, Hindustan Colony, Samarth Nagar East, Nagpur, Maharashtra 440015",
    principal: "Mrs. Himadujit Shrivastava",
    students: "Not Specified",
    staff: 57,
  },
  {
    name: "Gyan Vikas Madhyamik Vidyalaya",
    address: "Police Station Plot No 973, KDK College Rd, Nandanvan, Nagpur, Maharashtra 440009",
    principal: "Ms. Teena Pradeep Soni",
    students: 631,
    staff: 19,
  },
];

const SchoolList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {schools.map((school, i) => (
        <Card
          key={i}
          className="p-6 shadow-lg hover:shadow-2xl transition rounded-2xl bg-white border border-gray-200"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{school.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin size={16} /> {school.address}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <User2 size={16} /> <b>Principal:</b> {school.principal}
            </p>
            <p className="flex items-center gap-2">
              <Users size={16} /> <b>Students:</b> {school.students}
            </p>
            <p className="flex items-center gap-2">
              <Users size={16} /> <b>Staff:</b> {school.staff}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SchoolList;
