import SkeletonLoadScreen from "../../components/static/SkeletonLoadScreen";
import { useSchoolData } from "../../hook/useSchoolAuth";

const HomeScreen = () => {
  const { data, isLoading } = useSchoolData();

  let value = Array.from({ length: 6 });

  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div className="flex flex-wrap">
          {value.map((props: any, i: number) => (
            <SkeletonLoadScreen key={`${i} ${props}`} />
          ))}
        </div>
      ) : (
        <div>
          <div>{data?.schoolName}</div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
