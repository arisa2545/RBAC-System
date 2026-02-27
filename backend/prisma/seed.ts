import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // ==========================================
  // 1. Seed Permissions
  // ==========================================
  const permissionsData = [
    {
      name: 'VIEW_DASHBOARD',
      description: 'สามารถเข้าถึงและดูข้อมูลสรุปบนหน้า Dashboard ได้',
    },
    {
      name: 'VIEW_USER',
      description: 'สามารถดูรายชื่อและข้อมูลรายละเอียดของ User ได้',
    },
    {
      name: 'VIEW_ROLE_PERMISSION',
      description: 'สามารถดูรายการ Role และ Permission ทั้งหมดได้',
    },
    {
      name: 'EDIT_USER_INFO',
      description: 'สามารถแก้ไขข้อมูลและ Role ของ User ได้',
    },
    {
      name: 'MANAGE_ROLE_PERMISSION',
      description: 'สามารถจัดการสิทธิ์ของแต่ละ Role ได้',
    },
    { name: 'CAN_DELETE', description: 'สามารถลบ Account ของตัวเองได้' },
  ];

  for (const permission of permissionsData) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  const allPermissions = await prisma.permission.findMany();
  const getPermissionIds = (names: string[]) =>
    allPermissions
      .filter((p) => names.includes(p.name))
      .map((p) => ({ id: p.id }));

  // ================================================
  // 2. Seed Roles (with relation to Permissions)
  // ================================================
  const rolesData = [
    {
      name: 'ADMIN',
      description:
        'ผู้ดูแลระบบ มีสิทธิ์สูงสุดสามารถแก้ไขข้อมูล User รวมถึงการจัดการ Role & Permission',
      role_permissions: {
        create: getPermissionIds([
          'VIEW_DASHBOARD',
          'VIEW_USER',
          'VIEW_ROLE_PERMISSION',
          'EDIT_USER_INFO',
          'MANAGE_ROLE_PERMISSION',
          'CAN_DELETE',
        ]).map((permission) => ({ permission_id: permission.id })),
      },
    },
    {
      name: 'MANAGER',
      description:
        'ผู้จัดการ สามารถดูข้อมูลในระบบได้ทั้งหมด แต่ไม่สามารถแก้ไขได้',
      role_permissions: {
        create: getPermissionIds([
          'VIEW_DASHBOARD',
          'VIEW_USER',
          'VIEW_ROLE_PERMISSION',
        ]).map((permission) => ({ permission_id: permission.id })),
      },
    },
    {
      name: 'USER',
      description: 'ผู้ใช้งานทั่วไป สามารถดู Dashboard และลบ Account ตัวเองได้',
      role_permissions: {
        create: getPermissionIds(['VIEW_DASHBOARD', 'CAN_DELETE']).map(
          (permission) => ({ permission_id: permission.id }),
        ),
      },
    },
  ];

  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  // ==========================================
  // 3. Seed Users
  // ==========================================

  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const managerRole = await prisma.role.findUnique({
    where: { name: 'MANAGER' },
  });
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });

  if (!adminRole || !managerRole || !userRole) {
    throw new Error('Roles not found! Please check role creation step.');
  }

  const defaultPassword = 'password123';

  const mockUsers = [
    // --- ADMIN ---
    {
      username: 'admin_one',
      email: 'admin1@example.com',
      first_name: 'Super',
      last_name: 'Admin 1',
      phone: '0800000001',
      role_id: adminRole.id,
    },
    {
      username: 'admin_two',
      email: 'admin2@example.com',
      first_name: 'Super',
      last_name: 'Admin 2',
      phone: '0800000002',
      role_id: adminRole.id,
    },

    // --- MANAGER ---
    {
      username: 'sales_manager',
      email: 'sales_manager@example.com',
      first_name: 'Sales',
      last_name: 'Manager',
      phone: '0811111111',
      role_id: managerRole.id,
    },
    {
      username: 'marketing_manager',
      email: 'marketing_manager@example.com',
      first_name: 'Marketing',
      last_name: 'Manager',
      phone: '0811111112',
      role_id: managerRole.id,
    },
    {
      username: 'operation_manager',
      email: 'operation_manager@example.com',
      first_name: 'Operation',
      last_name: 'Manager',
      phone: '0811111113',
      role_id: managerRole.id,
    },

    // --- USER ---
    {
      username: 'john.doe',
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      phone: '0822222221',
      role_id: userRole.id,
    },
    {
      username: 'jane_s',
      email: 'jane.smith@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
      phone: '0822222222',
      role_id: userRole.id,
    },
    {
      username: 'b.johnson',
      email: 'bob.j@example.com',
      first_name: 'Bob',
      last_name: 'Johnson',
      phone: '0822222223',
      role_id: userRole.id,
    },
    {
      username: 'alice.w',
      email: 'alice.williams@example.com',
      first_name: 'Alice',
      last_name: 'Williams',
      phone: '0822222224',
      role_id: userRole.id,
    },
    {
      username: 'char_lie.b',
      email: 'charlie.b@example.com',
      first_name: 'Charlie',
      last_name: 'Brown',
      phone: '0822222225',
      role_id: userRole.id,
    },
  ];

  for (const user of mockUsers) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        ...user,
        password: defaultPassword,
        is_delete: false,
      },
    });
  }

  console.log('✅ Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
