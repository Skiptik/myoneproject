import Layout from "../../components/Layout/Layout";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileSwiper from "../../components/ProfileSwiper/ProfileSwiper";

const Profile = () => {
  return (
    <Layout>
      <h1>Личный кабинет</h1>
      <ProfileInfo fetchUrl={`user/info`} dataKey="user_info"/>
    </Layout>
  );
};

export default Profile;
