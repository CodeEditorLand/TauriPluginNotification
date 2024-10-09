if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_NOTIFICATION__ = (function (i) {
		"use strict";
		function t(i, t, n, e) {
			if ("a" === n && !e)
				throw new TypeError(
					"Private accessor was defined without a getter",
				);
			if ("function" == typeof t ? i !== t || !e : !t.has(i))
				throw new TypeError(
					"Cannot read private member from an object whose class did not declare it",
				);
			return "m" === n
				? e
				: "a" === n
					? e.call(i)
					: e
						? e.value
						: t.get(i);
		}
		function n(i, t, n, e, o) {
			if ("function" == typeof t ? i !== t || !o : !t.has(i))
				throw new TypeError(
					"Cannot write private member to an object whose class did not declare it",
				);
			return t.set(i, n), n;
		}
		var e, o, a, r, c, s;
		"function" == typeof SuppressedError && SuppressedError;
		class l {
			constructor() {
				(this.__TAURI_CHANNEL_MARKER__ = !0),
					e.set(this, () => {}),
					o.set(this, 0),
					a.set(this, {}),
					(this.id = (function (i, t = !1) {
						return window.__TAURI_INTERNALS__.transformCallback(
							i,
							t,
						);
					})(({ message: i, id: r }) => {
						if (r === t(this, o, "f")) {
							n(this, o, r + 1), t(this, e, "f").call(this, i);
							const c = Object.keys(t(this, a, "f"));
							if (c.length > 0) {
								let i = r + 1;
								for (const n of c.sort()) {
									if (parseInt(n) !== i) break;
									{
										const o = t(this, a, "f")[n];
										delete t(this, a, "f")[n],
											t(this, e, "f").call(this, o),
											(i += 1);
									}
								}
								n(this, o, i);
							}
						} else t(this, a, "f")[r.toString()] = i;
					}));
			}
			set onmessage(i) {
				n(this, e, i);
			}
			get onmessage() {
				return t(this, e, "f");
			}
			toJSON() {
				return `__CHANNEL__:${this.id}`;
			}
		}
		(e = new WeakMap()), (o = new WeakMap()), (a = new WeakMap());
		class u {
			constructor(i, t, n) {
				(this.plugin = i), (this.event = t), (this.channelId = n);
			}
			async unregister() {
				return d(`plugin:${this.plugin}|remove_listener`, {
					event: this.event,
					channelId: this.channelId,
				});
			}
		}
		async function f(i, t, n) {
			const e = new l();
			return (
				(e.onmessage = n),
				d(`plugin:${i}|register_listener`, {
					event: t,
					handler: e,
				}).then(() => new u(i, t, e.id))
			);
		}
		async function d(i, t = {}, n) {
			return window.__TAURI_INTERNALS__.invoke(i, t, n);
		}
		(i.ScheduleEvery = void 0),
			((r = i.ScheduleEvery || (i.ScheduleEvery = {})).Year = "year"),
			(r.Month = "month"),
			(r.TwoWeeks = "twoWeeks"),
			(r.Week = "week"),
			(r.Day = "day"),
			(r.Hour = "hour"),
			(r.Minute = "minute"),
			(r.Second = "second");
		return (
			(i.Importance = void 0),
			((c = i.Importance || (i.Importance = {}))[(c.None = 0)] = "None"),
			(c[(c.Min = 1)] = "Min"),
			(c[(c.Low = 2)] = "Low"),
			(c[(c.Default = 3)] = "Default"),
			(c[(c.High = 4)] = "High"),
			(i.Visibility = void 0),
			((s = i.Visibility || (i.Visibility = {}))[(s.Secret = -1)] =
				"Secret"),
			(s[(s.Private = 0)] = "Private"),
			(s[(s.Public = 1)] = "Public"),
			(i.Schedule = class {
				static at(i, t = !1, n = !1) {
					return {
						at: { date: i, repeating: t, allowWhileIdle: n },
						interval: void 0,
						every: void 0,
					};
				}
				static interval(i, t = !1) {
					return {
						at: void 0,
						interval: { interval: i, allowWhileIdle: t },
						every: void 0,
					};
				}
				static every(i, t, n = !1) {
					return {
						at: void 0,
						interval: void 0,
						every: { interval: i, count: t, allowWhileIdle: n },
					};
				}
			}),
			(i.active = async function () {
				return await d("plugin:notification|get_active");
			}),
			(i.cancel = async function (i) {
				await d("plugin:notification|cancel", { notifications: i });
			}),
			(i.cancelAll = async function () {
				await d("plugin:notification|cancel");
			}),
			(i.channels = async function () {
				return await d("plugin:notification|listChannels");
			}),
			(i.createChannel = async function (i) {
				await d("plugin:notification|create_channel", { ...i });
			}),
			(i.isPermissionGranted = async function () {
				return "default" !== window.Notification.permission
					? await Promise.resolve(
							"granted" === window.Notification.permission,
						)
					: await d("plugin:notification|is_permission_granted");
			}),
			(i.onAction = async function (i) {
				return await f("notification", "actionPerformed", i);
			}),
			(i.onNotificationReceived = async function (i) {
				return await f("notification", "notification", i);
			}),
			(i.pending = async function () {
				return await d("plugin:notification|get_pending");
			}),
			(i.registerActionTypes = async function (i) {
				await d("plugin:notification|register_action_types", {
					types: i,
				});
			}),
			(i.removeActive = async function (i) {
				await d("plugin:notification|remove_active", {
					notifications: i,
				});
			}),
			(i.removeAllActive = async function () {
				await d("plugin:notification|remove_active");
			}),
			(i.removeChannel = async function (i) {
				await d("plugin:notification|delete_channel", { id: i });
			}),
			(i.requestPermission = async function () {
				return await window.Notification.requestPermission();
			}),
			(i.sendNotification = function (i) {
				"string" == typeof i
					? new window.Notification(i)
					: new window.Notification(i.title, i);
			}),
			i
		);
	})({});
	Object.defineProperty(window.__TAURI__, "notification", {
		value: __TAURI_PLUGIN_NOTIFICATION__,
	});
}
