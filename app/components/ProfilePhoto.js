import Image from 'next/image';
import profilePhoto from '../../public/profilephoto.png';

export default function ProfilePhoto() {
  return (
    <Image
      alt="A picture of Matt looking kinda cool but admittedly quite moody."
      src={profilePhoto}
      width={700}
      height={475}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}
