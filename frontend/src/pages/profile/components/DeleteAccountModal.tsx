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
import { useDeleteUser } from "@/services/user.service";

export interface IDeleteAccountModalProps {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
}

export default function DeleteAccountModal(props: IDeleteAccountModalProps) {
  const { isOpen, onClose, userId } = props;

  const { mutateAsync: deleteUserMutate } = useDeleteUser({
    onSuccess: () => handleLogout(),
  });

  const handleDeleteAccount = async () => {
    if (!userId.length) return;
    await deleteUserMutate({ userId });
  };

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
            Please confirm to delete your account
          </AlertDialogTitle>
          <AlertDialogDescription>
            เมื่อลบแล้วคุณจะไม่สามารถใช้งานบัญชีนี้ได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="cursor-pointer">
            Cancel
          </AlertDialogAction>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="cursor-pointer"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
