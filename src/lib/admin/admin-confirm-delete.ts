'use client';

let swalStylesLoaded = false;

async function loadSweetAlert() {
  if (!swalStylesLoaded) {
    await import('sweetalert2/dist/sweetalert2.min.css');
    swalStylesLoaded = true;
  }

  const { default: Swal } = await import('sweetalert2');
  return Swal;
}

type ConfirmDeleteOptions = {
  title?: string;
  message?: string;
};

export async function confirmAdminDelete({
  title = 'Confirm deletion',
  message = 'Are you sure you want to delete this? This action cannot be undone.',
}: ConfirmDeleteOptions = {}): Promise<boolean> {
  const Swal = await loadSweetAlert();

  const result = await Swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#e6533c',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    focusCancel: true,
    backdrop: 'rgba(5, 22, 46, 0.32)',
    customClass: {
      popup: 'swal-admin-popup',
      title: 'swal-admin-title',
      htmlContainer: 'swal-admin-text',
      confirmButton: 'swal-admin-confirm',
      cancelButton: 'swal-admin-cancel',
      icon: 'swal-admin-icon',
    },
  });

  return result.isConfirmed;
}
