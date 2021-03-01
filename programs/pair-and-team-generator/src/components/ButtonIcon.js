import '../stylesheets/ButtonIcon.scss';

export default props => {
  return (
    <i
      title={props.title}
      className={`btn-icon fa fa-${props.icon} fa-2x`}
      onClick={props.onClick}
    />
  );
};
