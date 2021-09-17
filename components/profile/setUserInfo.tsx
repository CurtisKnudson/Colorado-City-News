export const UserInfo = () => {
  return (
    <div className="flex flex-col mt-8">
      <label className="mt-8" htmlFor="name">
        Name:
      </label>
      <input type="text" name="name" placeholder="Full Name" />
      <label className="mt-8" htmlFor="email">
        Email:
      </label>
      <input type="email" name="email" readOnly placeholder="Email Address" />
      <div className="text-gray-500 italic text-xs mt-8">
        **If you want to comment, post or interact on this website you must have
        a name and profile picture
      </div>
    </div>
  );
};
