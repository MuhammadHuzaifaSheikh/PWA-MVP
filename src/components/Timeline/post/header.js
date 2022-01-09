import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Header({ username }) {
  return (
    <div className="post-header">
      {/* <Link to={`/p/${username}`} className="flex items-center"> */}
      <div className="header-left">
        <img
          className="rounded-full h-8 w-8 flex mr-3"
          src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`}
          alt={`${username} profile picture`}
        />
        <p className="font-bold">{username}</p>
      </div>
      <MoreHorizIcon className="MoreHorizIcon" />
      {/* </Link> */}
    </div>
  );
}
