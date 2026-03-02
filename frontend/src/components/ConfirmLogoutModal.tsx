import { useNavigate } from "@tanstack/react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface IConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmLogoutModal(props: IConfirmLogoutModalProps) {
  const { isOpen, onClose } = props;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    navigate({ to: "/login" });
  };

  const navigate = useNavigate();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-700 font-extrabold">
            Please confirm to logout!
          </AlertDialogTitle>
          <AlertDialogDescription>
            กรุณายืนยันว่าคุณต้องการที่จะออกจากระบบ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="cursor-pointer">
            Cancel
          </AlertDialogAction>
          <AlertDialogAction
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
