const {NotificationsForApplicant, Applicant, Employee, NotificationsForEmployee} = require('../Models/Models')


class NotificationController {
    static async getApplicantNotifications(req, res) {
        const {id} = req.user
        try {
            const unreadNotifications = await NotificationsForApplicant.findAll({where: {idApplicant: id}})
            if (unreadNotifications.length === 0) {
                return res.status(404).json({message: "Непрочитанных уведомлений нет"});
            }
            const notificationIds = unreadNotifications.map(n => n.id);
            await NotificationsForApplicant.update(
                { isRead: true },
                { where: { id: notificationIds } }
            );
            return res.status(200).json(unreadNotifications);
        }catch(error) {
            return res.status(500).json({error: error.message});
        }
    }

    static async getAEmployeeNotifications(req, res) {
        const {id} = req.user
        try {
            const unreadNotifications = await NotificationsForEmployee.findAll({where: {idEmployee: Number(id)}})
            if (unreadNotifications.length === 0) {
                return res.status(404).json({message: "Непрочитанных уведомлений нет"});
            }
            const notificationIds = unreadNotifications.map(n => n.id);
            await NotificationsForEmployee.update(
                { isRead: true },
                { where: { id: notificationIds } }
            );
            return res.status(200).json(unreadNotifications);
        }catch(error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = NotificationController