'use strict';

var primitives = require('@tauri-apps/api/primitives');

// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * Send toast notifications (brief auto-expiring OS window element) to your user.
 * Can also be used with the Notification Web API.
 *
 * @module
 */
var ScheduleEvery;
(function (ScheduleEvery) {
    ScheduleEvery["Year"] = "year";
    ScheduleEvery["Month"] = "month";
    ScheduleEvery["TwoWeeks"] = "twoWeeks";
    ScheduleEvery["Week"] = "week";
    ScheduleEvery["Day"] = "day";
    ScheduleEvery["Hour"] = "hour";
    ScheduleEvery["Minute"] = "minute";
    /**
     * Not supported on iOS.
     */
    ScheduleEvery["Second"] = "second";
})(ScheduleEvery || (ScheduleEvery = {}));
exports.Importance = void 0;
(function (Importance) {
    Importance[Importance["None"] = 0] = "None";
    Importance[Importance["Min"] = 1] = "Min";
    Importance[Importance["Low"] = 2] = "Low";
    Importance[Importance["Default"] = 3] = "Default";
    Importance[Importance["High"] = 4] = "High";
})(exports.Importance || (exports.Importance = {}));
exports.Visibility = void 0;
(function (Visibility) {
    Visibility[Visibility["Secret"] = -1] = "Secret";
    Visibility[Visibility["Private"] = 0] = "Private";
    Visibility[Visibility["Public"] = 1] = "Public";
})(exports.Visibility || (exports.Visibility = {}));
/**
 * Checks if the permission to send notifications is granted.
 * @example
 * ```typescript
 * import { isPermissionGranted } from '@tauri-apps/plugin-notification';
 * const permissionGranted = await isPermissionGranted();
 * ```
 *
 * @since 2.0.0
 */
async function isPermissionGranted() {
    if (window.Notification.permission !== "default") {
        return Promise.resolve(window.Notification.permission === "granted");
    }
    return primitives.invoke("plugin:notification|is_permission_granted");
}
/**
 * Requests the permission to send notifications.
 * @example
 * ```typescript
 * import { isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';
 * let permissionGranted = await isPermissionGranted();
 * if (!permissionGranted) {
 *   const permission = await requestPermission();
 *   permissionGranted = permission === 'granted';
 * }
 * ```
 *
 * @returns A promise resolving to whether the user granted the permission or not.
 *
 * @since 2.0.0
 */
async function requestPermission() {
    return window.Notification.requestPermission();
}
/**
 * Sends a notification to the user.
 * @example
 * ```typescript
 * import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
 * let permissionGranted = await isPermissionGranted();
 * if (!permissionGranted) {
 *   const permission = await requestPermission();
 *   permissionGranted = permission === 'granted';
 * }
 * if (permissionGranted) {
 *   sendNotification('Tauri is awesome!');
 *   sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
 * }
 * ```
 *
 * @since 2.0.0
 */
function sendNotification(options) {
    if (typeof options === "string") {
        // eslint-disable-next-line no-new
        new window.Notification(options);
    }
    else {
        // eslint-disable-next-line no-new
        new window.Notification(options.title, options);
    }
}
/**
 * Register actions that are performed when the user clicks on the notification.
 *
 * @example
 * ```typescript
 * import { registerActionTypes } from '@tauri-apps/plugin-notification';
 * await registerActionTypes([{
 *   id: 'tauri',
 *   actions: [{
 *     id: 'my-action',
 *     title: 'Settings'
 *   }]
 * }])
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function registerActionTypes(types) {
    return primitives.invoke("plugin:notification|register_action_types", { types });
}
/**
 * Retrieves the list of pending notifications.
 *
 * @example
 * ```typescript
 * import { pending } from '@tauri-apps/plugin-notification';
 * const pendingNotifications = await pending();
 * ```
 *
 * @returns A promise resolving to the list of pending notifications.
 *
 * @since 2.0.0
 */
async function pending() {
    return primitives.invoke("plugin:notification|get_pending");
}
/**
 * Cancels the pending notifications with the given list of identifiers.
 *
 * @example
 * ```typescript
 * import { cancel } from '@tauri-apps/plugin-notification';
 * await cancel([-34234, 23432, 4311]);
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function cancel(notifications) {
    return primitives.invoke("plugin:notification|cancel", { notifications });
}
/**
 * Cancels all pending notifications.
 *
 * @example
 * ```typescript
 * import { cancelAll } from '@tauri-apps/plugin-notification';
 * await cancelAll();
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function cancelAll() {
    return primitives.invoke("plugin:notification|cancel");
}
/**
 * Retrieves the list of active notifications.
 *
 * @example
 * ```typescript
 * import { active } from '@tauri-apps/plugin-notification';
 * const activeNotifications = await active();
 * ```
 *
 * @returns A promise resolving to the list of active notifications.
 *
 * @since 2.0.0
 */
async function active() {
    return primitives.invoke("plugin:notification|get_active");
}
/**
 * Removes the active notifications with the given list of identifiers.
 *
 * @example
 * ```typescript
 * import { cancel } from '@tauri-apps/plugin-notification';
 * await cancel([-34234, 23432, 4311])
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function removeActive(notifications) {
    return primitives.invoke("plugin:notification|remove_active", { notifications });
}
/**
 * Removes all active notifications.
 *
 * @example
 * ```typescript
 * import { removeAllActive } from '@tauri-apps/plugin-notification';
 * await removeAllActive()
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function removeAllActive() {
    return primitives.invoke("plugin:notification|remove_active");
}
/**
 * Creates a notification channel.
 *
 * @example
 * ```typescript
 * import { createChannel, Importance, Visibility } from '@tauri-apps/plugin-notification';
 * await createChannel({
 *   id: 'new-messages',
 *   name: 'New Messages',
 *   lights: true,
 *   vibration: true,
 *   importance: Importance.Default,
 *   visibility: Visibility.Private
 * });
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function createChannel(channel) {
    return primitives.invoke("plugin:notification|create_channel", { ...channel });
}
/**
 * Removes the channel with the given identifier.
 *
 * @example
 * ```typescript
 * import { removeChannel } from '@tauri-apps/plugin-notification';
 * await removeChannel();
 * ```
 *
 * @returns A promise indicating the success or failure of the operation.
 *
 * @since 2.0.0
 */
async function removeChannel(id) {
    return primitives.invoke("plugin:notification|delete_channel", { id });
}
/**
 * Retrieves the list of notification channels.
 *
 * @example
 * ```typescript
 * import { channels } from '@tauri-apps/plugin-notification';
 * const notificationChannels = await channels();
 * ```
 *
 * @returns A promise resolving to the list of notification channels.
 *
 * @since 2.0.0
 */
async function channels() {
    return primitives.invoke("plugin:notification|listChannels");
}
async function onNotificationReceived(cb) {
    return primitives.addPluginListener("notification", "notification", cb);
}
async function onAction(cb) {
    return primitives.addPluginListener("notification", "actionPerformed", cb);
}

exports.active = active;
exports.cancel = cancel;
exports.cancelAll = cancelAll;
exports.channels = channels;
exports.createChannel = createChannel;
exports.isPermissionGranted = isPermissionGranted;
exports.onAction = onAction;
exports.onNotificationReceived = onNotificationReceived;
exports.pending = pending;
exports.registerActionTypes = registerActionTypes;
exports.removeActive = removeActive;
exports.removeAllActive = removeAllActive;
exports.removeChannel = removeChannel;
exports.requestPermission = requestPermission;
exports.sendNotification = sendNotification;
