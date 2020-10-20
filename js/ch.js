function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a
    }
    return Array.from(e)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function RazorPay() {
    var e = $(".li-card-details"),
        t = $(".netbanking"),
        a = $("#licioius-wallet"),
        o = $(".payment-container"),
        s = o.attr("data-email"),
        r = o.attr("data-mobile"),
        n = e.find('input[type="submit"]'),
        i = t.find('input[type="submit"]'),
        l = ($(".upload-money"), $(".lic-wallet-cash")),
        d = $(".lic-wallet-cash-plus"),
        c = $(".lic-wallet-container"),
        u = $(".upload-money-container"),
        p = {
            creditCardNumber: e.find("#li-card-number"),
            creditCardName: e.find("#li-card-name"),
            cardValidity: {
                creditExpMon: e.find("#li-card-mon"),
                creditExpYear: e.find("#li-card-year")
            },
            creditCardCvv: e.find("#li-card-cvv")
        },
        m = function () {
            u.addClass("hide"), c.removeClass("hide")
        },
        h = function (e, t, a) {
            var s = o.attr("data-url"),
                r = "post",
                n = {
                    phoneNo: t.contact.substring(3),
                    amount: e,
                    paymentId: a,
                    uti: t.notes.uti
                };
            return services.ajaxService(n, r, s)
        },
        f = function (e, t) {
            if (e > 1e4) return Materialize.toast("Maximum Limit to Load Money is Rs 10000", 3e3), loader.removeFullLoader(), !1;
            var a = "UTI-" + (new Date).getTime().toString(36);
            t.notes = {
                wallet_id: t.contact.substring(3),
                uti: a
            };
            var o = new Razorpay({
                amount: t.amount
            });
            o.createPayment(t), o.on("payment.success", function (a) {
                h(e, t, a.razorpay_payment_id).done(function () {
                    LiciousWallet.liProfileWalletBalance().done(function (e) {
                        v(e, t)
                    }).fail(function () {
                        g()
                    })
                }).fail(function () {
                    g()
                })
            }), o.on("payment.error", function (e) {
                Materialize.toast("Something Went wrong", 3e3), loader.removeFullLoader()
            })
        },
        v = function (e, t) {
            l.text(e.wallet.transactional_balance), d.text(e.wallet.promotional_balance), m(), Materialize.toast("Money added to wallet", 3e3), loader.removeFullLoader()
        },
        g = function () {
            Materialize.toast("Something Went wrong", 3e3), loader.removeFullLoader()
        },
        _ = function () {
            e.on("submit", function (e) {
                if (e.preventDefault(), e.stopPropagation(), n.prop("disabled", !0), loader.applyFullLoader(), !a.val()) return loader.removeFullLoader(), alert("please enter minimum 1 rupee"), n.prop("disabled", !1), !1;
                var t = a.val(),
                    o = {
                        amount: 100 * t,
                        currency: "INR",
                        email: s,
                        contact: r,
                        method: "card",
                        "card[name]": p.creditCardName.val(),
                        "card[number]": p.creditCardNumber.val(),
                        "card[cvv]": p.creditCardCvv.val(),
                        "card[expiry_month]": p.cardValidity.creditExpMon.val(),
                        "card[expiry_year]": p.cardValidity.creditExpYear.val()
                    };
                f(t, o), n.prop("disabled", !1)
            })
        },
        y = function () {
            t.on("submit", function (e) {
                if (e.preventDefault(), e.stopPropagation(), i.prop("disabled", !0), !a.val()) return loader.removeFullLoader(), alert("please enter minimum 1 rupee"), i.prop("disabled", !1), !1;
                loader.applyFullLoader();
                var t = a.val(),
                    o = {
                        amount: 100 * t,
                        currency: "INR",
                        email: s,
                        contact: r,
                        notes: {},
                        method: "netbanking",
                        bank: $("#netBankAvailableOptions").val()
                    };
                f(t, o), i.prop("disabled", !1)
            })
        };
    this.init = function () {
        _(), y()
    }
}

function Profile() {
    var e = $(".upload-money"),
        t = $(".lic-wallet-container"),
        a = $(".upload-money-container"),
        o = $(".payment-options").children(),
        s = ($(".payment-container").children(), $('input[name="walletAmount"]')),
        r = $(".payment-container"),
        n = (r.attr("data-mobile"), $(".lic-wallet-cash")),
        i = $(".lic-wallet-cash-plus"),
        l = $(".prof-lic-wallet"),
        d = $("#licioius-wallet"),
        c = {
            creditCardNumber: $("#li-card-number"),
            cvvNumber: $("#li-card-cvv"),
            monthValue: $("#li-card-mon"),
            yearValue: $("#li-card-year"),
            submitCard: $('.submit-card input[type="submit"]'),
            creditFormSubmit: $(".li-card-details")
        },
        u = function () {
            e.on("click", function (e) {
                e.stopPropagation(), resetWalletPaymentDetails.resetCreditCardForm(), resetWalletPaymentDetails.resestNetbankingForm(), t.addClass("hide"), a.removeClass("hide")
            })
        };
    $(".lic-card-cancel").on("click", function () {
        a.addClass("hide"), t.removeClass("hide")
    });
    var p = function () {
            o.on("click", function (e) {
                e.stopPropagation(), resetWalletPaymentDetails.resestNetbankingForm(), resetWalletPaymentDetails.resetCreditCardForm(), o.removeClass("selected-button"), $(this).addClass("selected-button"), resetWalletPaymentDetails.resestNetbankingForm(), resetWalletPaymentDetails.resetCreditCardForm(), $(this).hasClass("payment-option-1") ? ($(".li-card-details").removeClass("hide"), $(".netbanking").addClass("hide")) : ($(".li-card-details").addClass("hide"), $(".netbanking").removeClass("hide"))
            })
        },
        m = function () {
            c.creditCardNumber.blur(function (e) {
                e.stopPropagation(), e.preventDefault(), CCValdiation.validateCreditCardNumber($(this).val()) || ($(this).val(""), $(this).attr("placeholder", "enter a valid card number"))
            })
        },
        h = function () {
            c.cvvNumber.blur(function (e) {
                CCValdiation.validateCreditCardCvv($(this).val()) || ($(this).val(""), $(this).attr("placeholder", "enter valid cvv"))
            })
        },
        f = function () {
            c.monthValue.blur(function (e) {
                CCValdiation.validateCreditCardMon($(this).val()) || ($(this).val(""), $(this).attr("placeholder", "enter valid month"))
            })
        },
        v = function () {
            c.yearValue.blur(function (e) {
                CCValdiation.validateCreditCardYear($(this).val()) || ($(this).val(""), $(this).attr("placeholder", "enter valid year"))
            })
        },
        g = function () {
            s.change(function (e) {
                e.preventDefault(), d.val($(this).val())
            })
        },
        _ = function () {
            l.on("click", function () {
                loader.applyFullLoader(), y()
            })
        },
        y = function () {
            resetWalletPaymentDetails.clearLiContainer(), LiciousWallet.liProfileWalletBalance().done(function (e) {
                loader.removeFullLoader(), n.text(e.wallet.transactional_balance), i.text(e.wallet.promotional_balance)
            }).fail(function (e) {
                loader.removeFullLoader(), Materialize.toast("Something Went wrong", 3e3), fn_main.hideloader()
            })
        },
        b = function () {
            d.keyup(function () {
                resetWalletPaymentDetails.resetRadioButton()
            })
        };
    this.uploadMoney = function () {
        u()
    }, window.location.href.includes("#lic-wallet") && y(), this.bindPaymentOptions = function () {
        p(), g(), _(), b()
    }, this.creditCardValidations = function () {
        h(), m(), f(), v()
    }, this.init = function () {
        this.uploadMoney(), this.bindPaymentOptions(), this.creditCardValidations()
    }
}

function codEligible() {
    var e, t, a = $(".set-finalPay").data("val");
    fn.checkout_oos.ajaxForm({
        orderTotal: a
    }, "POST", "/user/check-cod-eligibility").done(function (a) {
        a = JSON.parse(a), t = a.card_on_delivery.status, e = a.cod.status, 1 == a.card_on_delivery.status && $(".CODTAB").addClass("cursor-text"), fn.codEligible = a.card_on_delivery.status, fn.codEligibleMsg = a.card_on_delivery.message
    })
}
var _createClass = function () {
        function e(e, t) {
            for (var a = 0; a < t.length; a++) {
                var o = t[a];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        return function (t, a, o) {
            return a && e(t.prototype, a), o && e(t, o), t
        }
    }(),
    _extends = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o])
        }
        return e
    },
    LiciousWallet = function () {
        var e = $(".payment-container").attr("data-mobile"),
            t = $(".prof-lic-wallet"),
            a = function () {
                var a = {
                        phone: e.substring(3)
                    },
                    o = "post",
                    s = t.attr("data-url");
                return services.ajaxService(a, o, s)
            };
        return {
            liProfileWalletBalance: a
        }
    }(),
    loader = function () {
        var e = $(".li-main-container"),
            t = function () {
                e.addClass("body-bg-loader2")
            },
            a = function () {
                e.removeClass("body-bg-loader2")
            };
        return {
            applyFullLoader: t,
            removeFullLoader: a
        }
    }();
$(document).ready(function () {
    razorPay = new RazorPay, razorPay.init()
});
var services = function () {
        var e = {
                "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
            },
            t = 2e4,
            a = function (a, o, s) {
                return $.ajax({
                    url: s,
                    type: o,
                    data: a,
                    timeout: t,
                    headers: e
                })
            };
        return {
            ajaxService: a
        }
    }(),
    SOURCE = "website",
    subProgramId = "",
    loyaltyPayableAmount = 0,
    total_shipments = 0,
    present_shipment = 0,
    ship_slotId = 0,
    slot_lock = [],
    slot_lock_dates = [],
    PAYMENTRAZORPAYOBJECT = {},
    li = void 0,
    date = void 0,
    ship_id = void 0,
    time = void 0,
    apply_coupon_title = "Have a coupon/referral code? Apply",
    is_cancel_button_pressed = !1,
    analyticsAttributes = {
        source: "post_order",
        state: "",
        substate: "",
        shipment_id: "",
        shipment_type: "",
        split: "",
        city: "",
        hub: "",
        user_type: "",
        item_count: "",
        item_list: "",
        category_list: "",
        amount: "",
        discount: ""
    },
    checkout_flow = function () {
        return null !== sessionStorage.getItem("checkout_flow") && "" !== sessionStorage.getItem("checkout_flow") ? sessionStorage.getItem("checkout_flow") : "old_checkout"
    },
    branchEventData = [],
    renderCheckoutLoyaltyItem = function (e) {
        document.querySelector(".co-ll-item-placeholder").innerHTML = '\n    <input id="program_id" type="number" value="' + e.program_id + '" hidden>\n    <input id="subprogram_id" type="number" value="' + e.subprogram_id + '" hidden>\n    <div class="co-ll-item">\n      <img src="/img/loyalty_licious_logo.svg" class="co-ll-item-licious-logo">\n      <div class="co-ll-item-separator"></div>\n      <div class="right-section">\n        <div class="co-ll-info">\n          <div class="co-ll-sub-program">' + e.subprogram_name + '</div>\n          <div class="co-ll-price">\n            ' + (e.discounted_price !== e.price ? '\n              <span class="co-ll-selling-price" value="' + e.discounted_price + '">&#8377 ' + e.discounted_price + '</span>\n              <span class="co-ll-marked-price" value="' + e.price + '">&#8377 ' + e.price + "</span>" : '<span class="co-ll-selling-price" value="' + e.discounted_price + '">&#8377 ' + e.price + "</span>") + '\n          </div>\n        </div>\n        <div class="right">\n          <div class="remove-co-ll-item"></div>\n        </div>\n      </div>\n    </div>\n  ', document.querySelector(".remove-co-ll-item").addEventListener("click", function () {
            var e = {
                    name: "",
                    city: "",
                    hub_id: "",
                    total_plans: "",
                    list: "",
                    member_status: "",
                    selected_plan: "",
                    recommended_plan: "",
                    user_type: "",
                    logged_in: "",
                    total_orders: "",
                    oldcart_value: "",
                    total_items: "",
                    olddelivery_charge: "",
                    saved_amount: "",
                    newcart_value: "",
                    newdelivery_charge: "",
                    Checkout_Flow: "old_checkout"
                },
                t = $(".co-ll-sub-program").html() + ", " + $(".co-ll-selling-price").attr("value").toString() + ", " + ($(".co-ll-marked-price").length ? $(".co-ll-marked-price").attr("value").toString() : "0");
            e.name = fn_ll.loyalty_plan_name, e.city = fn_ll.getCityFromLS(), e.hub_id = fn_ll.getHubFromLS(), e.total_plans = fn_ll.getterLS("loyalty_total_plans"), e.list = "slot", e.member_status = fn_ll.loyalty_banners_obj.member_status, e.selected_plan = t, e.recommended_plan = fn_ll.getterLS("loyalty_recommended"), e.user_type = fn_ll.getUserTypeFromLS(), e.logged_in = fn_ll.getLoginStatus(), e.total_orders = fn_ll.getTotalOrdersFromLS(), e.oldcart_value = fn_ll.loyalty_cart_value, e.total_items = fn_ll.getterLS("total_items"), e.olddelivery_charge = fn_ll.loyalty_delivery_charges, e.saved_amount = fn_ll.getterLS("saved_amount"), fn_home.ajaxForm({
                program_id: $("#program_id").val(),
                subprogram_id: $("#subprogram_id").val()
            }, "POST", "/loyalty/remove-loyalty").done(function (t) {
                t = JSON.parse(t), 200 === t.statusCode && (document.querySelector(".co-ll-item-placeholder").innerHTML = "", document.querySelector(".mc-ll-item-placeholder").innerHTML = "", fn_checkout.getShipments("remove").then(function () {
                    e.newcart_value = fn_ll.loyalty_cart_value, e.newdelivery_charge = fn_ll.loyalty_delivery_charges, fn_ll.sendAnalyticsData("removeplan_loyaltyslot", _extends({}, e, {
                        source: "loyalty"
                    })), localStorage.setItem("cartHasLoyalty", !1)
                }))
            }).fail(function () {
                console.log("res")
            }).always(function () {})
        })
    },
    renderCartLoyaltyItem = function (e) {
        document.querySelector(".mc-ll-item-placeholder").innerHTML = '\n    <input id="program_id" type="number" value="' + e.program_id + '" hidden>\n    <input id="subprogram_id" type="number" value="' + e.subprogram_id + '" hidden>\n    <div class="mc-ll-item">\n      <div class="mc-ll-item-top">\n        <img src="/img/loyalty_licious_logo.svg" class="mc-ll-item-licious-logo">\n        <div class="remove-mc-ll-item"></div>\n      </div>\n      <div class="mc-ll-item-bottom">\n        <div class="float-left">\n          <span class="mc-ll-sub-program">' + e.subprogram_name + "</span>\n          " + (e.discounted_price !== e.price ? '\n            <span class="mc-ll-selling-price" value="' + e.discounted_price + '">&#8377 ' + e.discounted_price + '</span>\n            <span class="mc-ll-marked-price" value="' + e.price + '">&#8377 ' + e.price + "</span>" : '<span class="mc-ll-selling-price" value="' + e.price + '">&#8377 ' + e.price + " </span>") + ' \n        </div>\n        <div class="float-right">\n          <span class="mc-ll-change-plan">CHANGE PLAN\n            <img src="/img/arrow.png" class="mc-ll-dropdown"></img>\n          </span> \n        </div>\n      </div>\n    </div>\n  ', document.querySelector(".mc-ll-change-plan").addEventListener("click", function () {
            $("#cart-ll").show(), document.querySelector("#loyalty-plans").className = "show";
            var e = new HandleLoyaltyPlans,
                t = new LoyaltyBanners;
            document.body.addEventListener("change", function (t) {
                e.handlePlanChange.call(e, t, !0)
            }), e.getLoyaltyPlans.call(e, !0), document.getElementById("loyalty-plans").className = "show", $(".buy_plan").attr("id", "modify-plan"), $(".buy_plan button").on("click", function (t) {
                if (document.getElementById("loyalty-plans").className = "hide", e.addLoyalty.call(e), "modify-plan" === $(".buy_plan").attr("id")) {
                    var a = e.getPlanDetailText.call(e, e.getCheckedPlan.call(e));
                    fn_ll.sendAnalyticsData("modifyplan_loyaltycart", _extends({}, fn_ll.loyalty_banners_obj, fn_ll.loyalty_cart_obj, {
                        source: "loyalty",
                        old_plan: localStorage.getItem("loyalty_cartflow"),
                        new_plan: a,
                        list: "cart"
                    })), localStorage.setItem("loyalty_cartflow", a)
                }
                $("#cart-ll").hide()
            }), document.body.addEventListener("change", function (t) {
                e.handlePlanChange.call(e, t, !0)
            }), $(".close-loyalty-icon").on("click", function (e) {
                document.getElementById("loyalty-plans").className = "hide", $("#cart-ll").hide()
            }), $("#cart-ll").on("click", function () {
                document.getElementById("loyalty-plans").className = "hide", $("#cart-ll").hide()
            }), t.getHomePageAPIData().done(function (e) {
                var a = JSON.parse(e);
                a.data.is_subscribed || t.renderPopupBenefits(a.data, "mc")
            }), delete fn_ll.loyalty_banners_obj.banner_url, delete fn_ll.loyalty_banners_obj.position, fn_ll.sendAnalyticsData("changeplan_loyaltycart", _extends({}, fn_ll.loyalty_banners_obj, fn_ll.loyalty_cart_obj, {
                source: "loyalty",
                selected_plan: localStorage.getItem("loyalty_cartflow"),
                list: "cart"
            }))
        }), document.querySelector(".remove-mc-ll-item").addEventListener("click", function () {
            fn_home.ajaxForm({
                program_id: $("#program_id").val(),
                subprogram_id: $("#subprogram_id").val()
            }, "POST", "/loyalty/remove-loyalty").done(function (e) {
                var t = JSON.parse(e);
                200 === t.statusCode && ! function () {
                    var e = {
                            name: "",
                            city: "",
                            hub_id: "",
                            total_plans: "",
                            list: "",
                            member_status: "",
                            selected_plan: "",
                            recommended_plan: "",
                            user_type: "",
                            logged_in: "",
                            total_orders: "",
                            oldcart_value: "",
                            total_items: "",
                            olddelivery_charge: "",
                            saved_amount: "",
                            newcart_value: "",
                            newdelivery_charge: "",
                            pr_totalorders: "",
                            pr_totalorders: ""
                        },
                        t = $(".mc-ll-sub-program").html() + ", " + $(".mc-ll-selling-price").attr("value").toString() + ", " + ($(".mc-ll-marked-price").length ? $(".mc-ll-marked-price").attr("value").toString() : "0");
                    e.name = fn_ll.loyalty_plan_name, e.city = fn_ll.getCityFromLS(), e.hub_id = fn_ll.getHubFromLS(), e.total_plans = fn_ll.getterLS("loyalty_total_plans"), e.list = "slot", e.member_status = fn_ll.loyalty_banners_obj.member_status, e.selected_plan = t, e.recommended_plan = fn_ll.getterLS("loyalty_recommended"), e.user_type = fn_ll.getUserTypeFromLS(), e.logged_in = fn_ll.getLoginStatus(), e.total_orders = fn_ll.getTotalOrdersFromLS(), e.oldcart_value = fn_ll.loyalty_cart_value, e.total_items = fn_ll.loyalty_total_items, e.olddelivery_charge = fn_ll.loyalty_delivery_charges, e.saved_amount = fn_ll.loyalty_saved_amount, e.pr_totalsavedvalue = fn_ll.loyalty_banners_obj.pr_totalsavedvalue, e.pr_totalorders = fn_ll.loyalty_banners_obj.pr_totalorders, document.querySelector(".mc-ll-item-placeholder").innerHTML = "", $(".mc-ll-top-banner-placeholder").hide(), $(".li-crossell-wrapper").css("box-shadow", "0 0 13px 0 rgba(0, 0, 0, 0.14)"), (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && fn_home.quickCheckout(), fn_cart.miniCart().then(function (t) {
                        e.newcart_value = fn_ll.loyalty_cart_value, e.newdelivery_charge = fn_ll.loyalty_delivery_charges, fn_ll.sendAnalyticsData("removeplan_loyaltycart", _extends({}, e, {
                            source: "loyalty"
                        })), localStorage.setItem("cartHasLoyalty", !1)
                    })
                }()
            }).fail(function () {
                console.log("res")
            }).always(function () {})
        })
    },
    sendAnalyticsData = function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
            a = {};
        switch (e) {
            case "order_status_help":
                a = _extends({}, analyticsAttributes, t);
                break;
            case "order_status_view_bill":
                a = _extends({}, analyticsAttributes, t);
                break;
            case "order_status_view_banner":
                a = _extends({}, analyticsAttributes, t);
                break;
            case "order_status_pay":
                a = _extends({}, analyticsAttributes, t)
        }
        clevertap.event.push(e, a), ga("send", {
            hitType: "event",
            eventCategory: "post_order",
            eventAction: e,
            eventLabel: JSON.stringify(a)
        })
    },
    changeStateForAnalytics = function (e, t) {
        5 != t ? (analyticsAttributes.state = e[t - 1].status_message, analyticsAttributes.substate = e[t - 1].message) : (analyticsAttributes.state = "Rejected", analyticsAttributes.substate = "Rejected")
    },
    mapAttributesForAnalytics = function (e, t) {
        var a = e.shipment_stages,
            o = e.state_id,
            s = e.order_id,
            r = e.shipment_items;
        changeStateForAnalytics(a, o), "order-shipments" === t && (analyticsAttributes.shipment_id = s, null !== e.express && "" !== e.express && (analyticsAttributes.shipment_type = "1" === e.express ? "Express" : "Scheduled"), analyticsAttributes.shipment_type = "1" == e.express ? "Express" : "Scheduled", "undefined" != typeof r && r.length > 0 && (analyticsAttributes.split = r[0].is_split, analyticsAttributes.item_count = r.length.toString(), analyticsAttributes.item_list = r.reduce(function (e, t) {
            return null !== t.product_name && "" !== t.product_name.trim() ? (e.push(t.product_name), e) : e
        }, []).join(), analyticsAttributes.category_list = r.reduce(function (e, t) {
            if (null != t.category_list && "" !== t.category_list.trim()) {
                var a = t.category_list.split(",");
                e.push(a)
            }
            return e
        }, []).join(), null !== e.amount && (null !== e.amount.total ? analyticsAttributes.amount = e.amount.total.toString() : "", null !== e.amount.split && "undefined" !== e.amount.split && e.amount.split.length > 0 && e.amount.split.map(function (e) {
            "Discount" === e.attribute && null !== e.value && (analyticsAttributes.discount = e.value.toString())
        })), null !== localStorage.getItem("user_type") && "" != localStorage.getItem("user_type") && (analyticsAttributes.user_type = localStorage.getItem("user_type"))), null !== localStorage.getItem("city") && null !== localStorage.getItem("hub") && (analyticsAttributes.city = localStorage.getItem("city"), analyticsAttributes.hub = localStorage.getItem("hub")))
    },
    parseJSON = function (e) {
        if (!e) return {};
        try {
            var t = JSON.parse(e);
            return t
        } catch (a) {
            return {}
        }
    },
    stringifyJSON = function (e) {
        if (!e) return "";
        try {
            var t = JSON.stringify(e);
            return t
        } catch (a) {
            return ""
        }
    },
    redirectToOrderStatusPage = function (e) {
        fn_main.showloader(), setTimeout(function () {
            fn_main.hideloader(), window.location.href = window.location.origin + "/order-status/" + e
        }, 3e3)
    },
    parsePushEEPurchaseEvent = function (e) {
        var t = e.product_names,
            a = e.product_ids,
            o = e.prices,
            s = e.pr_qty,
            r = e.currency,
            n = e.order_id,
            i = e.transactionId,
            l = e.cart_value,
            d = e.delivery_type,
            c = e.delivery_slots,
            u = e.address_id,
            p = e.coupon_used;
        e.charged;
        try {
            var m = function () {
                var e = [],
                    m = {};
                try {
                    m = JSON.parse(localStorage.getItem("allitem"))
                } catch (h) {
                    window.dataLayer && window.dataLayer.push({
                        event: "debug-charged",
                        "ga-category": "debug-charged-allitem-notpresent",
                        "ga-action": "Logging debug charged",
                        "ga-label": "allitem not present in cache, I will fail"
                    })
                }
                var f = m.category_id ? m.category_id.split(",").reduce(function (e, t) {
                    return "" !== t.trim() ? (e.push(t.trim()), e) : e
                }, []) : [];
                $.map(t, function (t, i) {
                    e.push({
                        order_id: n,
                        item_name: t,
                        item_id: a[i],
                        id: a[i],
                        name: t,
                        price: Number(o[i]) / Number(s[i]),
                        quantity: Number(s[i]),
                        currency: r,
                        index: i,
                        item_category: f[i]
                    })
                });
                var v = {
                    products: e,
                    actionField: {
                        id: i,
                        affiliation: "website",
                        value: Number(l),
                        revenue: Number(l),
                        action: "purchase",
                        ShipmentIDs: localStorage.getItem("shipmentCount"),
                        ShipmentTypes: d,
                        ShipmentTime: c,
                        AddressID: u,
                        currency: r,
                        coupon: p
                    }
                };
                return {
                    v: v
                }
            }();
            if ("object" == typeof m) return m.v
        } catch (h) {
            return {}
        }
    },
    paymentStatusApiCall = function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        return new Promise(function (a, o) {
            fn_main.showloader(), fn_home.ajaxForm(e, "POST", "/checkout/update-payment-status-v2").done(function (e) {
                fn_main.hideloader();
                var o = parseJSON(e);
                "success" !== o.statusMessage || "captured" !== o.data.payment_status && "created" !== o.data.payment_status || fn_home.addDeviceData(), a(_extends({}, o, {
                    orderDetailsRes: t
                }))
            }).fail(function (e) {
                a(e), fn_main.hideloader()
            })
        })
    },
    loyaltyPaymentStatusApiCall = function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        return fn_main.showloader(), new Promise(function (a, o) {
            fn_home.ajaxForm(e, "POST", "/loyalty/update-payment-status").done(function (e) {
                var o = parseJSON(e);
                a(_extends({}, o, {
                    orderDetailsRes: t
                }))
            }).fail(function (e) {
                a(e)
            }).always(function () {
                fn_main.hideloader()
            })
        })
    },
    triggerPaymentStatusApi = function (e, t, a, o) {
        var s = e.razorpay_payment_id,
            r = {
                order_id: a.order_id,
                payment: {
                    type: "razorpay",
                    id: s,
                    amount: parseInt(o, 10) / 100,
                    status: "",
                    failed_reason: ""
                },
                secondry_action: ""
            };
        return e.error ? (r.payment.status = "ERROR", r.payment.failed_reason = t.code, r.secondry_action = "CANCELLED") : (r.payment.status = "SUCCESS", r.payment.failed_reason = "", r.secondry_action = ""), void 0 !== a.loyalty_details ? loyaltyPaymentStatusApiCall(r) : paymentStatusApiCall(r)
    },
    pushEEPurchases = function (e) {
        try {
            window.dataLayer && window.dataLayer.push({
                event: "charged",
                ecommerce: {
                    purchase: {
                        actionField: e.actionField,
                        products: e.products
                    }
                }
            })
        } catch (t) {}
    },
    openRazorpayWithDetailsHelper = function (e, t, a, o) {
        var s = $(".payment-cta").find(".init-pay");
        t.orderDetails && t.orderDetails.shipment_order_ids ? PAYMENTRAZORPAYOBJECT.notes = {
            parent_order_id: t.order_id,
            shipment_order_ids: JSON.stringify(t.orderDetails.shipment_order_ids),
            receipt: t.receipt
        } : PAYMENTRAZORPAYOBJECT.notes = {
            parent_order_id: t.order_id,
            receipt: t.receipt
        }, s.addClass("disabled"), fn_checkout.razorPay.emit("payment.resume");
        var r = e.method;
        if ("upi" == r) {
            var n = 300;
            fn_checkout.payments.upiTimer(n, $(".upi-timer")), $(".upi-loader-container").addClass("show"), $(".li-checkout-container").hide()
        }
        fn_checkout.razorPay.on("payment.success", function (e) {
            if (s.removeClass("disabled"), void 0 === t.loyalty_details) {
                var r;
                ! function () {
                    var a = t.order_id,
                        s = t.address_id,
                        n = t.orderDetails || {},
                        i = n.cart_value,
                        l = n.discount_amount,
                        d = n.currency,
                        c = n.product_ids,
                        u = n.product_names,
                        p = n.prices,
                        m = n.delivery_type,
                        h = n.delivery_slots,
                        f = n.hub_id,
                        v = parseFloat(localStorage.getItem("wallet_used")),
                        g = localStorage.getItem("coupon_used"),
                        _ = (localStorage.getItem("method"), localStorage.getItem("pay_source")),
                        y = fn_ll.getterSS("customer_type"),
                        b = {
                            Source: "Purchase",
                            "Total Amount": Number(i),
                            "Coupon Name": g,
                            "Coupon Type": localStorage.getItem("coupon_type"),
                            "City Name": localStorage.getItem("city_name"),
                            "Hub ID": f,
                            Discount: l,
                            "Licious wallet Amount": v,
                            "Charged ID": a,
                            Currency: d,
                            "Payment Method": _,
                            "Product ID": c ? c.toString() : "",
                            "Product Name": u ? u.toString() : "",
                            "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                            Price: p ? p.toString() : "",
                            Quantity: localStorage.getItem("product_quantity"),
                            ShipmentIDs: localStorage.getItem("shipmentCount"),
                            ShipmentTypes: m,
                            ShipmentTime: h,
                            AddressID: s,
                            "Transaction ID": e.razorpay_payment_id,
                            Checkout_Flow: checkout_flow(),
                            user_type: y
                        };
                    fn_main.assignIncomingSource(b), fn_home.sendBranchChargedEvent(b, a);
                    ({
                        Charged: "Yes",
                        "Total Amount": Number(i),
                        City: localStorage.getItem("city_name"),
                        "Payment Method": _,
                        "Charged ID": a
                    });
                    ga("ecommerce:addTransaction", {
                        id: a,
                        revenue: Number(i)
                    }), r = localStorage.getItem("product_quantity"), r = r.split(","), $.map(u, function (e, t) {
                        ga("ecommerce:addItem", {
                            id: a,
                            name: e,
                            sku: c[t],
                            price: p[t],
                            quantity: r[t]
                        })
                    });
                    var k = "false" === localStorage.getItem("pay-later-scenario"),
                        C = !o || o && k;
                    C && (window.dataLayer && window.dataLayer.push({
                        event: "debug-charged",
                        "ga-category": "debug-charged",
                        "ga-action": "Logging debug charged",
                        "ga-label": t.orderDetails ? JSON.stringify(t.orderDetails) : "orderDetails not available"
                    }), pushEEPurchases(parsePushEEPurchaseEvent({
                        product_names: u,
                        product_ids: c,
                        prices: p,
                        pr_qty: r,
                        currency: d,
                        order_id: a,
                        transactionId: a,
                        cart_value: i,
                        delivery_type: m,
                        delivery_slots: h,
                        address_id: s,
                        coupon_used: g,
                        charged: b
                    }))), fn_cart.gaAddRemoveEvent("Charged", "Charged", JSON.stringify(b)), clevertap.event.push("Charged", b)
                }()
            }
            triggerPaymentStatusApi(e, e.error, t, a).then(function (e) {
                void 0 !== t.loyalty_details ? window.location.href = "/loyalty/success" : redirectToOrderStatusPage(t.order_id)
            })
        }), fn_checkout.razorPay.on("payment.error", function (e) {
            var n = {
                Msg: e.error.description,
                Status: "Error",
                hub_id: fn_ll.getterLS("hub_id"),
                Method: localStorage.getItem("method"),
                "City Name": localStorage.getItem("city_name"),
                "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                Source: ""
            };
            clevertap.event.push("Transaction Failed", n), s.removeClass("disabled"), "upi" == r && ($(".upi-loader-container").removeClass("show"), $(".li-checkout-container").show(), fn_checkout.payments.upiTimer(0, $(".upi-timer")));
            if (e && "Payment canceled" === e.error.description) {
                if (void 0 === t.loyalty_details) return void fn_checkout.payments.activityAfterRazorpaySuccessOrError("paymentFailed", {
                    razorpayResponse: e,
                    error: e.error,
                    orderApiResponse: t,
                    amount: a,
                    isreinitiate: o
                });
                var i = {
                    order_id: t.order_id,
                    payment: {
                        type: "razorpay",
                        id: "",
                        amount: a,
                        status: "FAILURE",
                        failed_reason: e && e.error ? e.error.description : ""
                    },
                    secondry_action: "CANCELLED"
                };
                loyaltyPaymentStatusApiCall(i).then(function () {
                    localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    }), $(".ll-pf-alert-close").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    })
                })["catch"](function () {
                    localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    }), $(".ll-pf-alert-close").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    })
                })
            } else if (e && "Payment failed" === e.error.description) {
                var i = {
                    order_id: t.order_id,
                    payment: {
                        type: "razorpay",
                        id: e.razorpay_payment_id,
                        amount: a,
                        status: "FAILURE",
                        failed_reason: e && e.error ? e.error.description : ""
                    },
                    secondry_action: ""
                };
                void 0 !== t.loyalty_details ? loyaltyPaymentStatusApiCall(i).then(function () {
                    localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    }), $(".ll-pf-alert-close").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    })
                })["catch"](function () {
                    localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    }), $(".ll-pf-alert-close").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    })
                }) : paymentStatusApiCall(i).then(function () {
                    redirectToOrderStatusPage(t.order_id)
                })["catch"](function () {
                    redirectToOrderStatusPage(t.order_id)
                })
            } else {
                var i = {
                    order_id: t.order_id,
                    payment: {
                        type: "razorpay",
                        id: e.razorpay_payment_id,
                        amount: a,
                        status: "FAILURE",
                        failed_reason: e && e.error ? e.error.description : ""
                    },
                    secondry_action: ""
                };
                void 0 !== t.loyalty_details ? loyaltyPaymentStatusApiCall(i).then(function () {
                    localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    }), $(".ll-pf-alert-close").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    })
                })["catch"](function () {
                    localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    }), $(".ll-pf-alert-close").click(function () {
                        $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                    })
                }) : paymentStatusApiCall(i).then(function () {
                    fn_checkout.payments.activityAfterRazorpaySuccessOrError("paymentFailed", {
                        razorpayResponse: e,
                        error: e.error,
                        orderApiResponse: t,
                        amount: a,
                        isreinitiate: o
                    })
                })["catch"](function () {
                    fn_checkout.payments.activityAfterRazorpaySuccessOrError("paymentFailed", {
                        razorpayResponse: e,
                        error: e.error,
                        orderApiResponse: t,
                        amount: a,
                        isreinitiate: o
                    })
                })
            }
        })
    },
    openPaypalWithDetails = function (e, t, a) {
        var o = e.payments,
            s = 0,
            r = o.findIndex(function (e) {
                return "paypal" === e.type
            });
        if (r !== -1 && (s = Number(o[r].amount_to_deduct_paise), localStorage.setItem("paypal_order", JSON.stringify(e)), localStorage.setItem("paypal_isreinitiate", JSON.stringify(a)), localStorage.setItem("paypal_amount", s), e.payments && e.payments.length > 0)) {
            var n = e.payments[0].approvalUrl;
            window.location.href = n
        }
    },
    openRazorpayWithDetails = function (e, t, a) {
        var o = e.payments,
            s = "",
            r = 0,
            n = o.findIndex(function (e) {
                return "razorpay" === e.type
            });
        if (n !== -1) {
            s = o[n].pg_order_id, r = Number(o[n].amount_to_deduct_paise);
            var i = (localStorage.getItem("hub_id"), localStorage.getItem("coupon_used"), parseJSON(localStorage.getItem("profile_complete"))),
                l = i.email,
                d = localStorage.getItem("user_contact"),
                c = ($(".li-addr-form-fields"), localStorage.getItem("saved_card"));
            switch (t) {
                case "upi":
                    var u = $("#user-vpa").val(),
                        p = {
                            amount: r,
                            email: l,
                            order_id: s,
                            method: "upi",
                            contact: d,
                            vpa: u
                        };
                    PAYMENTRAZORPAYOBJECT.amount = p.amount, PAYMENTRAZORPAYOBJECT.email = p.email, PAYMENTRAZORPAYOBJECT.order_id = p.order_id, PAYMENTRAZORPAYOBJECT.method = p.method, PAYMENTRAZORPAYOBJECT.contact = p.contact, PAYMENTRAZORPAYOBJECT.vpa = p.vpa, openRazorpayWithDetailsHelper(p, e, r, a);
                    break;
                case "saved-payments":
                case "card":
                    if (c || fn_checkout.payments.validateCard()) {
                        var m = fn_checkout.payments.card,
                            p = {
                                amount: r,
                                email: l,
                                order_id: s,
                                method: "card",
                                contact: d
                            };
                        if (PAYMENTRAZORPAYOBJECT.amount = p.amount, PAYMENTRAZORPAYOBJECT.email = p.email, PAYMENTRAZORPAYOBJECT.order_id = p.order_id, PAYMENTRAZORPAYOBJECT.method = p.method, PAYMENTRAZORPAYOBJECT.contact = p.contact, 1 == c) {
                            var m = fn_checkout.payments.card,
                                h = $(".pay-method.saved .cards").find("li.selected"),
                                f = h.find(".sc-cvv").val();
                            if ("" == f) return fn_checkout.alertBox("Provide CVV to continue", "", "alert"), void(flag = 0);
                            if (f.length < 3) return fn_checkout.alertBox("CVV of a Card must be 3 digits", "", "alert"), void(flag = 0);
                            Object.assign(p, {
                                token: m.token,
                                "card[cvv]": f,
                                customer_id: m.customer_id,
                                save: m.save || 0
                            }), PAYMENTRAZORPAYOBJECT["card[cvv]"] = p["card[cvv]"], PAYMENTRAZORPAYOBJECT.token = p.token, PAYMENTRAZORPAYOBJECT.customer_id = p.customer_id, PAYMENTRAZORPAYOBJECT.save = p.save, flag = 1
                        } else p = Object.assign(p, {
                            "card[name]": m.name,
                            "card[number]": m.num,
                            "card[cvv]": m.cvv,
                            "card[expiry_month]": m.exm,
                            "card[expiry_year]": m.exy,
                            save: m.save || 0,
                            customer_id: m.customer_id
                        }), PAYMENTRAZORPAYOBJECT["card[name]"] = p["card[name]"], PAYMENTRAZORPAYOBJECT["card[number]"] = p["card[number]"], PAYMENTRAZORPAYOBJECT["card[cvv]"] = p["card[cvv]"], PAYMENTRAZORPAYOBJECT["card[expiry_month]"] = p["card[expiry_month]"], PAYMENTRAZORPAYOBJECT["card[expiry_year]"] = p["card[expiry_year]"], PAYMENTRAZORPAYOBJECT.save = p.save, PAYMENTRAZORPAYOBJECT.customer_id = p.customer_id;
                        openRazorpayWithDetailsHelper(p, e, r, a)
                    }
                    break;
                case "netbanking":
                    var p = {
                        amount: r,
                        email: l,
                        order_id: s,
                        method: t,
                        contact: d
                    };
                    PAYMENTRAZORPAYOBJECT.amount = p.amount, PAYMENTRAZORPAYOBJECT.email = p.email, PAYMENTRAZORPAYOBJECT.order_id = p.order_id,
                        PAYMENTRAZORPAYOBJECT.method = p.method, PAYMENTRAZORPAYOBJECT.contact = p.contact;
                    var v = localStorage.getItem("pay_mode");
                    v && (p = Object.assign(p, {
                        bank: v
                    }), PAYMENTRAZORPAYOBJECT.bank = p.bank, openRazorpayWithDetailsHelper(p, e, r, a));
                    break;
                case "wallet":
                    var p = {
                        amount: r,
                        email: l,
                        order_id: s,
                        method: t,
                        contact: d
                    };
                    PAYMENTRAZORPAYOBJECT.amount = p.amount, PAYMENTRAZORPAYOBJECT.email = p.email, PAYMENTRAZORPAYOBJECT.order_id = p.order_id, PAYMENTRAZORPAYOBJECT.method = p.method, PAYMENTRAZORPAYOBJECT.contact = p.contact;
                    var g = localStorage.getItem("pay_mode");
                    g && (p = Object.assign(p, {
                        wallet: g
                    }), PAYMENTRAZORPAYOBJECT.wallet = p.wallet, openRazorpayWithDetailsHelper(p, e, r, a))
            }
        }
    },
    processCreateOrderResponse = function (e, t, a) {
        var o = e.statusCode,
            s = e.status,
            r = e.order_id;
        e.statusMessage;
        if (!(void 0 !== e.loyalty_details && null !== e.loyalty_details || 201 !== o && 206 !== o) && null !== localStorage.getItem("cartHasLoyalty") && "true" == localStorage.getItem("cartHasLoyalty")) {
            var n = Number(localStorage.getItem("loyalty_price")) - Number(localStorage.getItem("loyalty_discounted_price")) <= 0 ? "0" : "" + localStorage.getItem("loyalty_price"),
                i = localStorage.getItem("loyalty_subprogram_name") + ", " + n + ", " + localStorage.getItem("loyalty_discounted_price"),
                l = {
                    name: fn_ll.loyalty_plan_name,
                    city: fn_ll.getCityFromLS(),
                    hub_id: fn_ll.getHubFromLS(),
                    member_status: "initiated",
                    selected_plan: i,
                    user_type: fn_ll.getUserTypeFromLS(),
                    total_orders: fn_ll.getTotalOrdersFromLS(),
                    start_date: "",
                    end_date: "",
                    plan_price: localStorage.getItem("loyalty_discounted_price").toString(),
                    plan_name: localStorage.getItem("loyalty_subprogram_name")
                };
            fn_ll.sendAnalyticsData("member_activatedcart", _extends({}, l, {
                source: "loyalty"
            })), localStorage.setItem("cartHasLoyalty", "false")
        }
        switch (o) {
            case 201:
                var d, c = function () {
                    var o = e.order_id,
                        s = e.address_id,
                        r = "false" === localStorage.getItem("pay-later-scenario"),
                        n = ("cod" === t || "pod" === t || "l_wallet" === t || "paytm" === t) && !a || r && a || !(("l_wallet" === t || "paytm" === t) && !r && a);
                    n && ! function () {
                        var t = e.orderDetails || {},
                            a = t.cart_value,
                            r = t.discount_amount,
                            n = t.currency,
                            i = t.product_ids,
                            l = t.product_names,
                            c = t.prices,
                            u = t.delivery_type,
                            p = t.delivery_slots,
                            m = t.hub_id,
                            h = (t.shipment_order_ids, parseFloat(localStorage.getItem("wallet_used"))),
                            f = localStorage.getItem("coupon_used"),
                            v = (localStorage.getItem("method"), localStorage.getItem("pay_source")),
                            g = fn_ll.getterSS("customer_type"),
                            _ = {
                                Source: "Purchase",
                                "Total Amount": Number(a),
                                "Coupon Name": f,
                                "Coupon Type": localStorage.getItem("coupon_type"),
                                "City Name": localStorage.getItem("city_name"),
                                "Hub ID": m,
                                Discount: r,
                                "Licious wallet Amount": h,
                                "Charged ID": o,
                                Currency: n,
                                "Payment Method": v,
                                "Product ID": i ? i.toString() : "",
                                "Product Name": l ? l.toString() : "",
                                "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                                Price: c ? c.toString() : "",
                                Quantity: localStorage.getItem("product_quantity"),
                                ShipmentIDs: localStorage.getItem("shipmentCount"),
                                ShipmentTypes: u,
                                ShipmentTime: p,
                                AddressID: s,
                                "Transaction ID": "",
                                Checkout_Flow: checkout_flow(),
                                user_type: g
                            };
                        fn_main.assignIncomingSource(_), fn_home.sendBranchChargedEvent(_, o), ga("ecommerce:addTransaction", {
                            id: o,
                            revenue: Number(a)
                        }), d = localStorage.getItem("product_quantity"), d = d.split(","), $.map(l, function (e, t) {
                            ga("ecommerce:addItem", {
                                id: o,
                                name: e,
                                sku: i[t],
                                price: c[t],
                                quantity: d[t]
                            })
                        }), window.dataLayer && window.dataLayer.push({
                            event: "debug-charged",
                            "ga-category": "debug-charged",
                            "ga-action": "Logging debug charged",
                            "ga-label": e.orderDetails ? JSON.stringify(e.orderDetails) : "orderDetails not available"
                        }), pushEEPurchases(parsePushEEPurchaseEvent({
                            product_names: l,
                            product_ids: i,
                            prices: c,
                            pr_qty: d,
                            currency: n,
                            order_id: o,
                            transactionId: o,
                            cart_value: a,
                            delivery_type: u,
                            delivery_slots: p,
                            address_id: s,
                            coupon_used: f,
                            charged: _
                        })), fn_cart.gaAddRemoveEvent("Charged", "Charged", JSON.stringify(_)), clevertap.event.push("Charged", _)
                    }();
                    var i = location.href.search("/order-status/") !== -1;
                    return void 0 !== e.loyalty_details ? (window.location.href = "/loyalty/success", {
                        v: void 0
                    }) : i ? (window.location.reload(), {
                        v: void 0
                    }) : void redirectToOrderStatusPage(o)
                }();
                if ("object" == typeof c) return c.v;
                break;
            case 206:
                switch (s) {
                    case "CREATED_WAITING_FOR_CLIENT_ACTION":
                        switch (t) {
                            case "paypal":
                                fn_main.showloader(), openPaypalWithDetails(e, t, a);
                                break;
                            case "upi":
                                openRazorpayWithDetails(e, t, a);
                                break;
                            case "saved_payments":
                            case "card":
                                openRazorpayWithDetails(e, t, a);
                                break;
                            case "netbanking":
                                openRazorpayWithDetails(e, t, a);
                                break;
                            case "wallet":
                                openRazorpayWithDetails(e, t, a);
                                break;
                            default:
                                return
                        }
                        break;
                    case "CREATED_WITH_FAILURE":
                        var u = location.href.search("/order-status/") !== -1;
                        if (u) return void window.location.reload();
                        redirectToOrderStatusPage(r);
                        break;
                    case "CREATED_WITH_UNKNOWN":
                        if (a) return void window.location.reload();
                        redirectToOrderStatusPage(r);
                    default:
                        return
                }
                break;
            case 400:
                return void(void 0 !== e.loyalty_details && (localStorage.setItem("loyaltyPaymentState", "retrypurchase_loyalty"), $(".ll-payment-failure-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".ll-pf-retry-button").click(function () {
                    $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                }), $(".ll-pf-alert-close").click(function () {
                    $(".ll-payment-failure-popup").removeClass("show"), $(".loc-screen").removeClass("show"), window.location.href = "/loyalty/payment/" + subProgramId
                })));
            default:
                return
        }
    };
fn_checkout = {
    isCODEnabled: !1,
    isPODEnabled: !1,
    addrFlag: !1,
    timer: "",
    mobile_regex: /^[6789]\d{9}$/,
    email_regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    selectAddress: function () {
        $(".li-saved-address li").on("click", function () {
            $(".li-saved-address").find("li").removeClass("selected"), $(this).addClass("selected")
        })
    },
    editAddress: function () {
        $(".li-saved-address li .edit-addr").on("click", function () {
            $(".li-saved-address").find("li").removeClass("selected"), $(this).addClass("selected")
        })
    },
    clevertapAddress: function (e, t, a) {
        clevertap.event.push(t, {
            Source: "Checkout_address",
            "Saved address": a
        }), fn_cart.gaAddRemoveEvent(e, "Checkout_address", a)
    },
    addAddress: function () {
        $(".li-add-address").on("click", function () {
            fn_checkout.showAddrPartfirst(), clevertap.event.push("Add Address", {
                Source: "Checkout_address"
            }), fn_cart.gaAddRemoveEvent("Checkout_Addaddress", "Checkout_address"), fn_checkout.showAddrForm()
        }), fn_checkout.resetAddAddr()
    },
    showAddrPartfirst: function () {
        $(".li-form-holder").show(), $(".li-confirm-address").hide(), $(".map-marker-holder").css("width", "50%"), $(".move-marker-msg").removeClass("show"), $(".addr-merge-info").removeClass("show")
    },
    showAddrPartsecond: function () {
        $(".li-form-holder").hide(), $(".li-confirm-address").show(), $(".map-marker-holder").css("width", "100%"), $(".move-marker-msg").addClass("show"), $(".addr-merge-info").addClass("show")
    },
    showAddrForm: function (e) {
        switch (e) {
            case "new":
                $(".addr-form-back").hide();
                break;
            default:
                $(".addr-form-back").show()
        }
        fn_checkout.checkProfile(), $(".li-addr-loader").addClass("show"), $(".li-checkout-page.address").find(".li-page-body").addClass("strict"), $(".li-addr-form-fields").find('[data-type="addr-flat"]').focus()
    },
    showAddrLoaders: function () {
        var e = $(".li-address-container");
        e.find("li").hide(), e.find(".addr_loader").show(), $(".addr-count").html("-------------")
    },
    hideAddrLoaders: function () {
        var e = $(".li-address-container");
        e.find(".addr_loader").hide()
    },
    resetAddAddr: function () {
        $(".addr-form-back").on("click", function () {
            $(".li-addr-loader").removeClass("show"), $(".li-checkout-page.address").find(".li-page-body").removeClass("strict"), $(".li-checkout-page.address").removeClass("activez").addClass("active"), fn_checkout.resetForm()
        })
    },
    showSlots: function () {
        $(".slots-selector").on("click", function () {
            var e = $(this).parent().find(".slots-layout");
            e.hasClass("fade-in") ? e.removeClass("fade-in") : e.addClass("fade-in"), $(this).toggleClass("up"), $(this).parent().find(".slots-screen").fadeIn(), $(".slots-screen-bg").fadeIn(), $(".pointer").addClass("fade");
            var t = $(this).attr("ship-id"),
                a = $(this).attr("lock_slot_id");
            $(".dates").removeClass("active"), $(".slot-day-time").removeClass("active"), $(".slot-day-time").hide(), "false" === $(this).parent().attr("data-slotselected") ? $(".slots_" + t).find(".select-proceed").addClass("disabled") : $(".slots_" + t).find(".select-proceed").removeClass("disabled");
            var o = void 0;
            o = "undefined" !== a && void 0 !== a && null !== a && "" !== a ? a : t + "1", $("#slot-day-time_" + o).show(), $("#dates_" + o).addClass("active"), $("li button").removeClass("selected");
            var s = $("#slot-day-time_" + o).find('[data-time="' + slot_lock_dates[Number(t - 1)] + '"]');
            s.children("button").addClass("selected"), li = s, date = s.data("date"), ship_id = s.data("ship_id"), time = s.data("time")
        })
    },
    hideSlots: function () {
        $(".slots-screen, .slots-screen-bg, .slots-dropdown .cancel , .slots-dropdown .cancel-slot").on("click", function (e) {
            var t = {
                Source: "Checkout_Slot",
                Checkout_Flow: checkout_flow()
            };
            fn_main.assignIncomingSource(t), clevertap.event.push("Closed Slot Selection", t), fn_cart.gaAddRemoveEvent("Checkout_Slot_Closed", "Checkout_Slot"), $(".slots-dropdown").find(".slots-layout").removeClass("fade-in"), $(".slots-dropdown").find(".slots-selector").removeClass("up"), $(".slots-screen-bg, .slots-screen").fadeOut(), $(".pointer").removeClass("fade")
        })
    },
    checkProfile: function () {
        var e = JSON.parse(localStorage.getItem("profile_complete")),
            t = $(".li-addr-form-fields");
        null == e ? (t.find('[data-type="email"]').attr("data-flag", "false").parent().show(), t.find('[data-type="name"]').attr("data-flag", "false").parent().show()) : "true" == e.status ? (t.find('[data-type="email"]').attr("data-flag", "true").val("").parent().hide(), t.find('[data-type="name"]').attr("data-flag", "true").val("").parent().hide()) : (t.find('[data-type="email"]').attr("data-flag", "false").parent().show(), t.find('[data-type="name"]').attr("data-flag", "false").parent().show())
    },
    setProfile: function (e, t) {
        "" != e && "" != t && null != e && null != t && fn.checkout_oos.ajaxForm({
            name: e,
            email: t
        }, "POST", "/checkout/store-user-data");
        var a = JSON.parse(localStorage.getItem("profile_complete"));
        if (null == a) {
            var o = {
                status: !0,
                name: e,
                email: t
            };
            localStorage.setItem("profile_complete", JSON.stringify(o))
        } else a.status = "true", localStorage.setItem("profile_complete", JSON.stringify(a))
    },
    showAlert: function (e) {
        clearTimeout(fn_checkout.timer), $(".addr-error").html(e).addClass("show"), fn_checkout.timer = setTimeout(function () {
            $(".addr-error").html("").removeClass("show")
        }, 3e3)
    },
    validateMobile: function () {
        var e = $(".addr-mobile");
        e.on("blur", function () {
            "" == e.val() ? (fn_checkout.showAlert("Mobile number required"), e.focus(), e[0].dataset.flag = !1) : fn_checkout.mobile_regex.test(e.val()) ? (e[0].dataset.flag = !0, fn_checkout.checkFlag()) : (fn_checkout.showAlert("Invalid Mobile number"), e.focus(), e[0].dataset.flag = !1)
        }), e.on("keyup", function () {
            e.val().length < 1 ? (e[0].dataset.flag = !1, fn_checkout.checkFlag()) : fn_checkout.mobile_regex.test(e.val()) ? (e[0].dataset.flag = !0, fn_checkout.checkFlag()) : (e[0].dataset.flag = !1, fn_checkout.checkFlag())
        })
    },
    validateEmail: function () {
        var e = $(".addr-email");
        e.on("blur", function () {
            "" == e.val() ? (fn_checkout.showAlert("Email required"), e.focus(), e[0].dataset.flag = !1) : fn_checkout.email_regex.test(e.val()) ? (e[0].dataset.flag = !0, fn_checkout.checkFlag()) : (fn_checkout.showAlert("Invalid Email"), e.focus(), e[0].dataset.flag = !1)
        }), e.on("keyup", function () {
            e.val().length < 1 ? (e[0].dataset.flag = !1, fn_checkout.checkFlag()) : fn_checkout.email_regex.test(e.val()) ? (e[0].dataset.flag = !0, fn_checkout.checkFlag()) : (e[0].dataset.flag = !1, fn_checkout.checkFlag())
        })
    },
    validateFlat: function () {
        var e = $(".addr-flat");
        e.on("blur", function () {
            "" == e.val() ? (fn_checkout.showAlert("Flat no / Building name is required"), e.focus(), e[0].dataset.flag = !1) : (e[0].dataset.flag = !0, fn_checkout.checkFlag())
        }), e.on("keyup", function () {
            e.val().length < 1 ? (e[0].dataset.flag = !1, fn_checkout.checkFlag()) : (e[0].dataset.flag = !0, fn_checkout.checkFlag())
        })
    },
    validateName: function () {
        var e = $(".addr-name");
        e.on("blur", function () {
            "" == e.val() ? (fn_checkout.showAlert("Name required"), e[0].focus(), e[0].dataset.flag = !1) : (e[0].dataset.flag = !0, fn_checkout.checkFlag())
        }), e.on("keyup", function () {
            e.val().length < 1 ? (e[0].dataset.flag = !1, fn_checkout.checkFlag()) : (e[0].dataset.flag = !0, fn_checkout.checkFlag())
        })
    },
    validateLoc: function () {
        var e = $(".addr-location");
        e.on("keyup", function () {
            e.val().length < 1 ? (e[0].dataset.flag = !1, fn_checkout.checkFlag()) : fn_checkout.checkFlag()
        })
    },
    checkFlag: function () {
        var e = $(".li-addr-form-fields"),
            t = e.find('[data-opt="required"]');
        $.each(t, function (e, t) {
            return "false" == t.dataset.flag ? ($(".addr-save-btn").addClass("disabled"), !1) : ($(".addr-save-btn").removeClass("disabled"), void fn_checkout.mergeAddress())
        })
    },
    setFlag: function (e) {
        var t = $(".li-addr-form-fields"),
            a = t.find('[data-opt="required"]');
        $.each(a, function (t, o) {
            a.attr("data-flag", e)
        }), a.eq(0).attr("data-flag", "true")
    },
    getAddr: function () {
        fn_checkout.showAddrLoaders(), $(".li-page-body").find(".complete-address").addClass("disabled");
        var e = window.location.href.split("#")[1] || "",
            t = e.split("?")[1];
        if (e = e.split("?")[0], "paypal-order-success" === e) fn_main.showloader(), fn_paypal.updatePaymentStatus("SUCCESS");
        else if ("paypal-link-view-success" === e) fn_main.showloader(), fn_paypal.updatePaymentStatus("SUCCESS");
        else if ("paypal-order-fail" == e) fn_main.showloader(), fn_paypal.updatePaymentStatus("FAIL");
        else if ("quick-checkout" === e) {
            sessionStorage.setItem("checkout_flow", "quick_checkout"), document.referrer.includes("past-orders") ? sessionStorage.setItem("incoming_source", "past_order") : document.referrer.includes("favourite-items") && sessionStorage.setItem("incoming_source", "favorite_items");
            var a = fn_ll.getterLS("count");
            if (Number(a) > 0 ? ($(".new-cart-count").addClass("loaded"), $(".new-cart-count").find("i").html(a)) : $(".new-cart-count").removeClass("loaded"), "delivery-summary" === t) {
                fn_home.validateReferralMsg() && $(".checkout-referral-msg").show(), fn_checkout.setPageActive("addr");
                var o = {
                    title: "Choose Address <span quickload='true' class = 'change-addr'>Change</span>",
                    subtitle: localStorage.getItem("address")
                };
                fn_checkout.setNavMessages(o, "addr"), fn_checkout.setNavActive("addr"), fn_checkout.quickCheckoutResetAddr(), fn_checkout.getShipments("proceed-shipment")
            } else if ("payments" === t) {
                var s = {
                    title: "Choose Address <span quickload='true' class = 'change-addr'>Change</span>",
                    subtitle: localStorage.getItem("address")
                };
                fn_checkout.setNavMessages(s, "addr"), fn_checkout.setNavActive("addr"), fn_checkout.quickCheckoutResetAddr(), fn_checkout.quickCheckoutPayment()
            } else fn_checkout.setpage("order-summary"), fn_checkout.loadAddress()
        } else fn_checkout.setpage("order-summary");
        "quick-checkout" !== e && fn_checkout.loadAddress()
    },
    quickCheckoutPayment: function () {
        $(".co-ll-item").hide(), localStorage.setItem("pay-later-scenario", !1), fn_checkout.pushEEProgressCheckout(), $(".checkout-referral-msg").hide(), $(".checkout-referral-msg").hide(), $(".checkout-referral-msg").hide(), $(".checkout-referral-msg").hide(), $(".checkout-referral-msg").hide(), fn_checkout.setPageActive("shipment"), fn_checkout.setNavActive("shipment");
        var e = localStorage.getItem("shipment_message");
        localStorage.removeItem("shipment_message");
        var t = {
            title: "Delivery Summary <span quickload='true' class = 'edit-shipment'>Edit</span>",
            subtitle: e
        };
        fn_checkout.setNavMessages(t, "shipment"), $(".licious-wallet").find(".lic-btn").removeClass("checked"), $(".li-bill-details").show(), fn_checkout.renderBillDetails(JSON.parse(localStorage.getItem("bill_details"))), localStorage.removeItem("bill_details"), fn_checkout.quickCheckoutResetShipment(), fn_checkout.payments.fetchPayments("payment")
    },
    quickCheckoutResetShipment: function () {
        $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").on("click", function () {
            if ("true" === $(this).attr("quickload")) {
                var e = localStorage.getItem("coupon_used");
                "" == e || null == e ? fn_checkout.quickCheckoutLoadShipment() : fn_checkout.alertBox("Applied coupon will be removed, Wish to continue?", "", "confirm-shipment")
            }
        })
    },
    quickCheckoutLoadShipment: function () {
        $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").attr("quickload", ""), $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").unbind("click"), $(".co-ll-item").show(), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show(), $(".free-delivery-mssg").hide(), $(".li-checkout-nav-steps ul").removeClass("ul-wth-msg"), clevertap.event.push("Edit Slots", {
            ShipmentId_NewSlot: localStorage.getItem("shipmentid"),
            Source: "Purchase"
        }), fn_cart.gaAddRemoveEvent("Purchase_EditSlot", "Purchase"), fn_checkout.setNavActive("redo-shipment"), fn_checkout.setPageActive("redo-shipment"), $(".li-bill-details").hide(), $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").hide();
        var e = {
            title: "Payment methods",
            subtitle: ""
        };
        fn_checkout.setNavMessages(e, "cards"), fn_checkout.getShipments()
    },
    quickCheckoutResetAddr: function () {
        $(".li-checkout-nav-steps").find(".li-nav-title .change-addr").on("click", function () {
            if ("true" === $(this).attr("quickload")) {
                var e = localStorage.getItem("coupon_used");
                "" == e || null == e ? fn_checkout.quickCheckoutAddressLoad() : fn_checkout.alertBox("Applied coupon will be removed, Wish to continue?", "", "confirm-addr")
            }
        })
    },
    quickCheckoutAddressLoad: function () {
        $(".li-checkout-nav-steps").find(".li-nav-title .change-addr").unbind("click"), $("free-delivery-mssg").hide(), $(".li-checkout-nav-steps").find(".li-nav-title .change-addr").attr("quickload", ""), fn_checkout.setpage("order-summary"), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show(), fn_checkout.setNavActive("redo-addr"), fn_checkout.setPageActive("redo-addr"), $(".li-bill-details").hide(), $(this).hide(), $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").hide();
        var e = {
            title: "Payment methods",
            subtitle: ""
        };
        fn_checkout.setNavMessages(e, "cards"), fn_checkout.loadAddress()
    },
    loadAddress: function () {
        var e = $(".li-page-container").find(".li-address-container"),
            t = "";
        fn_home.ajaxForm({}, "POST", "/checkout/get-all-address").done(function (a) {
            var o = JSON.parse(a);
            if (200 === o.statusCode) {
                localStorage.setItem("address-count", o.data.address.length), $(".li-checkout-nav-steps .address").addClass("active");
                var s = o.data.address;
                $.map(s, function (e, a) {
                    var o = null == e.landmark ? "" : "<br>" + e.landmark,
                        s = e.line2 + " " + e.line1 + " " + o + " " + e.city + " " + e.contact;
                    t += '<li data-prid="' + e.address_id + '" data-lat="' + e.lat + '" data-hub-id="' + e.hub_id + '" data-city="' + e.city + '" data-lng="' + e.lng + '" data-addrstr="' + s + '" class="address-block"><div class="li-addr-sel"><p class="li-addr-title">' + e.line2 + '</p><p class = "li-addr-body">' + e.line2 + "<br>" + e.line1 + o + "<br>" + e.city + " " + e.pincode + "<br>Mobile Number:" + e.contact + '</p></div><div class="li-addr-cta"><button class="edit-addr" data-addrid="' + e.address_id + '">Edit</button><button class="delete-addr" data-addrid="' + e.address_id + '">Delete</button></div></li>'
                }), e.html(t), o.data.defaultaddress.length > 0 ? $.map(o.data.defaultaddress, function (t) {
                    e.find('[data-prid="' + t + '"]').addClass("selected");
                    var a = e.find('[data-prid="' + t + '"]').data("addrstr"),
                        o = e.find('[data-prid="' + t + '"]').data("lat"),
                        s = e.find('[data-prid="' + t + '"]').data("lng"),
                        r = e.find('[data-prid="' + t + '"]').data("hub-id"),
                        n = a.split("<br>")[0],
                        i = e.find('[data-prid="' + t + '"]').data("city");
                    localStorage.setItem("default_addr_id", t), localStorage.setItem("default_addr_lat", o), localStorage.setItem("default_addr_lng", s), localStorage.setItem("hub_id", r), localStorage.setItem("address", n), localStorage.setItem("city_name", i), $(".sub-header").find(".location-name").html(n), $(".city-location .city").html(localStorage.getItem("city_name")), $(".li-checkout-page-title").find(".selected-item.address").html(a), $(".li-page-body").find(".complete-address").removeClass("disabled")
                }) : ($(".li-page-body").find(".complete-address").addClass("disabled"), localStorage.setItem("default_addr_id", "")), fn_checkout.hideAddrLoaders(), fn_checkout.setAddrCount(s.length), fn_checkout.updateAddr(), $(".li-checkout-page.address").removeClass("activez").addClass("active"), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show()
            } else 203 === o.statusCode && (fn_checkout.showAddrForm("new"), fn_checkout.setAddrCount(0))
        }).fail(function (e) {
            Materialize.toast("Something went wrong, please try reloading the page")
        }), fn_checkout.completeAddress()
    },
    getAddrCount: function (e, t, a) {
        var o = $(".li-address-container"),
            s = o.find("li").length;
        "delete" == a && (s -= 1), "Save" == a && (s += 1), fn_checkout.clevertapAddress(e, t, s), "Checkout_choose Address" !== e && fn_checkout.setAddrCount(s)
    },
    setAddrCount: function (e) {
        if (0 === e) {
            fn_checkout.showAddrForm("new");
            var t = {
                title: "Add Address",
                subtitle: "You don't seem to have any address saved"
            };
            fn_checkout.setNavMessages(t, "addr")
        } else {
            $(".addr-count").html(e + " Saved Addresses");
            var t = {
                title: "Choose Address ",
                subtitle: "You have " + e + " saved address"
            };
            fn_checkout.setNavMessages(t, "addr")
        }
    },
    setNavMessages: function (e, t) {
        var a = $(".li-checkout-nav-steps");
        switch (t) {
            case "addr":
                a.find("li.address .li-nav-title").html(e.title), a.find("li.address .li-nav-subtitle").html(e.subtitle), a.find("li.shipment .li-nav-subtitle").html(""), $(".li-checkout-page-title").find(".selected-item.shipment").html("");
                break;
            case "shipment":
                a.find("li.shipment .li-nav-title").html(e.title), a.find("li.shipment .li-nav-subtitle").html(e.subtitle), $(".li-checkout-page-title").find(".selected-item.shipment").html(e.subtitle);
                break;
            case "cards":
                a.find("li.payment .li-nav-title").html(e.title), a.find("li.payment .li-nav-subtitle").html(e.subtitle)
        }
    },
    setNavActive: function (e) {
        var t = $(".li-checkout-nav-steps");
        switch (e) {
            case "addr":
                t.find(".address").removeClass("active").addClass("complete"), t.find(".shipment").addClass("active");
                break;
            case "redo-addr":
                t.find("li").removeClass("active complete"), t.find(".address").addClass("active"), t.parent().find(".li-bill-details").hide(), fn_checkout.removeCLD();
                break;
            case "redo-shipment":
                t.find("li").removeClass("active complete"), t.find(".address").addClass("complete"), t.find(".shipment").addClass("active"), t.parent().find(".li-bill-details").hide(), fn_checkout.removeCLD();
                break;
            case "shipment":
                t.find(".shipment").removeClass("active").addClass("complete"), t.find(".payment").addClass("active")
        }
    },
    removeCLD: function () {
        $(".cld-placeholder").html(""), $(".slot-payment-flow").removeClass("cld"), $(".li-checkout-nav-steps ul li").removeClass("cld"), $(".li-checkout-page.payment .pointer").removeClass("cld")
    },
    setPageActive: function (e) {
        var t = $(".li-checkout-pages");
        switch (e) {
            case "addr":
                t.find(".li-checkout-page.active").addClass("collapse"), setTimeout(function () {
                    t.find(".li-checkout-page").removeClass("active complete collapse expand"), t.find(".address").addClass("complete"), t.find(".shipments").addClass("active"), $(".addr-slot-flow").css("border-color", "#427605"), $(".addr-slot-flow").css("border-style", "solid"), $(".slot-payment-flow").css("border-color", "#cbcbcb"), $(".slot-payment-flow").css("border-style", "dashed"), fn_checkout.setpage("delivery-summary"), window.scrollTo(0, 0)
                }, 400);
                break;
            case "redo-addr":
                t.find(".li-checkout-page.active").addClass("collapse"), setTimeout(function () {
                    t.find(".li-checkout-page").removeClass("active complete collapse expand"), t.find(".address").addClass("active"), $(".addr-slot-flow").css("border-color", "#cbcbcb"), $(".addr-slot-flow").css("border-style", "dashed"), $(".slot-payment-flow").css("border-color", "#cbcbcb"), $(".slot-payment-flow").css("border-style", "dashed"), fn_checkout.setpage("order-summary"), window.scrollTo(0, 0)
                }, 400);
                break;
            case "redo-shipment":
                t.find(".li-checkout-page.active").addClass("collapse"), setTimeout(function () {
                    t.find(".li-checkout-page").removeClass("active complete collapse expand"), t.find(".address").addClass("complete"), t.find(".shipments").addClass("active"), $(".addr-slot-flow").css("border-color", "#427605"), $(".addr-slot-flow").css("border-style", "solid"), $(".slot-payment-flow").css("border-color", "#cbcbcb"), $(".slot-payment-flow").css("border-style", "dashed"), fn_checkout.setpage("delivery-summary"), window.scrollTo(0, 0)
                }, 400);
                break;
            case "shipment":
                t.find(".li-checkout-page").addClass("collapse"), setTimeout(function () {
                    t.find(".li-checkout-page").removeClass("active complete collapse expand"), t.find(".payment").addClass("active"), t.find(".address").addClass("complete"), t.find(".shipments").addClass("complete"), $(".addr-slot-flow").css("border-color", "#427605"), $(".addr-slot-flow").css("border-style", "solid"), $(".slot-payment-flow").css("border-color", "#427605"), $(".slot-payment-flow").css("border-style", "solid"), fn_checkout.setpage("payments"), window.scrollTo(0, 0)
                }, 400)
        }
    },
    validateAddrField: function () {
        var e = $(".li-addr-form-fields");
        e.find('[data-type="addr-loc"]').on("change", function () {
            $(this).val().length < 1 && $(this).attr({
                "data-flag": "false"
            })
        })
    },
    saveAddr: function () {
        var e = $(".li-addr-form-fields");
        $(".confirm-save-addr").on("click", function (t) {
            t.stopImmediatePropagation(), $(".li-addr-loader").addClass("loader-div"), fn_checkout.getAddrCount("Checkout_SaveAddress", "Save Address", "Save");
            var a = {
                    line1: e.find('[data-type="addr-loc"]').val(),
                    line2: e.find('[data-type="flat"]').val(),
                    city: e.find('[data-type="addr-city"]').val(),
                    landmark: e.find('[data-type="addr-landmark"]').val(),
                    pincode: e.attr("data-pincode"),
                    contact: e.find('[data-type="mobile"]').val(),
                    email: e.find('[data-type="email"]').val(),
                    name: e.find('[data-type="name"]').val(),
                    lat: e.attr("data-lat"),
                    lng: e.attr("data-lng")
                },
                o = $(".addr-save-btn"),
                s = o.attr("data-type"),
                r = o.attr("data-addrid");
            "update" == s && Object.assign(a, {
                address_id: r
            });
            var n = $(".li-page-container").find(".li-address-container");
            fn_home.ajaxForm(a, "POST", "/checkout/save-address").done(function (e) {
                var t = JSON.parse(e);
                if (200 === t.statusCode) {
                    n.find("li").removeClass("selected"), localStorage.setItem("city_name", t.data.address.city), localStorage.setItem("hub_id", t.data.address.hub_id), sessionStorage.setItem("review_cart_city_name", t.data.address.city), sessionStorage.setItem("review_cart_address", t.data.address.line2), $(".addr-email").val() && (clevertap.profile.push({
                        Site: {
                            Name: "" + a.name,
                            Email: "" + a.email
                        }
                    }), $(".profile-container").find(".username").html(a.name)), "update" == s && n.find('[data-prid="' + r + '"]').remove();
                    var i = t.data.address,
                        l = null != i.landmark ? "<br>" + i.landmark : "",
                        d = i.line2 + " " + i.line1 + " " + l + " " + i.city + " " + i.contact;
                    '<li data-prid="' + i.address_id + '" data-lat="' + i.lat + '" data-lng="' + i.lng + '" data-addrstr="' + d + '"><div class="li-addr-sel"><p class="li-addr-title">' + i.line2 + '</p><p class = "li-addr-body">' + i.line2 + "<br>" + i.line1 + l + "<br>" + i.city + " " + i.pincode + "<br>Mobile Number:" + i.contact + '</p></div><div class="li-addr-cta"><button class="edit-addr" data-addrid="' + i.address_id + '">Edit</button><button class="delete-addr" data-addrid="' + i.address_id + '">Delete</button></div></li>';
                    fn_checkout.setProfile(a.name, a.email), $(".li-addr-loader").removeClass("show"), fn_checkout.resetForm(), fn_checkout.getAddr(), $(".complete-address").removeClass("disabled"), $(".li-checkout-page.address").find(".li-page-body").removeClass("strict");
                    var c = "/checkout_oos/change-address";
                    fn_home.ajaxForm({
                        lat: t.data.address.lat,
                        lng: t.data.address.lng
                    }, "POST", c).done(function (e) {
                        var a = JSON.parse(e);
                        switch (localStorage.getItem("address-count"), fn_checkout.getAddrCount("Checkout_choose Address", "Choose Address"), localStorage.setItem("default_addr_lat", t.data.address.lat), localStorage.setItem("default_addr_lng", t.data.address.lng), localStorage.setItem("default_addr_id", t.data.address.address_id), a.code) {
                            case 200:
                                fn_checkout.alertBox(a.message, a.data, "location-changed");
                                break;
                            case 201:
                                null != a.data && fn_home.ajaxForm({
                                    location: a.data.address,
                                    lat: a.data.lat,
                                    lng: a.data.lng,
                                    clearcart: "false"
                                }, "POST", "/get-location").done(function (e) {
                                    if ("success" == e.result) {
                                        localStorage.setItem("default_addr_lat", t.data.address.lat), localStorage.setItem("default_addr_lng", t.data.address.lng), localStorage.setItem("default_addr_id", t.data.address.address_id), fn_checkout.setLocation(e);
                                        var a = {
                                            title: "Choose Address <span class = 'change-addr'>Change</span>",
                                            subtitle: localStorage.getItem("address")
                                        };
                                        fn_checkout.setNavMessages(a, "addr"), fn_checkout.getShipments("proceed-shipment"), fn_checkout.setNavActive("redo-shipment"), fn_checkout.setPageActive("redo-shipment"), fn_checkout.resetAddr(), $(".li-saved-address").find("li").removeClass("selected"), $(".li-address-container").find('[data-prid="' + t.data.address.address_id + '"]').addClass("selected"), $(".li-page-body").find(".complete-address").removeClass("disabled"), $(".li-checkout-page-title").find(".selected-item.address").html($(".li-address-container").find('[data-prid="' + t.data.address.address_id + '"]').attr("data-addrstr"))
                                    }
                                })
                        }
                    }), fn_checkout.updateAddr(), fn_checkout.selectAddress(), fn_checkout.hideAddrLoaders(), o.attr("data-type", "save"), o.attr("data-addrid", "")
                } else fn_checkout.showAlert(t.data.message)
            }).always(function () {
                $(".li-addr-loader").addClass("complete"), setTimeout(function () {
                    $(".li-addr-loader").removeClass("complete loader-div")
                }, 1200)
            })
        })
    },
    mergeAddress: function () {
        var e = $(".li-addr-form-fields"),
            t = [],
            a = new mapFn;
        $(".addr-save-btn").on("click", function (o) {
            function s(e, t, a, o) {
                var s = 6371,
                    n = r(a - e),
                    i = r(o - t),
                    l = Math.sin(n / 2) * Math.sin(n / 2) + Math.cos(r(e)) * Math.cos(r(a)) * Math.sin(i / 2) * Math.sin(i / 2),
                    d = 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)),
                    c = s * d;
                return 1e3 * c
            }

            function r(e) {
                return e * (Math.PI / 180)
            }
            o.stopImmediatePropagation(), fn_checkout.showAddrPartsecond();
            for (var n = {
                    line1: e.find('[data-type="addr-loc"]').val(),
                    line2: e.find('[data-type="flat"]').val(),
                    city: e.find('[data-type="addr-city"]').val(),
                    landmark: e.find('[data-type="addr-landmark"]').val(),
                    pincode: e.attr("data-pincode"),
                    contact: e.find('[data-type="mobile"]').val(),
                    email: e.find('[data-type="email"]').val(),
                    name: e.find('[data-type="name"]').val(),
                    lat: e.attr("data-lat"),
                    lng: e.attr("data-lng")
                }, i = n.line1, l = 0; l < marker1.length; l++) marker1[l] && marker1[l].setMap && marker1[l].setMap(null);
            $.ajax({
                url: "/maps/geocoding?address=" + encodeURIComponent(i),
                type: "GET",
                timeout: 2e4,
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
                }
            }).done(function (e) {
                if (e = JSON.parse(e), "success" === e.type) {
                    var o = e.data;
                    t = [];
                    var r = {
                        url: "https://d2407na1z3fc0t.cloudfront.net/Banner/otherlocation.png",
                        scaledSize: new google.maps.Size(30, 30),
                        anchor: new google.maps.Point(15, 15)
                    };
                    if ($.map(o, function (e, o) {
                            var r = {
                                    lat: n.lat,
                                    lng: n.lng
                                },
                                i = {
                                    lat: e.lat,
                                    lng: e.lng
                                },
                                l = s(r.lat, r.lng, i.lat, i.lng);
                            t.push({
                                distance: l,
                                lat: i.lat,
                                lng: i.lng,
                                faddress: e.formatted_address
                            }), t.length >= 1 && (a.mapReset({
                                lat: t[0].lat,
                                lng: t[0].lng
                            }), a.fn_geocoder({
                                lat: t[0].lat,
                                lng: t[0].lng
                            }), Math.round(t[0].distance) <= 100 ? (zoom = 18, map.setZoom(zoom)) : Math.round(t[0].distance) <= 500 ? (zoom = 16, map.setZoom(zoom)) : Math.round(t[0].distance) <= 1e3 ? (zoom = 15, map.setZoom(zoom)) : Math.round(t[0].distance) <= 2e3 ? (zoom = 14, map.setZoom(zoom)) : Math.round(t[0].distance) <= 3e3 ? (zoom = 13.5, map.setZoom(zoom)) : Math.round(t[0].distance) <= 4e3 ? (zoom = 13, map.setZoom(zoom)) : Math.round(t[0].distance) <= 6e3 ? (zoom = 12.5, map.setZoom(zoom)) : Math.round(t[0].distance) <= 8e3 ? (zoom = 12, map.setZoom(zoom)) : (zoom = 11, map.setZoom(zoom)))
                        }), t.sort(function (e, t) {
                            return e.distance - t.distance
                        }), t.length > 0) {
                        if (Math.round(t[0].distance) <= 20) {
                            var i = {
                                lat: t[0].lat,
                                lng: t[0].lng
                            };
                            marker1[0] = new google.maps.Marker({
                                position: i,
                                icon: r
                            }), marker1[0].setMap(map), $(".two-loc-popup").hide()
                        } else {
                            var i = {
                                lat: t[0].lat,
                                lng: t[0].lng
                            };
                            marker1[0] = new google.maps.Marker({
                                position: i,
                                icon: r
                            }), marker1[0].setMap(map);
                            var l = {
                                lat: Number(n.lat),
                                lng: Number(n.lng)
                            };
                            marker1[1] = new google.maps.Marker({
                                position: l,
                                icon: r
                            }), marker1[1].setMap(map), $(".two-loc-popup").show()
                        }
                        google.maps.event.addListener(marker1[0], "click", function () {
                            var e = {
                                lat: t[0].lat,
                                lng: t[0].lng
                            };
                            a.mapReset(e), a.fn_geocoder(e)
                        }), google.maps.event.addListener(marker1[1], "click", function () {
                            var e = {
                                lat: Number(n.lat),
                                lng: Number(n.lng)
                            };
                            a.mapReset(e), a.fn_geocoder(e)
                        })
                    }
                } else alert("Geocode was not successful for the following reason: " + status)
            }), fn_checkout.saveAddr()
        }), $(".back-to-form").on("click", function (e) {
            e.stopImmediatePropagation();
            for (var t = 0; t < marker1.length; t++) marker1[t] && marker1[t].setMap && marker1[t].setMap(null);
            fn_checkout.showAddrPartfirst()
        }), $(".confirm-addr-location").on("click", function (e) {
            e.stopImmediatePropagation();
            for (var t = 0; t < marker1.length; t++) marker1[t] && marker1[t].setMap && marker1[t].setMap(null);
            fn_checkout.showAddrPartfirst()
        })
    },
    setRecentSearchAddr: function (e) {
        var t = JSON.parse(localStorage.getItem("addresses"));
        if (null == t || 0 == t.length) t = [], t.unshift({
            lat: e.lat,
            lng: e.lng,
            location: e.loc,
            city: e.city
        }), localStorage.setItem("addresses", JSON.stringify(t));
        else {
            var a = t.slice(0, 3),
                o = $(".recent-search-container .recent-data");
            o.html(""), $.map(a, function (e, t) {
                o.append('<div class="recent-search-item" data-lat = "' + e.lat + '" data-lng = "' + e.lng + '" data-loc = "' + e.location + '" data-city="' + e.city + '"><div class ="search-string">' + e.location + "</div></div>")
            }), fn_checkout.bindCheckoutRecentSearchClick();
            var s = !1;
            $.map(a, function (t, o) {
                if (parseFloat(e.lat) == parseFloat(t.lat) && parseFloat(e.lng) == parseFloat(t.lng)) {
                    s = !0;
                    var r = a.splice(o, 1);
                    return a.unshift(r[0]), void localStorage.setItem("addresses", JSON.stringify(a))
                }
            }), 0 == s && (a.unshift({
                lat: e.lat,
                lng: e.lng,
                location: e.loc,
                city: e.city
            }), a = a.slice(0, 3), localStorage.setItem("addresses", JSON.stringify(a)))
        }
    },
    bindCheckoutRecentSearchClick: function () {
        $(".recent-data .recent-search-item").on("click", function (e) {
            fn_main.showloader(), e.stopImmediatePropagation();
            var t = Number($(this).attr("data-lat")),
                a = Number($(this).attr("data-lng")),
                o = {
                    lat: t,
                    lng: a
                },
                s = new mapFn;
            s.mapReset(o), s.fn_geocoder(o), $(".recent-search-container").hide(), $(".search-container").css("display", "none")
        })
    },
    showAddrPartfirst: function () {
        $(".li-form-holder").show(), $(".li-confirm-address").hide(), $(".map-marker-holder").css("width", "50%"), $(".move-marker-msg").removeClass("show"), $(".addr-merge-info").removeClass("show")
    },
    showAddrPartsecond: function () {
        $(".li-form-holder").hide(), $(".li-confirm-address").show(), $(".map-marker-holder").css("width", "100%"), $(".move-marker-msg").addClass("show"), $(".addr-merge-info").addClass("show")
    },
    updateAddr: function () {
        $(".li-address-container").find("li").on("click", function (e) {
            if (e.stopImmediatePropagation(), "delete-addr" === e.target.className) fn_home.ajaxForm({
                addr_id: e.target.dataset.addrid
            }, "POST", "/checkout/delete-address").done(function (e) {
                var t = JSON.parse(e);
                200 === t.statusCode ? (fn_checkout.getAddr(), fn_checkout.getAddrCount("Checkout_DeleteAddress", "Delete Address", "delete")) : alert("Error deleting address, please try again!")
            });
            else if ("edit-addr" === e.target.className) fn_home.ajaxForm({
                addr_id: e.target.dataset.addrid
            }, "POST", "/checkout/get-address-id").done(function (e) {
                var t = JSON.parse(e),
                    a = $(".li-addr-form-fields");
                if (200 === t.statusCode) {
                    fn_checkout.getAddrCount("Checkout_EditAddress", "Edit Address");
                    var o = t.data.address,
                        s = null != o.landmark ? o.landmark : "";
                    $(".li-addr-loader").addClass("show"), $(".li-checkout-page.address").find(".li-page-body").addClass("strict"), a.find('[data-type="addr-flat"]').focus(), a.attr("data-pincode", o.pincode), a.attr("data-lat", o.lat), a.attr("data-lng", o.lng), a.find('[data-type="addr-loc"]').val(o.line1), a.find('[data-type="flat"]').val(o.line2), a.find('[data-type="addr-landmark"]').val(s), a.find('[data-type="addr-city"]').val(o.city), a.find('[data-type="mobile"]').val(o.contact), a.find(".addr-save-btn").removeClass("disabled").html("Update").attr({
                        "data-type": "update",
                        "data-addrid": o.address_id
                    }), fn_checkout.showAddrPartfirst(), fn_checkout.setFlag("true");
                    var r = new google.maps.LatLng(o.lat, o.lng);
                    map.panTo(r), a.find(".addr-form-back").show(), fn_checkout.checkProfile(), fn_checkout.mergeAddress()
                } else alert("Error fetching address, please try again!")
            });
            else {
                if ("li-addr-cta" === e.target.className) return;
                fn_main.showloader();
                var t = $(this).attr("data-lat"),
                    a = $(this).attr("data-lng");
                fn_checkout.verifyService(t, a, $(this)), $(".li-saved-address").find("li").removeClass("selected"), $(".li-page-body").find(".complete-address").removeClass("disabled"), $(this).addClass("selected"), localStorage.setItem("default_addr_lat", t), localStorage.setItem("default_addr_lng", a), localStorage.setItem("default_addr_id", $(this).attr("data-prid")), $(".li-checkout-page-title").find(".selected-item.address").html($(this).data("addrstr"))
            }
        })
    },
    verifyService: function (e, t, a) {
        var o = "/checkout_oos/change-address";
        fn_home.ajaxForm({
            lat: e,
            lng: t
        }, "POST", o).done(function (e) {
            fn_main.hideloader();
            var t = JSON.parse(e);
            switch (localStorage.getItem("address-count"), fn_checkout.getAddrCount("Checkout_choose Address", "Choose Address"), localStorage.setItem("address", a.attr("data-addrstr").split("<br>")[0]), t.code) {
                case 200:
                    sessionStorage.setItem("review_cart_city_name", a.attr("data-city").trim()), sessionStorage.setItem("review_cart_address", a.attr("data-addrstr").split("<br>")[0]), fn_checkout.alertBox(t.message, t.data, "location-changed");
                    break;
                case 201:
                    null != t.data && fn_home.ajaxForm({
                        location: t.data.address,
                        lat: t.data.lat,
                        lng: t.data.lng,
                        clearcart: "false"
                    }, "POST", "/get-location").done(function (e) {
                        "success" == e.result && (localStorage.setItem("city_name", a.attr("data-city").trim()), fn_checkout.setLocation(e))
                    })
            }
        }).fail(function () {
            fn_main.hideloader()
        }).always(function () {
            fn_main.hideloader()
        })
    },
    updateCartLocation: function (e, t) {
        var a = "/checkout_oos/update-cart-location";
        return fn_home.ajaxForm({
            lat: e,
            lng: t
        }, "POST", a)
    },
    renderPaymentLoyaltyItem: function (e) {
        subProgramId = e, fn_home.ajaxForm({}, "GET", "/loyalty/get-sub-program-details/" + e).done(function (e) {
            if (e = JSON.parse(e), 200 === e.statusCode) {
                var t = e.data;
                loyaltyPayableAmount = t.price, $(".payment-cta").find(".init-pay").html("Pay <i class = 'rupee'>" + parseFloat(t.price).toFixed(2) + "</i>"), $(".lp-ll-sub-program").html(t.planName), $(".lp-ll-selling-price").html("&#8377 " + t.price), $(".lp-ll-selling-price").attr("value", t.price), t.strikePrice > t.price && ($(".lp-ll-marked-price").html("&#8377 " + t.strikePrice), $(".lp-ll-marked-price").attr("value", t.strikePrice))
            } else console.log({
                Error: e
            })
        }).fail(function () {
            console.log("res")
        }).always(function () {
            fn_main.hideloader()
        })
    },
    alertBox: function (e, t, a) {
        var o = $(".li-alert-screen"),
            s = o.find(".cta");
        switch (a) {
            case "no-slots-qc":
                o.find(".message").html(e), o.find(".heading").html("Alert!"), s.find(".cancel").html("Okay").attr("data-action", "normal"), s.find(".confirm").hide(), o.addClass("show");
                break;
            case "repeat-order":
                var r = e.split("text-separator");
                o.find(".message").html(r[0]), o.find(".heading").html(r[1]), s.find(".cancel").css("margin-right", "18px").html("EXISTING CART").attr("data-action", "repeat-order"), s.find(".confirm").html("REPEAT ORDER").show().attr("data-action", "repeat-order").attr("data-ship-id", r[2]), o.addClass("show");
                break;
            case "oos":
                o.find(".message").html(e), o.find(".heading").html("Alert [Change Product availability]"), s.find(".cancel").html("Dismiss").attr("data-action", "normal"), s.find(".confirm").hide(), o.addClass("show");
                break;
            case "location-changed":
                o.find(".message").html(e), o.find(".heading").html("Alert! - Location Changed"), s.find(".cancel").html("Change Address"), s.find(".confirm").html("Review Cart").show().attr("data-action", "review-cart"), o.addClass("show");
                break;
            case "alert":
                o.find(".message").html(e), o.find(".heading").html("Alert!"), s.find(".cancel").html("Okay"), s.find(".confirm").hide(), o.addClass("show");
                break;
            case "confirm-shipment":
                o.find(".message").html(e), o.find(".heading").html("Alert!"), s.html('\n        <button class="confirm">\n            Cancel\n        </button>\n        <button class="cancel">\n            Cancel\n        </button>'), s.find(".cancel").html("No").css({
                    background: "#e41d36",
                    color: "#ffffff",
                    "border-color": "#e41d36"
                }), s.find(".confirm").html("Yes").show().css({
                    background: "#ffffff",
                    color: "rgba(0, 0, 0, 0.87)",
                    "border-color": "rgba(0, 0, 0, 0.87)"
                }), s.find(".confirm").attr("data-action", "review-shipment"), o.addClass("show");
                break;
            case "confirm-addr":
                o.find(".message").html(e), o.find(".heading").html("Alert!"), s.html('\n        <button class="confirm">\n            Cancel\n        </button>\n        <button class="cancel">\n            Cancel\n        </button>'), s.find(".cancel").html("No").css({
                    background: "#e41d36",
                    color: "#ffffff",
                    "border-color": "#e41d36"
                }), s.find(".confirm").html("Yes").show().css({
                    background: "#ffffff",
                    color: "rgba(0, 0, 0, 0.87)",
                    "border-color": "rgba(0, 0, 0, 0.87)"
                }), s.find(".confirm").attr("data-action", "review-addr"), o.addClass("show");
                break;
            case "free-delivery":
                o.find(".message").html(e), o.find(".heading").html("Alert!"), s.html('\n        <button class="confirm">\n            Cancel\n        </button>\n        <button class="cancel">\n            Cancel\n        </button>'), s.find(".confirm").html("Remove").show().css({
                    background: "#ffffff",
                    color: "rgba(0, 0, 0, 0.87)",
                    "border-color": "rgba(0, 0, 0, 0.87)"
                }), s.find(".confirm").attr("data-action", "remove-coupon"), s.find(".cancel").html("Continue").css({
                    background: "#e41d36",
                    color: "#ffffff",
                    "border-color": "#e41d36"
                }), o.addClass("show");
                break;
            case "alert-upi":
                o.find(".message").html(e), o.find(".heading").html("Are you sure to go back?"), s.find(".cancel").html("Stay"), s.find(".confirm").html("Leave").show().attr("data-action", "upi-leave"), o.addClass("show")
        }
        "location-changed" != a && o.click(function () {
            o.removeClass("show"), s.removeClass("show")
        }), fn_checkout.alertCta(t, a)
    },
    alertCta: function (e, t) {
        var a = $(".li-alert-screen"),
            o = a.find(".cta");
        o.find(".cancel").on("click", function (e) {
            switch (t) {
                case "location-changed":
                    $(".li-saved-address").find("li").removeClass("selected"), $(".li-page-body").find(".complete-address").addClass("disabled");
                    break;
                case "free-delivery":
                    var o = JSON.parse(localStorage.getItem("coupon")),
                        s = {
                            "Total Amount": o.TotalAmount,
                            "Coupon Name": o.CouponName,
                            "Coupon Type": o.CouponType,
                            Status: o.Status,
                            Message: o.Message,
                            "Hub ID": Number(localStorage.getItem("hub_id")),
                            "City Name": localStorage.getItem("city_name"),
                            Discount: o.Discount,
                            "Licious Wallet Amount": Number(localStorage.getItem("wallet_usedValue"))
                        };
                    fn_cart.gaAddRemoveEvent("FreeDel_Coupon_Apply", "Purchase", JSON.stringify(s)), s.Source = "Purchase", clevertap.event.push("FreeDel_Coupon_Apply", s)
            }
            a.removeClass("show")
        }), o.find(".confirm").on("click", function (t) {
            t.stopImmediatePropagation();
            var o = $(this).attr("data-action");
            switch (o) {
                case "review-cart":
                    fn_checkout.reviewCart(e, "show-location");
                    break;
                case "remove-coupon":
                    fn_checkout.removeCouponClick("free_remove");
                    break;
                case "review-shipment":
                    if ("true" === $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").attr("quickload")) a.removeClass("show"), localStorage.setItem("coupon_used", ""), fn_checkout.quickCheckoutLoadShipment();
                    else {
                        fn_checkout.removeCouponClick("remove"), fn_checkout.setNavActive("redo-shipment"), fn_checkout.setPageActive("redo-shipment"), $(".li-bill-details").hide(), $(".edit-shipments").hide(), localStorage.setItem("coupon_used", "");
                        var s = {
                            title: "Payment methods",
                            subtitle: ""
                        };
                        fn_checkout.setNavMessages(s, "cards"), a.removeClass("show"), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show()
                    }
                    break;
                case "review-addr":
                    if ("true" === $(".li-checkout-nav-steps").find(".li-nav-title .change-addr").attr("quickload")) a.removeClass("show"), localStorage.setItem("coupon_used", ""), fn_checkout.quickCheckoutAddressLoad();
                    else {
                        fn_checkout.setNavActive("redo-addr"), fn_checkout.setPageActive("redo-addr");
                        var r = $(".li-address-container"),
                            n = r.find("li").length,
                            s = {
                                title: "Choose Address",
                                subtitle: "You have " + n + " saved address"
                            };
                        fn_checkout.setNavMessages(s, "addr");
                        var s = {
                            title: "Payment methods",
                            subtitle: ""
                        };
                        fn_checkout.setNavMessages(s, "cards"), $(".li-bill-details").hide(), $(".change-addr").hide(), $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").hide(), a.removeClass("show"), localStorage.setItem("coupon_used", ""), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show()
                    }
            }
        })
    },
    reviewCart: function (e, t) {
        var a = localStorage.getItem("default_addr_lat"),
            o = localStorage.getItem("default_addr_lng");
        localStorage.setItem("address", sessionStorage.getItem("review_cart_address")), localStorage.setItem("city_name", sessionStorage.getItem("review_cart_city_name")), sessionStorage.removeItem("review_cart_city_name"), sessionStorage.removeItem("review_cart_address"), fn_checkout.updateCartLocation(a, o).done(function (e) {
            var t = JSON.parse(e);
            "LOCATION_CHANGED" == t.status || "SERVICABLE" == t.status ? null != t.data ? fn_home.ajaxForm({
                location: t.data.address,
                lat: t.data.lat,
                lng: t.data.lng,
                clearcart: "false"
            }, "POST", "/get-location").done(function (e) {
                "success" == e.result && (fn_checkout.setLocation(e), fn_cart.miniCart(), $(".li-alert-screen").removeClass("show"))
            }) : (fn_cart.miniCart(), $(".li-alert-screen").removeClass("show")) : Materialize.toast(t.message, 3e3)
        })
    },
    setLocation: function (e) {
        $(".sub-header").find(".location-name").html(e.location), localStorage.setItem("hub_id", e.hub_id), localStorage.setItem("address", e.location), $(".city-location .city").html(localStorage.getItem("city_name"))
    },
    resetAddr: function () {
        $(".li-checkout-nav-steps").find(".li-nav-title .change-addr").on("click", function () {
            var e = localStorage.getItem("coupon_used");
            if ("" == e || null == e) {
                fn_checkout.getAddrCount("Checkout_changeAddress", "Change Address"), fn_checkout.setNavActive("redo-addr"), fn_checkout.setPageActive("redo-addr");
                var t = $(".li-address-container"),
                    a = t.find("li").length,
                    o = {
                        title: "Choose Address",
                        subtitle: "You have " + a + " saved address"
                    };
                fn_checkout.setNavMessages(o, "addr"), $(".li-bill-details").hide(), $(this).hide(), $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").hide();
                var o = {
                    title: "Payment methods",
                    subtitle: ""
                };
                fn_checkout.setNavMessages(o, "cards"), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show()
            } else fn_checkout.alertBox("Applied coupon will be removed, Wish to continue?", "", "confirm-addr"), $(".li-checkout-nav-steps").find("li.address .li-nav-title").html("Choose Address <span class = 'change-addr'>Change</span>"), fn_checkout.resetAddr()
        })
    },
    completeAddress: function () {
        $(".complete-address").on("click", function (e) {
            e.stopImmediatePropagation();
            var t = localStorage.getItem("default_addr_id");
            localStorage.getItem("default_addr_lat"), localStorage.getItem("default_addr_lng");
            if ("" == t) fn_checkout.alertBox("Select an address to continue", "", "alert");
            else {
                fn_checkout.setPageActive("addr"), localStorage.getItem("address") || localStorage.setItem("address", localStorage.getItem("last_address").split("<br>")[0]);
                var a = {
                    title: "Choose Address <span class = 'change-addr'>Change</span>",
                    subtitle: localStorage.getItem("address")
                };
                fn_checkout.setNavMessages(a, "addr"), fn_checkout.setNavActive("addr"), fn_checkout.getShipments("proceed-shipment"), fn_checkout.resetAddr()
            }
        })
    },
    resetForm: function () {
        var e = $(".li-addr-form-fields"),
            t = e.find("input");
        $.each(t, function (e, t) {
            "addr-loc" != t.dataset.type && "addr-city" != t.dataset.type && (t.value = "")
        }), e.find('[data-type="addr-flat"]').focus(), $(".addr-save-btn").addClass("disabled").html("Save").attr({
            "data-type": ""
        }), fn_checkout.setFlag("false"), fn_checkout.showAddrPartfirst(), e.find('[data-type="email"]').prop("disabled", !1).css({
            opacity: 1
        }), e.find('[data-type="name"]').prop("disabled", !1).css({
            opacity: 1
        }), e.find('[data-type="addr-loc"]').prop("disabled", !1)
    },
    showContinueShopping: function (e) {
        $(".complete-shipments").hide(), $(".cart-empty-wrapper").show(), $(".continue-btn.shopping").on("click", function () {
            "cart" == e ? ($(".li-cart-summary-wrapper").removeClass("show"), $(".cart-screen").hide(), window.location.href = "/") : window.location.href = "/"
        })
    },
    showAlertMessages: function (e) {
        e && Array.isArray(e) && e.length && e.map(function (e, t) {
            $(".li-checkout-container").find(".shipment-" + (t + 1)).find(".slots-selector").text() === e.which_slot ? $(".li-checkout-container").find(".shipment-" + (t + 1)).find(".slots-alert-message").html(e.message).show() : $(".li-checkout-container").find(".shipment-" + (t + 1)).find(".slots-alert-message").html("").hide()
        })
    },
    eggFlag: !1,
    getShipments: function (e) {
        return new Promise(function (t, a) {
            slot_lock = [], slot_lock_dates = [], $(".complete-shipments").addClass("disabled"), $(".complete-shipments").show(), $(".li-checkout-page.shipments").find(".li-shipment-container.express").hide, $(".li-checkout-page.shipments").find(".li-shipment-container.split").hide(), fn_home.ajaxForm({}, "POST", "/checkout/get-shipments").done(function (o) {
                var s = JSON.parse(o);
                if (200 === s.statusCode) {
                    s.data.shipment_summary.length && s.data.shipment_summary[0].products[0].hub_id !== localStorage.getItem("hub_id") && (Materialize.toast("Your current location and selected location seems to be different. Please select the right address before placing an order.", 3e3), window.location.reload()), $(".cart-empty-wrapper").hide(), "loyalty_item" in s.data && null !== s.data.loyalty_item && 0 !== s.data.loyalty_item.length && (renderCheckoutLoyaltyItem(s.data.loyalty_item[0]), $(".co-ll-item").show()), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show(), s.data.dynamic_delivery_message.length > 0 && (s.data.dynamic_delivery_message[0].enable || "success" === s.data.dynamic_delivery_message[0].style) ? ($(".dynamic-delivery-message .message").html(s.data.dynamic_delivery_message[0].message), $(".dynamic-delivery-info-pop-up .info-header .header-text").html(s.data.dynamic_delivery_message[0].information_header), $(".dynamic-delivery-info-pop-up .info-body").html(s.data.dynamic_delivery_message[0].information), "success" === s.data.dynamic_delivery_message[0].style ? $(".dynamic-delivery-message").addClass("success") : $(".dynamic-delivery-message").removeClass("success"), $(".dynamic-delivery-message").click(function () {
                        $(".dynamic-delivery-info-pop-up").show(), $(".loc-screen").removeClass("hide"), $(".loc-screen").addClass("show"), $(".dynamic-delivery-info-pop-up .info-header .close").click(function () {
                            $(".dynamic-delivery-info-pop-up").hide(), $(".loc-screen").addClass("hide"), $(".loc-screen").removeClass("show")
                        }), $(".loc-screen").click(function () {
                            $(".dynamic-delivery-info-pop-up").hide(), $(".loc-screen").addClass("hide"), $(".loc-screen").removeClass("show")
                        })
                    }), $(".dynamic-delivery-message").css("display", "flex")) : $(".dynamic-delivery-message").css("display", "none"), $(".li-checkout-page.shipments").find(".li-shipment-container.express").html("").show(), $(".li-checkout-page.shipments").find(".li-shipment-container.split").html("").show(), s.data.shipment_summary.length > 1 && $(".li-checkout-page.shipments").find(".li-shipment-container.split").show(), localStorage.setItem("split", s.data.shipment_summary.length), localStorage.setItem("shipment_split", s.data.shipment_summary.length);
                    var r = s.data.messages.length > 0 ? s.data.messages[0].message : "";
                    s.data.messages.length > 0 ? $.map(s.data.messages, function (e) {
                        "eggs" === e.condition ? fn_checkout.eggFlag = !0 : fn_checkout.eggFlag = !1
                    }) : fn_checkout.eggFlag = !1;
                    var n = s.data.shipment_summary.length,
                        i = 0;
                    $.map(s.data.shipment_summary, function (e) {
                        e.products.map(function (e) {
                            return i += parseInt(e.quantity)
                        })
                    });
                    var l = s.data.order_charges,
                        d = {
                            title: "Delivery Summary",
                            subtitle: i + " items to be delivered in " + n + " shipments"
                        };
                    fn_checkout.setNavMessages(d, "shipment"), fn_cart.cartSaveMessage(s.data), localStorage.setItem("count", i);
                    var c = {};
                    $.map(l, function (e) {
                        "subtotal" == e.key && (c.subtotal = e.value), "deliverycharge" != e.key && "delivery_charge" != e.key || (c.delivery = e.value), "discount" == e.key && (c.discount = e.value), "liciouswallet" != e.key && "wallet" != e.key || (c.wallet = e.value), "total" == e.key.toLowerCase() && (c.total = e.value)
                    }), fn_ll.loyalty_cart_value = c.total.toString(), fn_ll.loyalty_delivery_charges = c.delivery.toString(), localStorage.setItem("amount", JSON.stringify(c)), fn_checkout.renderShipments(s.data.shipment_summary, r, e, c, i), fn_checkout.showAlertMessages(s.data.shipment_alert_message), $(".info-hover").hover(function () {
                        var e = {
                            ShipmentID: $(this).attr("data-ship_id"),
                            "Product Name": $(this).attr("data-prname"),
                            "Category Name": $(this).attr("data-category"),
                            "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                            Source: "Checkout_Slot",
                            Checkout_Flow: checkout_flow()
                        };
                        fn_main.assignIncomingSource(e), fn_cart.gaAddRemoveEvent("Checkout_InfoIcon", "Checkout_Slot", JSON.stringify(e)), clevertap.event.push("Slot Selection Load", e)
                    }), t(s)
                } else 202 !== s.statusCode || "oos_error" !== s.data.errorMessage && "cross_sell_modified" !== s.data.errorMessage && "empty_shipment" !== s.data.errorMessage ? 202 === s.statusCode && "empty_cart" == s.data.errorMessage ? ($(".li-checkout-page.shipments").find(".li-shipment-container.express").html(""), $(".li-checkout-page.shipments").find(".li-shipment-container.split").html(""), $(".dynamic-delivery-message").css("display", "none"), fn_checkout.showContinueShopping(), $(".co-ll-item-placeholder").html("")) : a("fail") : (Materialize.toast(s.data.message, 5e3), fn_cart.miniCart(), $(".dynamic-delivery-message").css("display", "none"))
            })
        })
    },
    renderShipments: function (e, t, a, o, s) {
        total_shipments = e.length, slot_lock.length = total_shipments, slot_lock_dates.length = total_shipments;
        var r = e[0].products,
            n = (JSON.parse(localStorage.getItem("amount")).discount, '<div class="split-message">' + t + "</div>");
        $(".li-checkout-page.shipments").find(".li-shipment-container.express").html(""), $(".li-checkout-page.shipments").find(".li-shipment-container.split").html(""), $(".li-checkout-page.shipments").find(".li-shipment-container.split").html(n), e.length > 1 ? (localStorage.setItem("split", "True"), $(".li-checkout-page.shipments").find(".li-shipment-container.express").show(), $(".li-checkout-page.shipments").find(".li-shipment-container.split").show()) : (localStorage.setItem("split", "False"), $(".li-checkout-page.shipments").find(".li-shipment-container.express").show(), $(".li-checkout-page.shipments").find(".li-shipment-container.split").hide()), branchEventData = [];
        var i = {
                productId: "",
                productName: "",
                quantity_avail: 0,
                quantity_stock: 0,
                category_id: "",
                base_price: "",
                category_name: ""
            },
            l = {
                expressProductName: "",
                scheduledProductName: "",
                expressType: "",
                expressQuantity: "",
                expressInventory: "",
                expressDp: "",
                expresRm: "",
                schedule1Type: "",
                schedule1Quantity: "",
                schedule1Inventory: "",
                schedule1Dp: "",
                schedule1Rm: "",
                shipmentType: "",
                shipmentId: ""
            };
        localStorage.setItem("shipmentCount", e ? e.length : 0), $.map(e, function (e, t) {
            present_shipment = t + 1, l.shipmentId = l.shipmentId.concat(e.id + ",");
            var a = '<div class="li-shipment shipment-' + e.id + '"><div class="li-page-heading"></div><div class="li-slots-render"></div><div class="slots-alert-message"></div><div class="li-shipment-items"><ul></ul></div></div>';
            0 === t ? ("EXPRESS" == e.slots[0].type && (l.expresscount = e.products.length, l.shipmentType = l.shipmentType.concat("EXPRESS"), e.products.forEach(function (e) {
                l.expressRm = l.expressRm + Number(e.rm_buffer_avail), l.expressDp = l.expressDp + Number(e.dispatched_quantity_avail) + ",", l.expressQuantity = l.expressQuantity + Number(e.quantity) + ",", l.expressInventory = l.expressInventory + Number(e.live_stock_avail) + ",", l.expressType = l.expressType.concat(e.type + ","), l.expressProductName = l.expressProductName.concat(e.product_name + ",")
            })), "SCHEDULED" == e.slots[0].type && (l.scheduledcount = e.products.length, l.shipmentType = l.shipmentType.concat("SCHEDULED"), e.products.forEach(function (e) {
                l.schedule1Rm = l.schedule1Rm + Number(e.rm_buffer_avail), l.schedule1Dp = l.schedule1Dp + Number(e.dispatched_quantity_avail) + ",", l.schedule1Quantity = l.schedule1Quantity + Number(e.quantity) + ",", l.schedule1Inventory = l.schedule1Inventory + Number(e.live_stock_avail) + ",", l.schedule1Type = l.schedule1Type.concat(e.type + ","), l.scheduledProductName = l.scheduledProductName.concat(e.product_name + ",")
            })), $(".li-checkout-page.shipments").find(".li-shipment-container.express").append(a)) : (l.scheduledcount = e.products.length, e.products.forEach(function (e) {
                l.schedule1Rm = l.schedule1Rm + Number(e.rm_buffer_avail), l.schedule1Dp = l.schedule1Dp + Number(e.dispatched_quantity_avail) + ",", l.schedule1Quantity = l.schedule1Quantity + Number(e.quantity) + ",", l.schedule1Inventory = l.schedule1Inventory + Number(e.live_stock_avail) + ",", l.schedule1Type = l.schedule1Type.concat(e.type + ","), l.scheduledProductName = l.scheduledProductName.concat(e.product_name + ",")
            }), $(".li-checkout-page.shipments").find(".li-shipment-container.split").append(a)), $.map(e.products, function (e, t) {
                i.productId = i.productId.concat(e.product_id + ","), i.category_name = i.category_name.concat(e.category_name + ","), i.productName = i.productName.concat(e.product_name + ","), i.category_id = i.category_id.concat(e.category_id + ","), i.base_price = i.base_price.concat(e.base_price + ","), i.quantity_avail = i.quantity_avail + (e.quantity + ","), i.quantity_stock = i.quantity_stock + Number(e.live_stock), branchEventData.push({
                    item_name: e.product_name,
                    item_id: e.product_id,
                    currency: "INR",
                    price: e.base_price.toString(),
                    quantity: e.quantity.toString(),
                    item_category: e.category_name
                })
            }), localStorage.setItem("allitem", JSON.stringify(i)), localStorage.setItem("shipmentType", l.shipmentType), fn_checkout.renderShipmentProducts(e.products, "li-shipment.shipment-" + e.id, e.id, e.slots), fn_checkout.renderShipmentHeading(e.messages, "li-shipment.shipment-" + e.id), fn_checkout.renderShipmentSlots(e.slots, "li-shipment.shipment-" + e.id, e.id)
        });
        var d = {},
            c = 1;
        $.map(e, function (e, t) {
            var a = [],
                o = [],
                s = [],
                r = [],
                n = [],
                i = [];
            if ($.map(e.products, function (e, t) {
                    a.push(e.product_name), o.push(e.type), s.push(e.quantity), r.push(e.live_stock_avail), n.push(e.dispatched_quantity_avail), i.push(e.rm_buffer_avail)
                }), "EXPRESS" == e.slots[0].type) Object.assign(d, {
                "Express Item Count": e.products.length,
                "Express Delivery Items": a.toString(),
                "Express Item types": o.toString(),
                "Express Item Quantity": s.toString(),
                "Express Item Live Inventory": r.toString(),
                "Express Item DP": n.toString(),
                "Express Item RM": i.toString(),
                Checkout_Flow: checkout_flow()
            });
            else {
                var l = {};
                l["Slot " + c + " Item Count"] = e.products.length, l["Scheduled" + c + " delivery Items"] = a.toString(), l["Schedule" + c + " Item types"] = o.toString(), l["Scheduled" + c + " Item Quantity"] = s.toString(), l["Scheduled" + c + " Live Inventory"] = r.toString(), l["Scheduled" + c + " Item DP"] = n.toString(), l["Scheduled" + c + " Item RM"] = i.toString(), Object.assign(d, l), c++
            }
            fn_main.assignIncomingSource(d)
        }), localStorage.setItem("shipmentid", l.shipmentId);
        var u = JSON.parse(localStorage.getItem("cart")),
            p = null !== localStorage.getItem("amount") ? JSON.parse(localStorage.getItem("amount")).discount : 0;
        if ("false" != a && "remove" != a) {
            var m = JSON.parse(localStorage.getItem("amount"));
            e = {
                "Cart Value": m.subtotal,
                "City Name": localStorage.getItem("city_name"),
                "Hub ID": Number(localStorage.getItem("hub_id")),
                "Saved Value": u && u.savedAmount ? u.savedAmount : p,
                "Reason for Slot": "",
                "Split Slot": Number(e.length) > 1,
                "No of Split": Number(e.length),
                "Default Slot": l.shipmentType,
                "Category ID": i.category_id,
                Checkout_Flow: checkout_flow()
            }, fn_main.assignIncomingSource(e), Object.assign(d, e), fn_cart.gaAddRemoveEvent("Checkout_defaultslot", "Checkout_Slot", JSON.stringify(d)), d.Source = "Checkout_Slot", clevertap.event.push("Slot Selection Load", d)
        }
        if ("proceed-shipment" == a) {
            var h = {
                "Cart Value": o.subtotal,
                "City Name": localStorage.getItem("city_name"),
                "Hub ID": Number(r[0].hub_id),
                "Product ID": i.productId,
                "Product Name": i.productName,
                "Category ID": i.category_id,
                Quantity: localStorage.getItem("itemQuan"),
                "Saved Value": u && u.savedAmount ? u.savedAmount : p,
                "City ID": Number(localStorage.getItem("city_id")),
                Checkout_Flow: checkout_flow()
            };
            fn_main.assignIncomingSource(h), fn_cart.gaAddRemoveEvent("Checkout_Selectshipment", "Checkout_Proceedshipment", JSON.stringify(h)), h.Source = "Checkout_Proceedshipment", clevertap.event.push("Checkout Started", h)
        }
        fn_checkout.showSlots(), fn_checkout.hideSlots(), fn_checkout.selectSlot(l, e), fn_checkout.completeShipment(l, e, i, o, l.shipmentType)
    },
    renderShipmentProducts: function (e, t, a, o) {
        var s = {
            product_id: "",
            product_name: "",
            quantity: ""
        };
        $.map(e, function (e) {
            var o = "",
                r = "",
                n = "",
                i = "qty";
            o = e.discount > 0 ? '<span class = "price discount"><b class = "rupee">' + e.base_price + '</b><b class = "rupee">' + e.actual_price + "</b></span>" : '<span class = "price"><b class = "rupee text-red">' + e.actual_price + "</b></span>", "" != e.shipment_info_message && (r = '<i class="info-hover" data-ship_id="' + a + '" data-category="' + e.category_name + '" data-prname="' + e.product_name + '">i <label>' + e.shipment_info_message + "</label></i>", i = "split-qty", n = e.shipment_quantity.replace(/of/g, "/")), s.product_id = s.product_id.concat(e.product_id + ","), s.product_name = s.product_name.concat(e.product_name + ","), s.quantity = s.quantity + (e.quantity + ","), n = e.quantity;
            var l = '<li data-sprid="' + e.product_id + '" ><img src="' + e.image + '" alt="' + e.product_name + '"><div class="li-prod-desc"><p class="pr-name">' + e.product_name + "</p><p>" + e.weight + o + '<span class="' + i + '">qty:<span>' + n + "</span>" + r + "</span></p>" + ('<span class="delete-prod" ' + fn_cart.getAttributesString(e) + ' data-shipid="') + a + '" data-prid="' + e.product_id + '" data-sprname="' + e.product_name + '" data-category="' + e.category_name + '" data-hubid=' + e.hub_id + " data-split=" + e.is_split + ' ><label for="">Remove Product</label></span></div></li>';
            $("." + t).find(".li-shipment-items ul").append(l)
        }), localStorage.setItem("product", JSON.stringify(s)), fn_checkout.deleteShipmentItem()
    },
    renderShipmentHeading: function (e, t) {
        $("." + t).find(".li-page-heading").html(e.message)
    },
    renderShipmentSlots: function (e, t, a) {
        e = e.filter(function (e) {
            return e.slots.length > 0
        });
        var o = "",
            s = "",
            r = "";
        default_delivery = "Select a Delivery Slot", slot_class = " error", shipment_continue = !1, slot_selected = !1, $.map(e, function (e, n) {
            ship_slotId = n + 1, e.is_express && (default_delivery = e.slots[0].time), e.selected && (slot_selected = !0), 0 != n || e.is_express ? 0 == n && e.is_express && (r = r.replace("{{time_slot}}", e.slots[0].time).replace("{{ship_id}}", a).replace("{{date}}", e.date).replace("{{slot_time}}", e.slots[0].time)) : r = "";
            var i = "",
                l = e.date;
            $.map(e.slots, function (t, o) {
                var s = 1 == t.status ? "" : "n-a",
                    r = void 0;
                t.selected ? (r = " selected", slot_lock_dates[present_shipment - 1] = t.time) : r = "";
                var n = "",
                    d = "";
                d = 1 === t.show_delivery_type || 0 === t.status ? "hide-dc" : 2 === t.show_delivery_type ? "free-delivery" : "show-dc", n += '<div class="dd-charge ' + d + '">' + t.message + "</div>", i += '<li data-ship_id="' + a + '" data-date="' + l + '" data-time="' + t.time + '">\n                          <button class = "' + (s + r) + '">\n                            ' + t.time + "\n                          </button>\n                          " + n + "\n                        </li>", e.is_express && 0 == o && (i += "<br/>")
            }), $.map(e.slots, function (e) {
                if (e.selected) return default_delivery = e.time, slot_class = "", shipment_continue = !0, !1
            }), shipment_continue && !fn_checkout.eggFlag ? $(".complete-shipments").removeClass("disabled") : $(".complete-shipments").addClass("disabled");
            var d, c = " ",
                u = new Date(e.timestamp).getDate(),
                p = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                m = (new Date).getDate(),
                h = new Date(e.timestamp).getDate() + " " + p[new Date(e.timestamp).getMonth()];
            u === m ? d = h : u === m + 1 ? (d = "Tomorrow " + h, e.selected && "Select a Delivery Slot" !== default_delivery && (default_delivery = "Tomorrow " + default_delivery)) : (d = h, e.selected && "Select a Delivery Slot" !== default_delivery && (default_delivery += ", " + h)), s += '<div class="dates" ship-id="' + present_shipment + '" data-id="' + present_shipment + ship_slotId + '" id="dates_' + present_shipment + ship_slotId + '"> ' + (u === m ? "Today " + d : d) + " </div>";
            var f = '<div class = "slot-day-time" ship-id="' + present_shipment + '" id="slot-day-time_' + present_shipment + ship_slotId + '" data-id="' + present_shipment + ship_slotId + '" >\n                            <ul class = "slot-time">\n                              ' + i + "\n                            </ul>\n                          </div>";
            o += f;
            var v = '<div class="action">\n                            <span class="cancel">CANCEL</span>\n                            <button class="select-proceed">SELECT & PROCEED</button>\n                          </div>',
                g = '<div class="slots-dropdown ' + slot_class + '" data-slotselected="' + slot_selected + '"><label>Choose your slot to continue</label>' + ('<div class="slots-selector" ship-id="' + present_shipment + '" lock_slot_id="' + slot_lock[present_shipment - 1] + '" >') + default_delivery + '</div><div class="slots-screen"></div><div class="slots-layout">' + ('<div class="slots_' + present_shipment + '">') + ('<div class="slot-header-text">\n          <span> Select slot for Shipment ' + present_shipment + " of " + total_shipments + ' </span>\n          <div class="cancel-slot">x</div>\n        </div>') + '<div class="slot-day-text" ship-id="' + present_shipment + '">' + s + "</div>" + r + o + v + "</div></div></div></div>";
            c = c.concat(default_delivery + ","), localStorage.setItem("slotTime", c), $("." + t).find(".li-slots-render").html(g), $(".slot-day-time").hide(), $(".dates").on("click", function () {
                $(".dates").removeClass("active"), $(this).addClass("active"), $(".slot-day-time").hide();
                for (var e = $(this).attr("data-id"), t = document.querySelectorAll(".slot-day-time"), a = 0; a < t.length; a++)
                    if ("slot-day-time_" + e === t[a].id) {
                        $("#slot-day-time_" + e).show();
                        break
                    }
            }), $(".slot-time").find(".hide-dc").length === $(".slot-time").find("li").length ? ($(".dd-charge").css("display", "none"), $(".slot-time li").css("margin-bottom", "15px")) : ($(".dd-charge").css("display", "block"), $(".slot-time li").css("margin-bottom", "0px"))
        })
    },
    deleteShipmentItem: function () {
        $(".li-shipment-items").find(".delete-prod").on("click", function () {
            var e = "/checkout/shipment-item-delete",
                t = $(this);
            if (t.data("is_combo_child")) return void fn_cart.showRemovePopup(t, "shipment");
            var a = t.attr("data-prid"),
                o = t.attr("data-shipid");
            category = t.attr("data-category"), hub_id = t.attr("data-hubid"), prname = t.attr("data-sprname"), split = t.attr("data-is_split"), schedule_slot = $(".li-shipment.shipment-" + o).find(".slots-selector").text(), slot = $(".li-shipment.shipment-2").find(".slots-dropdown ").attr("data-slotselected"), is_split = localStorage.getItem("split");
            var s;
            "false" == slot ? slot = "EXPRESS" : slot = "SCHEDULED", s = "False" != is_split, fn.checkout_oos.ajaxForm({
                shipId: o,
                productId: a
            }, "POST", e).done(function (e) {
                var r = JSON.parse(e);
                if ("success" == r.status) {
                    var n = {
                        "Product Name": prname,
                        "Category Name": category,
                        "Shipment ID": Number(o),
                        "Product ID": a,
                        "City Name": localStorage.getItem("city_name"),
                        "Hub ID": Number(hub_id),
                        Slot: slot,
                        "Is Split Order": s,
                        "Scheduled Slot Selected": schedule_slot,
                        Checkout_Flow: checkout_flow()
                    };
                    fn_main.assignIncomingSource(n), 1 == t.data("is_combo") && ! function () {
                        n.is_combo = "1";
                        var e = $(".orange-alert-toast"),
                            a = t.data("combo_msgs") || {
                                alert_message: "Combo offer removed due to combo modification"
                            },
                            o = a.alert_message;
                        e.html('<div class="orange-toast">' + o + "</div>"), "none" == $(".dynamic-delivery-message").css("display") ? e.css("position", "inherit") : e.css("position", "absolute"), e.show(), setTimeout(function () {
                            e.hide()
                        }, 5e3), t.removeData("is_combo")
                    }(), fn_cart.gaAddRemoveEvent("Checkout_Slot_Remove", "Checkout_Slot", JSON.stringify(n)), n.Source = "Checkout_Slot", clevertap.event.push("Remove Items", n), t.parents(".li-shipment-items").find('[data-sprid="' + a + '"]').addClass("remove"), fn.checkout_oos.cartCount(), setTimeout(function () {
                        t.parents(".li-shipment-items").find('[data-sprid="' + a + '"]').removeClass("remove"), t.parents(".li-shipment-items").find('[data-sprid="' + a + '"]').remove(), fn_checkout.getShipments("remove")
                    }, 600)
                }
            })
        })
    },
    selectSlot: function (e, t) {
        $(".slots-dropdown").find("li").on("click", function (e) {
            var t = $(this);
            t.children("button").hasClass("n-a") || (e.stopImmediatePropagation(), $(".slots-dropdown").find("li button").removeClass("selected"), $(".slots-dropdown").find(".select-proceed").removeClass("disabled"), li = $(this), date = li.data("date"), ship_id = li.data("ship_id"), time = li.data("time"), li.find("button").addClass("selected"))
        }), $(".slots-dropdown").find(".select-proceed").on("click", function (t) {
            t.stopImmediatePropagation(), void 0 === li || li.hasClass("n-a") || (li.parents(".slots-layout").addClass("loader-div"), $(this).addClass("disabled"), fn_home.ajaxForm({
                date: date,
                slot: time,
                ship_id: ship_id
            }, "POST", "/checkout/select-slot").done(function (t) {
                var a = JSON.parse(t);
                if (200 === a.statusCode) {
                    var o = JSON.parse(localStorage.getItem("amount")),
                        s = JSON.parse(localStorage.getItem("count"));
                    localStorage.setItem("shipment_len", a.data.shipment_summary.length);
                    var r = Number(li.parent().parent().attr("ship-id")),
                        n = Number(li.parent().parent().attr("data-id"));
                    slot_lock[r - 1] = n, slot_lock_dates[r - 1] = time;
                    var i = a.data.messages.length > 0 ? a.data.messages[0].message : "";
                    fn_checkout.renderShipments(a.data.shipment_summary, i, "false", o, s), fn_checkout.showAlertMessages(a.data.shipment_alert_message), $(this).removeClass("disabled"), $(".slots-screen-bg").hide(), $(".pointer").removeClass("fade"), li.parents(".slots-dropdown").attr("data-slotselected", "true");
                    var l = {
                        "Default Slot": e.shipmentType,
                        "Split Slot": a.data.shipment_summary.length > 1,
                        "No of Split": Number(a.data.shipment_summary.length),
                        "Express Delivery Items": e.expressProductName,
                        "Scheduled Delivery Items": e.scheduledProductName,
                        "Scheduled Date": date,
                        "Shipment ID": ship_id,
                        Checkout_Flow: checkout_flow()
                    };
                    fn_main.assignIncomingSource(l), fn_cart.gaAddRemoveEvent("Checkout_changeSlot", "Checkout_Slot", JSON.stringify(l)), l.Source = "Checkout_Slot", clevertap.event.push("Changed Slot", l)
                } else 202 === a.statusCode && "empty_stock" == a.data.errorMessage ? (fn_checkout.getShipments("proceed-shipment"), Materialize.toast(a.data.message, 5e3), $(".slots-screen-bg").hide(), $(".pointer").removeClass("fade")) : 400 === a.statusCode ? ($(".slots-screen-bg").trigger("click"), Materialize.toast("Something went wrong, please try again", 5e3)) : (li.parents(".slots-dropdown").attr("data-slotselected", "true"), Materialize.toast(a.data.message, 5e3))
            }).always(function () {
                li.parents(".slots-layout").addClass("complete"), setTimeout(function () {
                    li.parents(".slots-layout").removeClass("loader-div complete")
                }, 1200)
            }))
        })
    },
    mergeShipments: function () {
        return fn_home.ajaxForm({}, "POST", "/checkout/merge-shipment")
    },
    resetShipment: function () {
        $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").on("click", function () {
            $(".co-ll-item").show(), $(".free-delivery-mssg").hide(), $(".li-checkout-nav-steps ul").removeClass("ul-wth-msg");
            var e = localStorage.getItem("coupon_used");
            if ("" == e || null == e) {
                clevertap.event.push("Edit Slots", {
                    ShipmentId_NewSlot: localStorage.getItem("shipmentid"),
                    Source: "Purchase"
                }), fn_cart.gaAddRemoveEvent("Purchase_EditSlot", "Purchase"), fn_checkout.setNavActive("redo-shipment"), fn_checkout.setPageActive("redo-shipment"), $(".li-bill-details").hide(), $(this).hide();
                var t = {
                    title: "Payment methods",
                    subtitle: ""
                };
                fn_checkout.setNavMessages(t, "cards"), fn_home.validateReferralMsg() && $(".checkout-referral-msg").show()
            } else fn_checkout.alertBox("Applied coupon will be removed, Wish to continue?", "", "confirm-shipment")
        })
    },
    pushEEProgressCheckout: function () {
        try {
            var e = function () {
                try {
                    var e = function () {
                        var e = JSON.parse(localStorage.getItem("cart")),
                            t = {};
                        try {
                            t = JSON.parse(localStorage.getItem("allitem"))
                        } catch (a) {}
                        var o = function (e) {
                                var t = e.string,
                                    a = e.split,
                                    o = e.initialValue;
                                return t.split(a).reduce(function (e, t) {
                                    return "" !== t.trim() ? (e.push(t.trim()), e) : e
                                }, o)
                            },
                            s = o({
                                string: e.ProductID,
                                split: ",",
                                initialValue: []
                            }),
                            r = o({
                                string: e.ProductName,
                                split: ",",
                                initialValue: []
                            }),
                            n = o({
                                string: t.category_id,
                                split: ",",
                                initialValue: []
                            }),
                            i = o({
                                string: t.base_price,
                                split: ",",
                                initialValue: []
                            }),
                            l = o({
                                string: t.quantity_avail,
                                split: ",",
                                initialValue: []
                            });
                        return {
                            v: s.reduce(function (e, t, a) {
                                return e.push({
                                    item_name: r[a],
                                    id: s[a],
                                    item_id: s[a],
                                    item_category: n[a],
                                    price: i[a],
                                    index: a,
                                    currency: "INR",
                                    quantity: Number(l[a])
                                }), e
                            }, [])
                        }
                    }();
                    if ("object" == typeof e) return e.v
                } catch (t) {
                    return []
                }
            };
            window.dataLayer && dataLayer.push({
                event: "checkout_progress",
                ecommerce: {
                    checkout: {
                        actionField: {
                            step: 2,
                            option: "slot"
                        },
                        products: e()
                    }
                }
            })
        } catch (t) {}
    },
    completeShipment: function (e, t, a, o, s) {
        return new Promise(function (e, t) {
            e(), $(".complete-shipments").on("click", function (e) {
                $(".co-ll-item").hide(), e.stopImmediatePropagation();
                var t = $(this);
                localStorage.removeItem("method"), $(".li-page-body.delivery-summary").addClass("loader-div"), t.addClass("disabled"), t.attr("disabled", !0);
                var r = !1;
                return $.each($(".slots-dropdown"), function (e, t) {
                    var a = $(t).data("slotselected");
                    return a ? (r = !0, void $(t).removeClass("error")) : (r = !1, void $(t).addClass("error"))
                }), localStorage.setItem("pay-later-scenario", !1), fn_checkout.pushEEProgressCheckout(), r ? void fn_checkout.mergeShipments().done(function (e) {
                    var r = JSON.parse(e);
                    if (200 === r.statusCode) {
                        $(".checkout-referral-msg").hide(), localStorage.setItem("product_quantity", a.quantity_avail);
                        var n, i, l, d;
                        $.map(r.data.order_charges, function (e) {
                            "subtotal" === e.key && (n = e.value), "deliverycharge" !== e.key && "delivery_charge" != e.key || (i = e.value), "total" === e.key.toLowerCase() && (l = e.value), "discount" === e.key && (d = e.value), "loyaltyitem" === e.key && localStorage.setItem("cartHasLoyalty", !0)
                        });
                        var c = {
                            total: l,
                            subtotal: n,
                            discount: d,
                            deliveryCharge: i
                        };
                        localStorage.setItem("amount", JSON.stringify(c)), null !== localStorage.getItem("cartHasLoyalty") && "true" == localStorage.getItem("cartHasLoyalty") && (fn_ll.loyalty_cart_value = n.toString(), fn_ll.loyalty_delivery_charges = i.toString());
                        var u = JSON.parse(localStorage.getItem("allitem")),
                            p = u.quantity_avail,
                            m = localStorage.getItem("split", "True");
                        m = "True" == m;
                        var h = {
                            "Cart Value": n,
                            "City Name": localStorage.getItem("city_name"),
                            "Hub ID": Number(localStorage.getItem("hub_id")),
                            "Product ID": u.productId,
                            "Product Name": u.productName,
                            "Category ID": u.category_id ? u.category_id : "",
                            "Saved Value": o.discount,
                            "Is Split order": m,
                            "No of Split": Number(localStorage.getItem("shipment_split")),
                            Defaultslot: s,
                            Checkout_Flow: checkout_flow()
                        };
                        fn_main.assignIncomingSource(h);
                        var f = {
                            CartValue: n,
                            ProductID: u.productId,
                            ProductName: u.productName,
                            SavedValue: o.discount,
                            Delivery: i,
                            Discount: d,
                            Total: l,
                            Checkout_Flow: checkout_flow()
                        };
                        fn_main.assignIncomingSource(f), localStorage.setItem("payment-delivery", JSON.stringify(f));
                        var v = JSON.parse(JSON.stringify(h));
                        "object" == typeof p.split(",") && (h.Quantity = p.split(",")), "string" == typeof p && (v.Quantity = p), fn_cart.gaAddRemoveEvent("Checkout_ProceedPayment", "Checkout_Slot", JSON.stringify(v)), v.Source = "Checkout_Slot", v["Category ID"] = JSON.parse(localStorage.getItem("allitem")).category_id, clevertap.event.push("Payment Initiated", v), fn_home.sendBranchCheckoutEvent("checkout_progress", branchEventData), localStorage.setItem("discount", o.discount), fn_checkout.setPageActive("shipment"), fn_checkout.setNavActive("shipment");
                        var g = {
                            title: "Delivery Summary <span class = 'edit-shipment'>Edit</span>",
                            subtitle: r.data.messages.message
                        };
                        fn_checkout.setNavMessages(g, "shipment"), $(".licious-wallet").find(".lic-btn").removeClass("checked"), fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"), fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"), $(".li-bill-details").show(), fn_checkout.renderBillDetails(r.data.order_charges), fn_checkout.resetShipment(), fn_checkout.payments.fetchPayments("payment"), t.removeClass("loading"), t.attr("disabled", !1)
                    } else Materialize.toast(r.data.message, 5e3), fn_cart.miniCart(), t.attr("disabled", !1)
                }).fail(function () {
                    t.attr("disabled", !1), t.removeClass("disabled")
                }).always(function () {
                    $(".li-page-body.delivery-summary").addClass("complete"), t.removeClass("disabled"), setTimeout(function () {
                        $(".li-page-body.delivery-summary").removeClass("complete loader-div")
                    }, 1200)
                }) : (t.attr("disabled", !1), $(".li-page-body.delivery-summary").addClass("complete"), void setTimeout(function () {
                    $(".li-page-body.delivery-summary").removeClass("complete loader-div")
                }, 1200))
            })
        })
    },
    renderBillDetails: function (e) {
        var t = $(".bill-breakup");
        t.html("");
        var a = '<p class = "c-a coupon-apply" style="margin: 0px;"><input type="text" style="font-size: 17px; color: #6d6e71; padding-left: 0px; height: 36px; width: 72%;" required class = "coupon-code" placeholder="Type your code here"><button class = "apply-coupon" disabled>Apply</button><button class = "clear-coupon-code">Remove</button></p>',
            o = '<p class = "c-a coupon-remove"><span><b></b><i>COUPON NAME</i></span>' + ('<button class = "remove-coupon" is-auto-ref="' + fn_home.validateReferralMsg() + '">') + "Remove</button></p>",
            s = '<p class = "c-a complimentary-prod"><span><img src = "https://d2407na1z3fc0t.cloudfront.net/products/pr_57ac8c42ee432/pr_img_59b8bb6407da8"/><i>COUPON NAME</i></span><button class = "remove-coupon">Remove</button></p>',
            r = '<div class = "coupon-div coupon-holder"> <div class="title">' + apply_coupon_title + "</div>" + a + o + s + '<div class="coupon-msg-success"></div><div class="coupon-error"></div></div>',
            n = 0,
            i = $(".payment-cta").find(".init-pay");
        $.each(e, function (e, t) {
            if ("total" === t.key.toLowerCase()) {
                n = t.value;
                var a = JSON.parse(localStorage.getItem("amount"));
                "CREATED_WITH_FAILURE" === localStorage.getItem("payment_info") && null !== a.total ? localStorage.setItem("payable", a.total) : localStorage.setItem("payable", n), i.find("i").html(parseFloat(n).toFixed(2))
            }
        });
        var l = "";
        $.map(e, function (e) {
            var a = e.attribute.toLowerCase().replace(/ /g, "-");
            if ("total" === e.key.toLowerCase()) l = '<li class="' + a + '">' + e.attribute + "<span>" + e.value + '</span>\n        <div class="message">' + e.message + "</div></li>";
            else {
                var o = '<li class="' + a + '">\n                            ' + e.attribute + "\n                            <span>" + ("discount" === e.key && e.value ? "-" + e.value : e.value) + '</span>\n                            <div class="message ' + ("discount" === e.key || ("deliverycharge" === e.key || "delivery_charge" == e.key) && 0 === e.value ? "positive" : "") + '">' + e.message + "</div>\n                          </li>";
                t.append(o)
            }
        }), t.append(l);
        t.find("li").length;
        $(".coupon-div").length && $(".coupon-div").remove(), $("div[class='licious-wallet']").before(r), $(".clear-coupon-code").click(function () {
            $(".coupon-code").val(""), $(".coupon-code").css("text-transform", "none"), $(".coupon-code").attr("placeholder", "Type your code here"), $(".clear-coupon-code").hide(), $(".coupon-code").css("width", "75%"), $(".coupon-code").css("pointer-events", "auto"), $(".li-bill-details").find(".coupon-error").hide(), $(".li-bill-details").find(".coupon-div").removeClass("coupon-invalid"), $(".li-bill-details").find(".c-a .apply-coupon").show()
        }), $(".coupon-code").focus(function () {
            $(this).attr("placeholder", ""), $(this).css("text-transform", "uppercase"), $(".coupon-holder").css("box-shadow", "0 2px 4px 0 rgba(0, 0, 0, 0.19)"), $(this).css("border-bottom", "solid 1px #6d6e71 !imporatant"), 0 === $(this).val().length && ($(".apply-coupon").attr("disabled", !0), $(".apply-coupon").css("border-color", "#cbcbcb"), $(".apply-coupon").css("color", "#cbcbcb"))
        }), $(".coupon-code").blur(function () {
            $(".coupon-holder").css("box-shadow", "none"), $(this).css("border-bottom", "solid 1px #cbcbcb"), 0 === $(this).val().length && ($(this).css("text-transform", "none"), $(this).attr("placeholder", "Type your code here"), $(".apply-coupon").attr("disabled", !0), $(".apply-coupon").css("border-color", "#d0021b"), $(".apply-coupon").css("color", "#d0021b"))
        }), $(".coupon-code").keyup(function () {
            0 === $(this).val().length ? ($(".apply-coupon").attr("disabled", !0), $(".apply-coupon").css("border-color", "#cbcbcb"), $(".apply-coupon").css("color", "#cbcbcb")) : ($(".apply-coupon").attr("disabled", !1), $(".apply-coupon").css("border-color", "#d0021b"), $(".apply-coupon").css("color", "#d0021b"))
        }), fn_checkout.applyCoupon()
    },
    updateBilling: function (e, t) {
        var a = $(".bill-breakup"),
            o = $(".payment-cta").find(".init-pay"),
            s = 0;
        s = $(".lp-ll-selling-price").length ? parseFloat(loyaltyPayableAmount) : parseFloat(localStorage.getItem("payable"));
        var r = 0;
        "li_minus" == t ? (r = parseFloat(s - e), a.find('[class="licious-wallet"]').find("span").html("-" + e), a.find('[class="total"]').find("span").html(r.toFixed(2)), o.find("i").html(parseFloat(r).toFixed(2)), localStorage.setItem("payable", r), loyaltyPayableAmount = r, 0 === r ? (o.html("Place Order"), localStorage.setItem("pay_source", "l_wallet")) : o.html("Pay <i class='rupee'>" + r.toFixed(2) + "</i>")) : "li_plus" == t ? (r = parseFloat(s + e), a.find('[class="licious-wallet"]').find("span").html(0), a.find('[class="total"]').find("span").html(r.toFixed(2)), o.find("i").html(r.toFixed(2)), localStorage.setItem("payable", r), loyaltyPayableAmount = r, 0 === r ? (o.html("Place Order"), localStorage.setItem("pay_source", "l_wallet")) : o.html("Pay <i class='rupee'>" + r.toFixed(2) + "</i>")) : (a.find('[class="subtotal"]').find("span").html(e.subtotal), a.find('[class="delivery-charge"]').find("span").html(e.delivery), a.find('[class="discount"]').find("span").html(e.discount), a.find('[class="licious-wallet"]').find("span").html(e.wallet), a.find('[class="packaging-charges"]').find("span").html(e.packagingcharges), a.find('[class="total"]').find("span").html(e.total), localStorage.setItem("payable", e.total), o.find("i").html(parseFloat(e.total).toFixed(2)));
        var n = (Number(localStorage.getItem("paytm_amt")), 0);
        n = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable")), 0 == n && $(".paytm-checkbox").hasClass("selected") && ($(".less-amt-err").removeClass("show"), $(".paytm-checkbox").removeClass("selected"))
    },
    resetLiciousWallet: function () {
        var e = localStorage.getItem("wallet_used"),
            t = 0;
        if (t = $(".lp-ll-selling-price").length ? parseFloat(loyaltyPayableAmount) : parseFloat(localStorage.getItem("payable")), 0 === t) {
            $(".licious-wallet").find(".lic-btn").removeClass("checked"), fn_checkout.updateBilling(e, "li_plus"), localStorage.setItem("wallet_used", 0);
            var a = localStorage.getItem("before_paylater"),
                o = Number(localStorage.getItem("max_cod_value")),
                s = 0;
            s = $(".lp-ll-selling-price").length ? parseFloat(loyaltyPayableAmount) : parseFloat(localStorage.getItem("payable")), "true" == a && s <= o && 0 === $(".lp-ll-selling-price").length && (fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"))
        }
    },
    applyCoupon: function () {
        localStorage.setItem("coupon_type", ""), localStorage.setItem("discount_coupon", "0"), $(".li-bill-details").find(".apply-coupon").on("click", function (e) {
            $(".apply-coupon").addClass("disabled"), fn_main.showloader();
            var t = $(".li-bill-details").find(".coupon-code").val(),
                a = $(".coupon-holder"),
                o = "/checkout/apply-coupon";
            fn.checkout_oos.ajaxForm({
                coupon: t,
                uid: fn_home.getDeviceFingerPrint()
            }, "POST", o).done(function (e) {
                var t = JSON.parse(e);
                if ("success" == t.status) {
                    $(".coupon-holder").addClass("coupon-applied"), $(".apply-ref-div").hide(), a.find(".title").html("Coupon code"), t.free_delivery && fn_checkout.alertBox(t.free_delivery_message, "", "free-delivery");
                    var o = 0,
                        s = 0,
                        r = 0,
                        n = 0,
                        i = 0,
                        l = !0,
                        d = !1,
                        c = void 0;
                    try {
                        for (var u, p = t.order_charges[Symbol.iterator](); !(l = (u = p.next()).done); l = !0) charge = u.value, "total" === charge.key.toLowerCase() ? o = charge.value : "subtotal" === charge.key ? s = charge.value : "discount" === charge.key ? r = -1 * charge.value : "deliverycharge" === charge.key || "delivery_charge" == charge.key ? n = charge.value : "packagingcharges" === charge.key && (i = charge.value)
                    } catch (m) {
                        d = !0, c = m
                    } finally {
                        try {
                            !l && p["return"] && p["return"]()
                        } finally {
                            if (d) throw c
                        }
                    }
                    var h = {
                        total: o,
                        subtotal: s,
                        discount: r,
                        deliveryCharge: n,
                        packagingcharges: i
                    };
                    localStorage.setItem("amount", JSON.stringify(h)), fn_ll.loyalty_cart_value = o.toString(), fn_ll.loyalty_delivery_charges = n.toString(), fn_paypal.updateUIviaPaypal(o);
                    var f = {};
                    Object.assign(f, {
                        subtotal: s,
                        total: o,
                        discount: r,
                        delivery: n,
                        packagingcharges: i,
                        wallet: 0
                    }), $(".licious-wallet").find(".lic-btn").removeClass("checked"), fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"), fn_checkout.updateBilling(f), $.map(t.order_charges, function (e) {
                        "Licious Wallet" == e.attribute && (wallet = e.value)
                    });
                    var v = {
                            TotalAmount: s,
                            CouponName: t.cart.coupon,
                            CouponType: t.cart.coupon_type,
                            Status: t.status,
                            Message: t.message,
                            Discount: t.cart.discount
                        },
                        g = {
                            "Total Amount": s,
                            "Coupon Name": t.cart.coupon,
                            "Coupon Type": t.cart.coupon_type,
                            Status: t.status,
                            Message: t.message,
                            "Hub ID": Number(localStorage.getItem("hub_id")),
                            "City Name": localStorage.getItem("city_name"),
                            Discount: t.cart.discount,
                            "Licious Wallet Amount": Number(localStorage.getItem("wallet_usedValue"))
                        };
                    localStorage.setItem("coupon", JSON.stringify(v)), $(".li-bill-details").find(".coupon-msg-success").html('<span class="round-tick-success"></span><div class="message-section"><div class="message">' + t.message + "</div></div>").show(), fn_cart.gaAddRemoveEvent("Purchase_CouponAdd", "Purchase", JSON.stringify(g)), g.Source = "Purchase", clevertap.event.push("Coupon Apply Success", g), localStorage.setItem("discount_coupon", t.cart.discount), localStorage.setItem("coupon_used", t.cart.coupon), localStorage.setItem("coupon_type", t.cart.coupon_type);
                    var _ = $(".coupon-code").val().toUpperCase();
                    switch ("REF" === t.cart.coupon && sessionStorage.setItem("auto_ref_code", _), t.cart.coupon_type) {
                        case "percentage":
                            a.find(".c-a").hide(), a.find(".coupon-remove").find("span i").html(_), a.find(".coupon-remove").show(), a.find(".coupon-success").show();
                            break;
                        case "flat":
                            a.find(".c-a").hide(), a.find(".coupon-remove").find("span i").html(_), a.find(".coupon-remove").show(), a.find(".coupon-success").show();
                            break;
                        case "cashback":
                            a.find(".c-a").hide(), a.find(".coupon-remove").find("span i").html(_), a.find(".coupon-remove").show(), a.find(".coupon-success").show();
                            break;
                        case "delivery":
                            a.find(".c-a").hide(), a.find(".coupon-remove").find("span i").html(_), a.find(".coupon-remove").show(), a.find(".coupon-success").show();
                            break;
                        case "complementry":
                            a.find(".c-a").hide(), a.find(".coupon-remove").find("span i").html(_), $(".li-bill-details").find(".coupon-msg-success").find(".message-section").append('<div class="complementary-msg">' + (t.cart.complementary_product_message || "") + "</div>");
                            var y = !1,
                                b = !0,
                                k = !1,
                                C = void 0;
                            try {
                                for (var w, S = t.cart.shipments[Symbol.iterator](); !(b = (w = S.next()).done) && (shipment = w.value, !y); b = !0) {
                                    var I = !0,
                                        P = !1,
                                        x = void 0;
                                    try {
                                        for (var O, A = shipment.products[Symbol.iterator](); !(I = (O = A.next()).done); I = !0)
                                            if (prod = O.value, prod.product_type && "COMP" == prod.product_type.toUpperCase()) {
                                                var T = '<div class="contents">\n                                            <img class="product-image" src=' + prod.image + ' />\n                                            <div class="product-contents">\n                                              <div class="product-name">' + prod.product_name + '</div>\n                                              <div class="bottom-contents">\n                                                <div class="weight">' + prod.weight + '</div>\n                                                <div class="free-text">Free</div>\n                                                <div class="qty-text">' + prod.quantity + "</div>\n                                              </div>\n                                            </div>\n                                          </div>";
                                                $(".li-bill-details").find(".coupon-msg-success").after('<div class="complementary-product-card">' + T + "</div>"), $(".complementary-msg").hide(), setTimeout(function () {
                                                    $(".li-bill-details").find(".complementary-product-card").remove(), $(".complementary-msg").show()
                                                }, 5e3), y = !0;
                                                break
                                            }
                                    } catch (m) {
                                        P = !0, x = m
                                    } finally {
                                        try {
                                            !I && A["return"] && A["return"]()
                                        } finally {
                                            if (P) throw x
                                        }
                                    }
                                }
                            } catch (m) {
                                k = !0, C = m
                            } finally {
                                try {
                                    !b && S["return"] && S["return"]()
                                } finally {
                                    if (k) throw C
                                }
                            }
                            a.find(".coupon-remove").show(), a.find(".coupon-success").show()
                    }
                    fn_checkout.payments.fetchWallet()
                } else fn_main.hideloader(), localStorage.setItem("coupon_used", ""), localStorage.setItem("coupon_type", ""), fn_checkout.showCouponError(t.message, t, v);
                $(".apply-coupon").removeClass("disabled")
            }).fail(function () {
                fn_main.hideloader()
            }).always(function () {
                $(".coupon-holder").addClass("complete")
            }), fn_checkout.removeCoupon()
        }), "true" === $(".remove-coupon").attr("is-auto-ref") && ($(".coupon-code").val("" + sessionStorage.getItem("auto_ref_code")), $(".apply-coupon").attr("disabled", !1), $(".apply-coupon").css("color", "#d0021b"), $(".apply-coupon").trigger("click"))
    },
    removeCouponClick: function (e) {
        fn_main.showloader(), $(".li-alert-screen").removeClass("show");
        var t = "/checkout/remove-coupon";
        fn_home.ajaxForm({}, "POST", t).done(function (t) {
            var a = JSON.parse(t),
                o = $(".coupon-holder");
            if ("success" === a.status) {
                var s = 0,
                    r = 0,
                    n = 0,
                    i = 0,
                    l = 0,
                    d = !0,
                    c = !1,
                    u = void 0;
                try {
                    for (var p, m = a.order_charges[Symbol.iterator](); !(d = (p = m.next()).done); d = !0) charge = p.value, "total" === charge.key.toLowerCase() ? s = charge.value : "subtotal" === charge.key ? r = charge.value : "discount" === charge.key ? n = -1 * charge.value : "deliverycharge" === charge.key || "delivery_charge" === charge.key ? i = charge.value : "packagingcharges" === charge.key && (l = charge.value)
                } catch (h) {
                    c = !0, u = h
                } finally {
                    try {
                        !d && m["return"] && m["return"]()
                    } finally {
                        if (c) throw u
                    }
                }
                var f = {
                    total: s,
                    subtotal: r,
                    discount: n,
                    deliveryCharge: i,
                    packagingcharges: l
                };
                localStorage.setItem("amount", JSON.stringify(f)), fn_ll.loyalty_cart_value = s.toString(), fn_ll.loyalty_delivery_charges = i.toString(), fn_paypal.updateUIviaPaypal(s);
                var v = {};
                if (localStorage.setItem("discount_coupon", "0"), $(".li-bill-details").find(".coupon-msg-success").html("").hide(), "true" === $(".remove-coupon").attr("is-auto-ref") && ($(".loc-screen").addClass("hide"), $(".apply-ref-div").show()), $(".coupon-holder").removeClass("coupon-applied"), $(".coupon-holder").find(".title").html(apply_coupon_title), "remove" == e) {
                    var g = {
                        "Coupon Name": localStorage.getItem("coupon_used"),
                        "Coupon Type": localStorage.getItem("coupon_type"),
                        Status: a.status,
                        Message: a.message,
                        "Hub ID": Number(localStorage.getItem("hub_id")),
                        "City ID": Number(localStorage.getItem("city_id")),
                        Discount: n,
                        "Licious Wallet Amount": Number(localStorage.getItem("balance"))
                    };
                    fn_cart.gaAddRemoveEvent("Purchase_CouponRemove", "Purchase", JSON.stringify(g)), g.Source = "Purchase", clevertap.event.push("Coupon Remove Success", g)
                }
                if ("free_remove" == e) {
                    var g = {
                        "Coupon Name": localStorage.getItem("coupon_used"),
                        "Coupon Type": localStorage.getItem("coupon_type"),
                        Status: a.status,
                        Message: a.message,
                        "Hub ID": Number(localStorage.getItem("hub_id")),
                        "City ID": Number(localStorage.getItem("city_id")),
                        Discount: n,
                        "Licious Wallet Amount": Number(localStorage.getItem("balance"))
                    };
                    fn_cart.gaAddRemoveEvent("FreeDel_Coupon_Remove", "Purchase", JSON.stringify(g)), g.Source = "Purchase", clevertap.event.push("FreeDel_Coupon_Remove", g)
                }
                localStorage.setItem("coupon_used", ""), localStorage.setItem("coupon_type", ""), o.find(".c-a").hide(), o.find(".coupon-apply").show(), Object.assign(v, {
                    subtotal: r,
                    total: s,
                    discount: n,
                    delivery: i,
                    packagingcharges: l,
                    wallet: 0
                }), fn_checkout.updateBilling(v), $(".licious-wallet").find(".lic-btn").removeClass("checked"), fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"), fn_checkout.payments.fetchWallet(), localStorage.setItem("coupon_used", "")
            } else "clearing" === e ? fn_checkout.payments.fetchWallet() : fn_main.hideloader()
        }).fail(function () {
            "clearing" === e ? fn_checkout.payments.fetchWallet() : fn_main.hideloader()
        }).always(function () {
            $(".remove-coupon").removeClass("disabled")
        })
    },
    removeCoupon: function () {
        $(".li-bill-details").find(".remove-coupon").on("click", function (e) {
            e.stopImmediatePropagation(), $(".remove-coupon").addClass("disabled"), $(".coupon-remove").find("i").html() === sessionStorage.getItem("auto_ref_code") ? ($(".remove-referral-pop-up").show(), $(".loc-screen").removeClass("hide"), $(".loc-screen").addClass("show")) : fn_checkout.removeCouponClick("remove")
        })
    },
    showCouponError: function (e, t, a) {
        $(".coupon-code").css("pointer-events", "none"), $(".apply-ref-div").hide(), $(".li-bill-details").find(".coupon-error").html('<img src="/img/circularAlert.png" class="error-alert"><div class="message">' + e + "</div>").css("display", "flex"), $(".li-bill-details").find(".coupon-div").addClass("coupon-invalid"), $(".li-bill-details").find(".c-a .apply-coupon").hide(), $(".clear-coupon-code").show(), $(".coupon-code").css("width", "72%");
        var o = {
            "Total Amount": Number(localStorage.getItem("payable")),
            "Coupon Name": a,
            "Coupon Type": "",
            Status: t.status,
            Message: e,
            "Hub Id": Number(localStorage.getItem("hub_id")),
            "City ID": Number(localStorage.getItem("city_id")),
            "Licious Wallet Amount": Number(localStorage.getItem("wallet_usedValue")),
            Discount: 0
        };
        fn_cart.gaAddRemoveEvent("Purchase_CouponFail", "Purchase", JSON.stringify(o)), o.Source = "Purchase", clevertap.event.push("Coupon Apply Fail", o)
    },
    setpage: function (e) {
        var t = location.hash;
        t = t.replace(/[#_=]/gi, "");
        var a = window.location.href;
        "" == t && "/" !== window.location.href ? window.location.href = a + "#order-summary" : (a = a.replace(location.hash, ""), window.location.href = a + "#" + e)
    },
    setpage: function (e) {
        var t = location.hash;
        t = t.replace(/[#_=]/gi, "");
        var a = window.location.href;
        "" == t ? window.location.href = a + "#order-summary" : (a = a.replace(location.hash, ""), window.location.href = a + "#" + e)
    },
    paytm: {
        getOtp: function () {
            var e = $(".payment-paytm");
            e.find(".paytm-getOTP").on("click", function (t) {
                var a = e.find(".paytm-mobile").val();
                fn_home.ajaxForm({
                    mobile: a
                }, "POST", "/paytm/get-otp").done(function (e) {
                    var t = JSON.parse(e);
                    "SUCCESS" === t.status ? (localStorage.setItem("state_value", t.state), alert(t.message)) : alert(t.message)
                })
            })
        },
        verifyToken: function () {
            fn_home.ajaxForm({
                sso: localStorage.getItem("sso")
            }, "POST", "/paytm/verify-token").done(function (e) {
                JSON.parse(e);
                fn_checkout.paytm.walletBalance()
            })
        },
        walletBalance: function () {
            fn_home.ajaxForm({
                sso: localStorage.getItem("sso")
            }, "POST", "/paytm/get-balance").done(function (e) {
                JSON.parse(e)
            })
        },
        addMoney: function (e, t) {
            fn_home.ajaxForm({
                sso: localStorage.getItem("sso"),
                amt: e,
                csum: t
            }, "POST", "/paytm/add-money").done(function (e) {})
        },
        addMoneyCTA: function () {
            $(".add-money").on("click", function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
                null !== e && "" !== e ? fn_checkout.paytm.generateChecksum("ADDMONEY", 200, null, e) : fn_checkout.paytm.generateChecksum("ADDMONEY", 200)
            })
        }
    },
    razorPay: "",
    payments: {
        paytmStatus: function () {
            fn_home.ajaxForm({}, "GET", "/paytm/get-paytm-status").done(function (e) {
                var t = JSON.parse(e);
                200 == t.statusCode && (1 == t.data.verified ? ($(".before-login").hide(), $(".after-login").hide(), fn_checkout.payments.getPaytmOtp()) : ($(".before-login").show(), $(".paytm-checkbox").addClass("disabled"), $(".payment-paytm .paytm-link-button").addClass("show")))
            }), $(".payment-paytm .paytm-link-button").on("click", function (e) {
                e.stopImmediatePropagation(), $(".payment-paytm .paytm-link-button").removeClass("show"), fn_checkout.payments.getPaytmOtp()
            })
        },
        resendPaytmOtp: function () {
            $(".resendpaytm-otp").on("click", function (e) {
                e.stopImmediatePropagation(), fn_checkout.payments.getPaytmOtp()
            })
        },
        getPaytmOtp: function () {
            $(".paytm-inline-loader").show(), $(".paytm-refresh-loader").hide(), $(".payment-paytm .paytm-link-button").removeClass("show"), fn_home.ajaxForm({}, "POST", "/paytm/get-paytm-otp").done(function (e) {
                var t = JSON.parse(e);
                "success" == t.status ? (localStorage.setItem("paytm_amt", Number(t.balance)), $(".paytm-checkbox").removeClass("disabled"), $(".paytm-login .paytm-verify-otp").hide(), t.food_balance > 0 ? $(".after-login").show() : $(".after-login").hide(), localStorage.setItem("paytm_amt", t.balance), $(".paytm-checkbox .amount-paytm").html("&#8377; " + t.balance)) : "error" == t.status ? ($(".before-login").hide(), $(".after-login").hide(), $(".payment-paytm .paytm-link-button").addClass("show"), $(".paytm-login .paytm-verify-otp").hide(), $(".paytm-checkbox").addClass("disabled")) : ($(".before-login").show(), $(".paytm-checkbox").removeClass("disabled"), $(".paytm-login .paytm-verify-otp").show(), fn_checkout.payments.verifyOtpPaytm())
            }).fail(function (e) {
                $(".paytm-refresh-loader").show()
            }).always(function () {
                $(".paytm-inline-loader").hide()
            })
        },
        choosePaytm: function () {
            $(".paytm-checkbox").on("click", function (e) {
                if (!$(this).hasClass("disabled")) {
                    $(this).addClass("selected");
                    var t = Number(localStorage.getItem("paytm_amt")),
                        a = 0;
                    a = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable")), $(this).addClass("selected"), t < a ? $(".less-amt-err").addClass("show") : $(".less-amt-err").removeClass("show"), fn_checkout.resetLiciousWallet()
                }
            })
        },
        verifyOtpPaytm: function () {
            $(".error-paytm-otp").html(""), $(".before-login").hide(), $(".after-login").hide(), $(".paytm-checkbox").addClass("disabled"), $(".paytm-verify-otp .paytm-verifyOTP").on("click", function (e) {
                e.stopImmediatePropagation();
                var t = $(".paytm-otp").val();
                0 == t.length ? $(".error-paytm-otp").html("Please enter valid otp") : fn_home.ajaxForm({
                    otp: t,
                    phone: localStorage.getItem("user_contact")
                }, "POST", "/paytm/paytm-verify-otp").done(function (e) {
                    var t = JSON.parse(e);
                    if ("success" == t.status) {
                        $(".paytm-checkbox").removeClass("disabled"), $(".paytm-login .paytm-verify-otp").hide(), t.food_balance > 0 ? $(".after-login").show() : $(".after-login").hide();
                        var a = Number(localStorage.getItem("paytm_amt")),
                            o = 0;
                        o = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable")), $(".paytm-checkbox").addClass("selected"), a < o ? $(".less-amt-err").addClass("show") : $(".less-amt-err").removeClass("show"), localStorage.setItem("paytm_amt", t.balance), $(".paytm-checkbox .amount-paytm").html("&#8377; " + t.balance),
                            ga("send", {
                                hitType: "event",
                                eventCategory: "Purchase",
                                eventAction: "Paytm_Verify",
                                eventLabel: ""
                            }), clevertap.event.push("Paytm_Verify", {
                                Source: "Purchase"
                            })
                    } else $(".before-login").show(), $(".error-paytm-otp").html(t.message), localStorage.setItem("paytm_access_token", "")
                })
            })
        },
        upiTimer: function (e, t) {
            function a() {
                s = parseInt(n / 60, 10), r = parseInt(n % 60, 10), s = s < 10 ? "0" + s : s, r = r < 10 ? "0" + r : r, --n < 0 ? (o(), t.html("00:00"), $(".upi-loader").css("animation", "none"), fn_checkout.razorPay.emit("payment.cancel")) : t.html(s + ":" + r)
            }

            function o() {
                clearInterval(fn_checkout.initTimer)
            }
            clearInterval(fn_checkout.initTimer);
            var s, r, n = e;
            fn_checkout.initTimer = setInterval(a, 1e3), $(".confirm").on("click", function () {
                o(), fn_checkout.razorPay.emit("payment.cancel"), $(".upi-loader-container").removeClass("show"), $(".li-checkout-container").show(), $(".li-alert-screen").removeClass("show")
            })
        },
        selectUpiPayment: function () {
            $(document).on("click", ".upi-list-wrapper .upi-card", function (e) {
                if ($(".vpa-section").removeClass("show"), $(".vpa-section input").val(""), $(".upi-list-wrapper .upi-card").removeClass("selected"), $(".upi-list-wrapper .upi-card .button-check").removeClass("show"), "true" == $(this).attr("data-enabled")) {
                    $(this).addClass("selected"), $(this).find(".button-check").addClass("show"), $(".vpa-section").addClass("show");
                    var t = $(this).find("img").attr("src");
                    $(".upi-card.selected").attr("data-display");
                    $(".upi-type-image img").attr("src", t), fn_checkout.resetLiciousWallet()
                }
            })
        },
        cancelUPI: function () {
            $(".upi-loader-header .close-upi").on("click", function (e) {
                e.stopImmediatePropagation(), fn_checkout.alertBox("Going back will exit the payment process", "", "alert-upi")
            }), history.pushState(null, null, location.href), window.onpopstate = function () {
                $(".upi-loader-container").hasClass("show") && (history.go(1), fn_checkout.alertBox("Going back will exit the payment process", "", "alert-upi"))
            }, $(window).on("hashchange", function (e) {
                $(".upi-loader-container").hasClass("show") && fn_checkout.alertBox("Going back will exit the payment process", "", "alert-upi")
            })
        },
        fetchPayments: function (e, t) {
            fn_home.ajaxForm({}, "GET", "/checkout/get-user-data").done(function (e) {
                var t = JSON.parse(e);
                localStorage.setItem("user_contact", t.user_phone);
                var a = localStorage.getItem("profile_complete");
                if ("" == a || void 0 == a) {
                    var o = {
                        name: t.user_name,
                        email: t.user_email
                    };
                    localStorage.setItem("profile_complete", JSON.stringify(o))
                } else {
                    var s = JSON.parse(localStorage.getItem("profile_complete"));
                    if (null == s) {
                        var o = {
                            name: t.user_name,
                            email: t.user_email
                        };
                        localStorage.setItem("profile_complete", JSON.stringify(o))
                    } else s.name = t.user_name, s.email = t.user_email, localStorage.setItem("profile_complete", JSON.stringify(s))
                }
            }), $(".init-pay").addClass("disabled"), $(".free-delivery-mssg").hide(), $(".li-checkout-nav-steps ul").removeClass("ul-wth-msg");
            var a = window.location.href,
                o = void 0,
                s = {};
            if (a.includes("order-status") && (o = "true" == localStorage.getItem("is_shipment") ? "shipment" : "parent", s = {
                    type: o,
                    order_id: t
                }), "loyalty-payment" === e && (s = {
                    type: "loyalty"
                }), fn_home.ajaxForm(s, "POST", "/checkout/get-payments-free-delivery").done(function (a) {
                    var o = JSON.parse(a),
                        s = Number(o.data.max_cod_order_value),
                        r = fn_ll.getterLS("count");
                    Number(r) > 0 && ($(".new-cart-count").find("i").html(r), $(".new-cart-count").addClass("loaded"));
                    var n = void 0;
                    n = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable"));
                    var i = $(".li-payments"),
                        l = i.find(".payment-options-list ul");
                    if (200 === o.statusCode) {
                        localStorage.setItem("max_cod_value", o.data.max_cod_order_value), o.data.contactless_delivery && o.data.contactless_delivery.enable && fn_checkout.payments.renderContactLessDelivery(o.data.contactless_delivery), o.data.messages && o.data.messages.length && $.map(o.data.messages, function (t) {
                            if (t && "below_limit" == t.whichEvent) {
                                var a = '<div class="free-delivery-text">' + t.message + "</div>";
                                $(".free-delivery-mssg").html(a), $(".free-delivery-mssg").show(), $(".li-checkout-nav-steps ul").addClass("ul-wth-msg");
                                var o = JSON.parse(localStorage.getItem("payment-delivery")),
                                    s = JSON.parse(localStorage.getItem("product"));
                                if ("loyalty-payment" !== e) {
                                    var r = {
                                        "Product Name": o.ProductName,
                                        Quantity: s.quantity,
                                        "Cart Value": o.CartValue,
                                        "Delivery Charge": o.Delivery,
                                        "Saved Amount": o.SavedValue,
                                        "City Name": localStorage.getItem("city_name"),
                                        "Hub ID": Number(localStorage.getItem("hub_id"))
                                    };
                                    fn_cart.gaAddRemoveEvent("Purchase_FreeDel_Remove", "Purchase", JSON.stringify(r)), r.Source = "Purchase", clevertap.event.push("Purchase_FreeDel_Remove", r)
                                }
                            }
                        }), $(".payment-options-holder").find(".pay-method").hide(), l.html(""), l.append('<li class="" data-payname="saved_payments">Saved Payments</li>'), $.map(o.data.payments, function (a) {
                            var o = a.enabled ? "enabled" : "disabled",
                                r = a.method ? a.method : a.group_name;
                            if ("cod" === a.group_name ? fn_checkout.isCODEnabled = a.enabled : "pod" === a.group_name && (fn_checkout.isPODEnabled = a.enabled), "preferred_payments" !== r && "liciouswallet" != r && "simpl" != r) {
                                var i = '<li class="' + o + '" data-payname="' + r + '">' + a.display_name + '<span class = "disabled-msg">' + a.meta.disable_message + "</span></li>";
                                switch (l.append(i), a.group_name) {
                                    case "paypal":
                                        var d = !1;
                                        $.map(a.payment_methods, function (e) {
                                            e.isBAPresent && e.enabled && (d = !0), e.isBAPresent && "paypal_auto_pay" == e.payment_code ? localStorage.setItem("is_ba_present", !0) : e.isBAPresent || "paypal_auto_pay" != e.payment_code || localStorage.setItem("is_ba_present", !1);
                                            var t = e.payment_code,
                                                a = $("<li></li>").html(e.display_name).attr("data-paymentCode", t).attr("id", t),
                                                o = e.isSelected ? "selected" : "",
                                                s = e.enabled ? "enabled" : "disabled",
                                                r = a.addClass("paypal-payment-options " + o + " " + s);
                                            "enabled" == s ? r.css("opacity", "1") : r.css("opacity", "0.4"), "paypal_auto_pay" == t && $("#paypal_auto_pay").remove(), "paypal_one_time_pay" == t && $("#paypal_one_time_pay").remove(), $("#paypal-payment-types").append(a), e.isBAPresent && e.paypal_email && a.append('<div style="font-size: 10px;color: #000000;">Account: <b>' + e.paypal_email + "</b></div>"), a.append('<div style="color: green;font-size: 10px;">' + e.meta.promo_msg + "</div>"), d && $("#paypal_one_time_pay").css("display", "none")
                                        });
                                        break;
                                    case "razorpay_wallets":
                                        $(".pay-method.other-wallets .li-page-title").html(a.display_name), $(".payment-options-list ul .licious-other-wallets").html(a.display_name), fn_checkout.payments.renderWallets(a.payment_methods, a.method);
                                        break;
                                    case "razorpay_netbanking":
                                        $(".payment-options-list ul .licious-net-banking").html(a.display_name), fn_checkout.payments.renderBanks(a, a.method);
                                        break;
                                    case "cod":
                                        $(".pay-method.cod .li-page-title").html(a.display_name), $(".payment-options-list ul .licious-cod").html(a.display_name), n > s && ($(".payment-options-list").find('[data-payname="cod"]').addClass("disabled"), fn_checkout.isCODEnabled = !1);
                                        break;
                                    case "pod":
                                        $(".pay-method.pod .li-page-title").html(a.display_name), $(".payment-options-list ul .licious-pod").html(a.display_name), n > s && ($(".payment-options-list").find('[data-payname="pod"]').addClass("disabled"), fn_checkout.isPODEnabled = !1);
                                        break;
                                    case "razorpay_cards":
                                        $(".payment-options-list ul .licious-payment-card").html(a.display_name);
                                        break;
                                    case "razorpay_upi":
                                        $(".pay-method.upi .upi-title").html(a.display_name), $(".upi-list-wrapper").html(""), $.map(a.payment_methods, function (e, t) {
                                            var a = '<button class="upi-card ' + e.payment_code + '" data-display="' + e.display_name + '" data-method="upi" data-methodname="upi" data-paysource="' + e.payment_code + '" data-index="' + t + '" data-enabled="' + (1 == e.enabled ? "true" : "false") + '"><div class="upi-image ' + ("" == e.meta.promo_msg && "" == e.meta.disable_message ? "center-fit" : "") + '"><img src="' + e.meta.icon_url + '" class="' + (0 == e.enabled ? "disable-img" : "") + '"></div><p class="upi-offer">' + (1 == e.enabled ? e.meta.promo_msg : "") + '</p><p class="dis-msg">' + (0 == e.enabled ? e.meta.disable_message : "") + '</p><div class="button-check"></div></button>';
                                            $(".upi-list-wrapper").append(a)
                                        }), fn_checkout.payments.selectUpiPayment(), fn_checkout.payments.cancelUPI();
                                        break;
                                    case "paytm":
                                        $(".payment-paytm ul li .paytm-img").attr("src", a.meta.icon_url), $(".payment-options-list ul .licious-payment-paytm").html(a.display_name), $(".li-page-title-paytm").html(a.display_name), $(".payment-paytm ul li .paytm-contact").html(localStorage.getItem("user_contact")), fn_checkout.payments.paytmStatus(), fn_checkout.payments.choosePaytm(), fn_checkout.payments.resendPaytmOtp(), "loyalty-payment" === e ? fn_checkout.payments.initPaytmLoadMoney(t) : fn_checkout.payments.initPaytmLoadMoney()
                                }
                            }
                        });
                        var d = localStorage.getItem("before_paylater");
                        "track-page" == e && null != d && "false" == d && (l.find('[data-payname="pod"]').addClass("disabled"), l.find('[data-payname="cod"]').addClass("disabled"), fn_checkout.isCODEnabled = !1, fn_checkout.isPODEnabled = !1), fn_checkout.payments.fetchSavedCards()
                    }
                    fn_checkout.payments.tabs(e)
                }), fn_checkout.payments.initPay(e), "track-page" == e) {
                var r = "true" === localStorage.getItem("is_shipment");
                fn_checkout.payments.fetchWalletNew(t, r)
            } else "loyalty-payment" === e ? (fn_main.showloader(), $(".licious-wallet").find(".lic-btn").removeClass("checked"), fn_checkout.payments.fetchWallet(null, !0)) : fn_checkout.removeCouponClick("clearing");
            $(".payment-paytm .paytm-link-button").on("click", function (e) {
                e.stopImmediatePropagation(), fn_checkout.payments.getPaytmOtp()
            })
        },
        renderContactLessDelivery: function (e) {
            var t = $(".cld-placeholder"),
                a = '<div class="cld-div ' + (e.is_mandatory ? "disabled" : "") + '">\n                      <div class="cld-left">\n                        <div class="cld-checkbox-div ' + (e.is_mandatory || e.is_selected ? "checked" : "") + '">\n                          <img class="cld-checkbox-checked" src="/img/red_checked.svg"/>\n                          <input type="checkbox" class="cld-checkbox"\n                          ' + (e.is_mandatory || e.is_selected ? "checked" : "") + '/>\n                        </div>\n                        <div class="cld-info">\n                            <div class="cld-heading">' + e.title + '</div>\n                            <div class="cld-content">' + e.description + "</div>\n                        </div>\n                      </div>\n                      " + (e.deep_link ? '\n                        <a href="' + e.deep_link + '" target="_blank">Details</a>' : "") + "\n                    </div>";
            $(".slot-payment-flow").addClass("cld"), $(".shipment.complete").addClass("cld"), $(".li-checkout-page.payment .pointer").addClass("cld"), t.html(a), $(".cld-div").click(function (e) {
                "A" !== e.target.nodeName && "cld-div disabled" !== $(".cld-div").prop("class") && (fn_main.showloader(), fn_home.ajaxForm({
                    selected: !$(".cld-checkbox").prop("checked")
                }, "PUT", "/checkout/contactless-delivery-update").done(function (e) {
                    var t = JSON.parse(e);
                    200 === t.statusCode && "success" === t.statusMessage ? ($(".cld-checkbox").prop("checked", !$(".cld-checkbox").prop("checked")), $(".cld-checkbox-div").toggleClass("checked"), $(".licious-wallet").find(".lic-btn").removeClass("checked"), fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"), fn_checkout.payments.fetchWallet()) : Materialize.toast("Something went wrong! Please try again.", 3e3)
                }).fail(function () {
                    fn_main.hideloader(), Materialize.toast("Something went wrong! Please try again.", 3e3)
                }))
            })
        },
        selectUpiPayment: function () {
            $(document).on("click", ".upi-list-wrapper .upi-card", function (e) {
                if ($(".vpa-section").removeClass("show"), $(".vpa-section input").val(""), $(".upi-list-wrapper .upi-card").removeClass("selected"), $(".upi-list-wrapper .upi-card .button-check").removeClass("show"), "true" == $(this).attr("data-enabled")) {
                    $(this).addClass("selected"), $(this).find(".button-check").addClass("show"), $(".vpa-section").addClass("show");
                    var t = $(this).find("img").attr("src");
                    $(".upi-card.selected").attr("data-display");
                    $(".upi-type-image img").attr("src", t)
                }
            })
        },
        cancelUPI: function () {
            $(".upi-loader-header .close-upi").on("click", function (e) {
                e.stopImmediatePropagation(), fn_checkout.alertBox("Going back will exit the payment process", "", "alert-upi")
            }), history.pushState(null, null, location.href), window.onpopstate = function () {
                $(".upi-loader-container").hasClass("show") && (history.go(1), fn_checkout.alertBox("Going back will exit the payment process", "", "alert-upi"))
            }, $(window).on("hashchange", function (e) {
                $(".upi-loader-container").hasClass("show") && fn_checkout.alertBox("Going back will exit the payment process", "", "alert-upi")
            })
        },
        paytmStatus: function () {
            fn_home.ajaxForm({}, "GET", "/paytm/get-paytm-status").done(function (e) {
                var t = JSON.parse(e);
                200 == t.statusCode && (1 == t.data.verified ? ($(".before-login").hide(), $(".after-login").hide(), fn_checkout.payments.getPaytmOtp()) : ($(".before-login").show(), $(".paytm-checkbox").addClass("disabled"), $(".payment-paytm .paytm-link-button").addClass("show")))
            }), $(".payment-paytm .paytm-link-button").on("click", function (e) {
                e.stopImmediatePropagation(), $(".payment-paytm .paytm-link-button").removeClass("show"), fn_checkout.payments.getPaytmOtp()
            })
        },
        resendPaytmOtp: function () {
            $(".resendpaytm-otp").on("click", function (e) {
                e.stopImmediatePropagation(), fn_checkout.payments.getPaytmOtp()
            })
        },
        getPaytmOtp: function () {
            $(".paytm-inline-loader").show(), $(".paytm-refresh-loader").hide(), $(".payment-paytm .paytm-link-button").removeClass("show"), fn_home.ajaxForm({}, "POST", "/paytm/get-paytm-otp").done(function (e) {
                var t = JSON.parse(e);
                "success" == t.status ? (localStorage.setItem("paytm_amt", Number(t.balance)), $(".paytm-checkbox").removeClass("disabled"), $(".paytm-login .paytm-verify-otp").hide(), t.food_balance > 0 ? $(".after-login").show() : $(".after-login").hide(), localStorage.setItem("paytm_amt", t.balance), $(".paytm-checkbox .amount-paytm").html("&#8377; " + t.balance)) : "error" == t.status ? ($(".before-login").hide(), $(".after-login").hide(), $(".payment-paytm .paytm-link-button").addClass("show"), $(".paytm-login .paytm-verify-otp").hide(), $(".paytm-checkbox").addClass("disabled")) : ($(".before-login").show(), $(".paytm-checkbox").removeClass("disabled"), $(".paytm-login .paytm-verify-otp").show(), fn_checkout.payments.verifyOtpPaytm())
            }).fail(function (e) {
                $(".paytm-refresh-loader").show()
            }).always(function () {
                $(".paytm-inline-loader").hide()
            })
        },
        choosePaytm: function () {
            $(".paytm-checkbox").on("click", function (e) {
                if (!$(this).hasClass("disabled")) {
                    $(this).addClass("selected");
                    var t = Number(localStorage.getItem("paytm_amt")),
                        a = 0;
                    a = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable")), $(this).addClass("selected"), t < a ? $(".less-amt-err").addClass("show") : $(".less-amt-err").removeClass("show")
                }
            })
        },
        verifyOtpPaytm: function () {
            $(".error-paytm-otp").html(""), $(".before-login").hide(), $(".after-login").hide(), $(".paytm-checkbox").addClass("disabled"), $(".paytm-verify-otp .paytm-verifyOTP").on("click", function (e) {
                e.stopImmediatePropagation();
                var t = $(".paytm-otp").val();
                0 == t.length ? $(".error-paytm-otp").html("Please enter valid otp") : fn_home.ajaxForm({
                    otp: t,
                    phone: localStorage.getItem("user_contact")
                }, "POST", "/paytm/paytm-verify-otp").done(function (e) {
                    var t = JSON.parse(e);
                    if ("success" == t.status) {
                        $(".paytm-checkbox").removeClass("disabled"), $(".paytm-login .paytm-verify-otp").hide(), t.food_balance > 0 ? $(".after-login").show() : $(".after-login").hide();
                        var a = Number(localStorage.getItem("paytm_amt")),
                            o = 0;
                        o = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable")), $(".paytm-checkbox").addClass("selected"), a < o ? $(".less-amt-err").addClass("show") : $(".less-amt-err").removeClass("show"), localStorage.setItem("paytm_amt", t.balance), $(".paytm-checkbox .amount-paytm").html("&#8377; " + t.balance), ga("send", {
                            hitType: "event",
                            eventCategory: "Purchase",
                            eventAction: "Paytm_Verify",
                            eventLabel: ""
                        }), clevertap.event.push("Paytm_Verify", {
                            Source: "Purchase"
                        })
                    } else $(".before-login").show(), $(".error-paytm-otp").html(t.message), localStorage.setItem("paytm_access_token", "")
                })
            })
        },
        initPaytmLoadMoney: function (e) {
            $(".init-load-money").on("click", function (t) {
                t.stopImmediatePropagation();
                var a = Number(localStorage.getItem("paytm_amt")),
                    o = 0;
                o = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : Number(localStorage.getItem("payable"));
                var s = o - a,
                    r = Number($(".paytm-load-amt").val()),
                    n = localStorage.getItem("user_contact");
                r >= s ? fn_checkout.payments.generateCheckSum(r, n, "addmoney", e) : ($(".min-amount-head").addClass("err-border"), setTimeout(function () {
                    $(".min-amount-head").removeClass("err-border")
                }, 1e3))
            })
        },
        generateCheckSum: function (e, t, a, o) {
            var s = location.href.search("/order-status/") !== -1,
                r = JSON.parse(localStorage.getItem("profile_complete")),
                n = "",
                i = localStorage.getItem("order_id");
            if (s) {
                var l = window.location.pathname.split("/");
                i = l[2]
            }
            fn_home.ajaxForm({}, "GET", "/paytm/paytm-sso-token").done(function (a) {
                var l = JSON.parse(a);
                "success" == l.status && (n = l.sso_token, localStorage.setItem("paytm_access_token", l.sso_token), $(".paytm-load-money-wrap").addClass("loader-div"), fn_home.ajaxForm({
                    mobile: t,
                    amt: e,
                    email: r.email,
                    SSO: l.sso_token,
                    REQUEST_TYPE: "ADD_MONEY",
                    orderData: {
                        isreinitiate: s,
                        order_id: i
                    },
                    plan_id: o
                }, "POST", "/paytm/li-generate-checksum").done(function (e) {
                    fn_checkout.payments.verifyCheckSum(e, "")
                }).always(function () {
                    $(".paytm-load-money-wrap").addClass("complete"), setTimeout(function () {
                        $(".paytm-load-money-wrap").removeClass("complete loader-div")
                    }, 1200)
                }))
            }).always(function () {
                $(".paytm-load-money-wrapm").addClass("complete"), setTimeout(function () {
                    $(".paytm-load-money-wrap").removeClass("complete loader-div")
                }, 1200)
            })
        },
        verifyCheckSum: function (e, t) {
            $("#paytmssotoken").val(e.SSO_TOKEN), $("#paytmtxtamount").val(e.TXN_AMOUNT), $("#paytmorderid").val(e.ORDER_ID), $("#paytmcustid").val(e.CUST_ID), $("#paytmmobile").val(e.MOBILE_NO), $("#paytmcallback").val(e.CALLBACK_URL), fn_home.ajaxForm({
                MID: e.MID,
                ORDER_ID: e.ORDER_ID,
                CUST_ID: e.CUST_ID,
                INDUSTRY_TYPE_ID: e.INDUSTRY_TYPE_ID,
                CHANNEL_ID: "WEB",
                TXN_AMOUNT: e.TXN_AMOUNT,
                WEBSITE: e.WEBSITE,
                CALLBACK_URL: e.CALLBACK_URL,
                EMAIL: e.EMAIL,
                MOBILE_NO: e.MOBILE_NO,
                CHECKSUMHASH: e.CHECKSUMHASH,
                SSO_TOKEN: e.SSO_TOKEN,
                REQUEST_TYPE: e.REQUEST_TYPE
            }, "POST", "/paytm/li-verify-checksum").done(function (e) {
                "true" == e && fn_checkout.payments.addMoneyPaytm()
            })
        },
        addMoneyPaytm: function () {
            $("#paytmForm").submit(), localStorage.setItem("paytm-redirect", !0)
        },
        callPaytmThirdParty: function (e) {
            fn_home.ajaxForm({
                CALLBACK_URL: e.CALLBACK_URL,
                CHANNEL_ID: e.CHANNEL_ID,
                CHECKSUMHASH: e.CHECKSUMHASH,
                CUST_ID: e.CUST_ID,
                INDUSTRY_TYPE_ID: e.INDUSTRY_TYPE_ID,
                MID: e.MID,
                MOBILE_NO: e.MOBILE_NO,
                ORDER_ID: e.ORDER_ID,
                REQUEST_TYPE: e.REQUEST_TYPE,
                SSO_TOKEN: e.SSO_TOKEN,
                TXN_AMOUNT: Number(e.TXN_AMOUNT),
                WEBSITE: e.WEBSITE
            }, "POST", "/paytm/paytm-thirdparty").done(function (e) {})
        },
        fetchSavedCards: function () {
            var e = $(".payment-options-list ul");
            e.addClass("disabled"), $(".payment-options-list").find("li.enabled").removeClass("active"), $(".payment-options-list").find('[data-payname="saved_payments"]').addClass("active"), $(".payment-options-holder").find(".pay-method").hide(), $(".payment-options-holder").find('[data-payname="saved_payments"]').show();
            var t = $(".payment-options-holder").find(".pay-method.saved");
            t.find("ul").html("<p>Fetching saved cards....</p>");
            var a = JSON.parse(localStorage.getItem("profile_complete"));
            if (null == a) {
                $(".payment-options-list").find('[data-payname="saved_payments"]').removeClass("active").addClass("disabled"), $(".payment-options-holder").find('[data-payname="saved_payments"]').hide(), $(".payment-options-list").find('[data-payname="card"]').addClass("active"), $(".payment-options-holder").find('[data-payname="card"]').show(), localStorage.setItem("pay_source", "card"), $(".init-pay").removeClass("disabled")
            } else fn_home.ajaxForm({
                name: a.name,
                email: a.email
            }, "POST", "/checkout/get-cards").done(function (e) {
                var t = $(".payment-options-list ul");
                t.removeClass("disabled");
                var a = JSON.parse(e);
                200 === a.statusCode ? (localStorage.setItem("rp_cust_token", a.data.razorpay_customer_token), fn_checkout.payments.renderCards(a.data.tokens), $(".init-pay").removeClass("disabled")) : ($(".payment-options-list").find('[data-payname="saved_payments"]').removeClass("active").addClass("disabled"), $(".payment-options-holder").find('[data-payname="saved_payments"]').hide(), $(".payment-options-list").find('[data-payname="card"]').addClass("active"), $(".payment-options-holder").find('[data-payname="card"]').show(), $(".init-pay").removeClass("disabled"))
            }).fail(function () {
                var e = $(".payment-options-list ul");
                e.removeClass("disabled"), $(".payment-options-list").find('[data-payname="saved_payments"]').removeClass("active").addClass("disabled"), $(".payment-options-holder").find('[data-payname="saved_payments"]').hide(), $(".payment-options-list").find('[data-payname="card"]').addClass("active"), $(".payment-options-holder").find('[data-payname="card"]').show(), $(".init-pay").removeClass("disabled")
            })
        },
        renderCards: function (e) {
            var t = $(".payment-options-holder").find(".pay-method.saved");
            if (t.find("ul").html(""), e.items.length > 0) {
                var a = {
                    title: "Payment Methods",
                    subtitle: "You have " + e.items.length + " saved cards"
                };
                $(".payment-options-list").find('[data-payname="saved_payments"]').addClass("active").removeClass("disabled"), $(".payment-options-holder").find(".pay-method").hide(), $(".payment-options-holder").find('[data-payname="saved_payments"]').show(), localStorage.setItem("pay_source", "saved_payments")
            } else {
                var a = {
                    title: "Payment Methods",
                    subtitle: "You have no saved cards"
                };
                $(".payment-options-list").find('[data-payname="saved_payments"]').removeClass("active").addClass("disabled"), $(".payment-options-holder").find('[data-payname="saved_payments"]').hide(), $(".payment-options-list").find('[data-payname="card"]').addClass("active"), $(".payment-options-holder").find('[data-payname="card"]').show(), localStorage.setItem("pay_source", "card")
            }
            fn_checkout.setNavMessages(a, "cards"), $.map(e.items, function (e) {
                var a = e.card.network.toLowerCase(),
                    o = '<li data-token="' + e.token + '"><span class = "card-icon ' + a + '"></span><span class="card-num">XXXX XXXX XXXX <b class = "last4">' + e.card.last4 + '</b></span><p><input type="password" class = "sc-cvv" required maxlength="4"><label for="">CVV</label></p></li>';
                t.find("ul").append(o)
            }), fn_checkout.payments.selectSavedCard()
        },
        selectSavedCard: function () {
            var e = $(".pay-method.saved");
            e.find("ul li").on("click", function () {
                var t = $(this),
                    a = localStorage.getItem("rp_cust_token"),
                    o = t.data("token");
                localStorage.setItem("pay_source", "card"), localStorage.setItem("saved_card", 1), e.find("ul li").removeClass("selected"), t.addClass("selected"), Object.assign(fn_checkout.payments.card, {
                    customer_id: a,
                    token: o
                }), fn_checkout.resetLiciousWallet()
            })
        },
        resetSavedpayments: function () {
            var e = $(".pay-method.saved");
            e.find(".cards ul li").removeClass("selected"), localStorage.setItem("saved_card", 0)
        },
        paymentHolder: $(".payment-options-holder"),
        renderWallets: function (e, t) {
            fn_checkout.payments.paymentHolder.find(".other-wallets").attr("data-payname", t), fn_checkout.payments.paymentHolder.find(".other-wallets ul").html(""), $.map(e, function (e) {
                var t = e.enabled ? "enabled" : "disabled",
                    a = '<li class = "' + t + '"style="display: flex; align-items: center;" data-paymode="' + e.payment_code + '"><span class = "img-holder"><img src = "' + e.meta.icon_url + '"/></span><span style="display: flex;flex-direction: column;"><span class="disp-name">' + e.display_name + "</span>" + (e.meta.promo_msg ? '<span style="font-size: 12px; color: #1d911d;">' + e.meta.promo_msg + "</span>" : "") + "</span>";
                '<span class = "disable-msg">' + e.meta.disable_message + "</span></li>", $(".payment-options-holder").find(".other-wallets ul").append(a)
            })
        },
        renderBanks: function (e, t) {
            var a = fn_checkout.payments.paymentHolder.find(".net-banking"),
                o = 0;
            a.attr("data-payname", t), localStorage.setItem("banks", JSON.stringify(e.payment_content.payment_list)), a.find(".preffered-banking-list").html(""), $.map(e.payment_content.payment_list, function (e, t) {
                var o = "<p data-bc=" + t + ' class="see">' + e + "</p>";
                a.find(".dropdown-list").append(o)
            }), $.map(e.payment_methods, function (e, t) {
                var s = '<li data-bc="' + e.payment_code + '"><img src = "' + e.meta.icon_url + '"/>' + e.name + "</li>";
                o++, a.find(".preffered-banking-list").append(s)
            }), 0 == o && a.find(".preffered-banking").hide(), fn_checkout.payments.selectPreferredBank()
        },
        renderPaymentBar: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? "undefined" : arguments[1],
                a = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2];
            if ($(".first").attr("pay_key", ""), e.is_payble && ("CREATED_WITH_FAILURE" === a || t >= 3)) {
                $(".first").attr("pay_key", "true"), $(".payment-option-wrapper").show(), setTimeout(function () {
                    $("html, body").animate({
                        scrollTop: 500
                    }, 700, "swing")
                }, 3e3);
                var o = "true" === localStorage.getItem("is_shipment");
                if (!o && e.payment_status && e.total) {
                    var s = JSON.parse(localStorage.getItem("amount"));
                    "CREATED_WITH_FAILURE" === a && null !== s.total ? (localStorage.setItem("payable", s.total), amount = s.total) : (amount = e.total, localStorage.setItem("payable", e.total)), $(".payment-option-wrapper").find(".init-pay i").html(parseFloat(amount).toFixed(2))
                } else localStorage.setItem("payable", e.total), $(".payment-option-wrapper").find(".init-pay i").html(parseFloat(e.total).toFixed(2));
                $(".payment-option-wrapper").find(".init-pay").attr("data-po", "pay-now")
            } else $(".payment-option-wrapper").hide(), $(".first").hide(), $("#btn1").hide()
        },
        tabs: function (e) {
            $(".payment-options-list").find("li").on("click", function () {
                $(".licious-wallet .lic-btn").hasClass("checked") ? localStorage.setItem("wallet_status", "ACTIVE") : (localStorage.setItem("wallet_status", "INACTIVE"), localStorage.setItem("wallet_usedValue", 0));
                var t = $(this).hasClass("disabled");
                if (!t) {
                    $(".init-pay").removeClass("disabled");
                    var a, o = $(this).attr("data-payname");
                    a = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : localStorage.getItem("payable"), $(".paytm-checkbox").removeClass("selected"), $(".less-amt-err").removeClass("show"), $(".upi-list-wrapper .upi-card").removeClass("selected"), $(".upi-list-wrapper .upi-card .button-check").removeClass("show"), $(".vpa-section").removeClass("show"), $(".vpa-section input").val(""), $(".payment-options-holder").find(".pay-method").hide(), $(".payment-options-holder").find('[data-payname="' + o + '"]').show(), $(".payment-options-list").find("li").removeClass("active"), $(this).addClass("active"), "paytm" != o && ($(".paytm-add-money-wrapper").removeClass("show"), $(".paytm-lock-screen").removeClass("show"));
                    var s;
                    if ("wallet" == o ? s = "wallet" : "saved_payments" == o ? s = "Card" : "card" == o ? s = "Card" : "netbanking" == o ? s = "netbanking" : "pod" == o ? s = "Pay on Delivery" : "cod" == o ? s = "Cash on Delivery" : "paytm" == o ? s = "Paytm" : "upi" == o ? s = "upi" : "paypal" == o && (s = "paypal"), localStorage.setItem("method", s), "payment" == e) {
                        var r = {
                            "Licious Wallet Status": localStorage.getItem("wallet_status"),
                            "Licious Wallet Used Value": Number(localStorage.getItem("wallet_usedValue")),
                            "Payment Method": s,
                            Total: Number(a),
                            "City Name": localStorage.getItem("city_name"),
                            hub_id: fn_ll.getterLS("hub_id"),
                            "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                            Checkout_Flow: checkout_flow()
                        };
                        fn_main.assignIncomingSource(r), fn_cart.gaAddRemoveEvent("Purchase_PaymentMethod", "Purchase", JSON.stringify(r)), r.Source = "Purchase", clevertap.event.push("Payment Method Selected", r)
                    }
                    if ("track-page" == e) {
                        var r = {
                            "Licious Wallet Status": localStorage.getItem("wallet_status"),
                            "Licious Wallet Used Value": Number(localStorage.getItem("wallet_usedValue")),
                            "Payment Method": s,
                            Total: Number(a)
                        };
                        fn_cart.gaAddRemoveEvent("Order_PODPay", "order", JSON.stringify(r)), r.Source = "Order", clevertap.event.push("Order Pay on Delivery", r)
                    }
                    localStorage.setItem("pay_source", o), localStorage.setItem("pay_mode", ""), localStorage.setItem("saved_bank", 0), localStorage.setItem("saved_card", 0), fn_checkout.payments.resetWallets(), fn_checkout.payments.resetBanks(), fn_checkout.payments.resetCard(), fn_checkout.payments.resetSavedpayments(), "cod" == o || "pod" == o ? $(".payment-cta").find(".init-pay").html("Place Order") : $(".payment-cta").find(".init-pay").html("Pay <i class = 'rupee'>" + parseFloat(a).toFixed(2) + "</i>"), $(".payment-cta").find(".init-pay").attr("data-mode", o), fn_checkout.resetLiciousWallet(), fn_checkout.payments.validatecardYear()
                }
            }), fn_checkout.payments.selectWallet(), fn_checkout.payments.saveCardFn(), fn_checkout.payments.selectPaypalOption()
        },
        resetWallets: function () {
            $(".pay-method.other-wallets").find("li").removeClass("selected")
        },
        resetBanks: function () {
            $(".pay-method.net-banking").find(".search-bank").val(""), $(".preffered-banking-list").find("li").removeClass("selected")
        },
        resetCard: function () {
            $(".pay-method.payment-card").find('[data-card="detail"]').val("")
        },
        card: {},
        saveCard: 0,
        saveCardFn: function () {
            $(".save-card").on("click", function () {
                var e = $(this).hasClass("checked");
                e ? ($(this).removeClass("checked"), fn_checkout.payments.saveCard = 0, Object.assign(fn_checkout.payments.card, {
                    save: 0,
                    customer_id: localStorage.getItem("rp_cust_token")
                })) : ($(this).addClass("checked"), Object.assign(fn_checkout.payments.card, {
                    save: 1,
                    customer_id: localStorage.getItem("rp_cust_token")
                }))
            })
        },
        validateCard: function () {
            var e = $(".pay-method.payment-card").find('[data-card="detail"]'),
                t = 0;
            return e.each(function (e, a) {
                switch ($(a).data("type")) {
                    case "card-num":
                        if ("" == $(a).val()) return fn_checkout.alertBox("Enter Card Number", "", "alert"), t = 0, !1;
                        if ($(a).val().length < 15 || $(a).val().length > 16) return fn_checkout.alertBox("Card Number must be of 15 Digits", "", "alert"), t = 0, !1;
                        t = 1, Object.assign(fn_checkout.payments.card, {
                            num: $(a).val()
                        });
                        break;
                    case "card-mon":
                        if ("" == $(a).val()) return fn_checkout.alertBox("Enter expiry month of card", "", "alert"), t = 0, !1;
                        if ($(a).val().length < 2 || $(a).val().length > 2) return fn_checkout.alertBox("Expiry month of card must be of 01 to 12", "", "alert"), t = 0, !1;
                        t = 1, Object.assign(fn_checkout.payments.card, {
                            exm: $(a).val()
                        });
                        break;
                    case "card-year":
                        if ("" == $(a).val()) return fn_checkout.alertBox("Enter expiry year of card", "", "alert"), t = 0, !1;
                        if ($(a).val() < (new Date).getFullYear()) return fn_checkout.alertBox("Expiry year of card should be greater than current year", "", "alert"), t = 0, !1;
                        t = 1, Object.assign(fn_checkout.payments.card, {
                            exy: $(a).val()
                        });
                        break;
                    case "card-cvv":
                        if ("" == $(a).val()) return fn_checkout.alertBox("Enter CVV of card", "", "alert"), t = 0, !1;
                        if ($(a).val().length < 3) return fn_checkout.alertBox("CVV of card must be of Min. 3 digits", "", "alert"), t = 0, !1;
                        t = 1, Object.assign(fn_checkout.payments.card, {
                            cvv: $(a).val()
                        });
                        break;
                    case "card-name":
                        if ("" == $(a).val()) return fn_checkout.alertBox("Enter Name on the card", "", "alert"), t = 0, !1;
                        t = 1, Object.assign(fn_checkout.payments.card, {
                            name: $(a).val()
                        })
                }
            }), t
        },
        validatecardYear: function () {
            $(".payment-card").find('[data-type="card-year"]').on("keydown", function (e) {
                if (e.keyCode > 95 && e.keyCode < 106 && $(this).val().length > 3) return !1
            }), $(".payment-card").find('[data-type="card-mon"]').on("keydown", function (e) {
                if (e.keyCode > 95 && e.keyCode < 106 && $(this).val().length > 1) return !1
            }), $(".payment-card").find('[data-type="card-num"]').on("keydown", function (e) {
                if (e.keyCode > 95 && e.keyCode < 106 && $(this).val().length > 15) return !1
            })
        },
        showBanks: function () {
            $(".search-wrapper").on("click", function () {
                document.querySelector(".dropdown-list").style.display = "block", document.querySelector(".dropdown-list .screen").style.display = "block", document.querySelector(".search-bank").focus(), fn_checkout.payments.clickOut(), $(".preffered-banking-list").find("li").removeClass("selected"), localStorage.setItem("pay_mode", ""), localStorage.setItem("saved_bank", 0)
            })
        },
        hideBanks: function () {
            document.querySelector(".dropdown-list").style.display = "none", document.querySelector(".dropdown-list .screen").style.display = "none"
        },
        count: -1,
        selectBank: function () {
            $(".dropdown-list p").on("click", function () {
                $(".search-bank").val($(this).text()), $(".dropdown-list").hide(), $(".dropdown-list .screen").hide()
            });
            var e = JSON.parse(localStorage.getItem("banks"));
            $(".search-bank").on("keyup", function (t) {
                var a = $(".dropdown-list p.see").length,
                    o = document.querySelector(".search-bank"),
                    s = o.value.toUpperCase();
                $.map(e, function (e, t) {
                    e.toUpperCase().indexOf(s) ? $(".dropdown-list").find('[data-bc="' + t + '"]').hide().removeClass("see") : $(".dropdown-list").find('[data-bc="' + t + '"]').show().addClass("see")
                });
                var r = $(".dropdown-list p.see");
                if (40 === t.keyCode && count < a) count++;
                else if (38 === t.keyCode && count > 0) count--;
                else {
                    if (13 === t.keyCode) {
                        var n = $(".dropdown-list").find("p.see.active");
                        $(".search-bank").val(n.text()).blur(), r.removeClass("active"),
                            localStorage.setItem("pay_mode", n.attr("data-bc")), localStorage.setItem("pay_source", "netbanking"), fn_checkout.payments.hideBanks()
                    }
                    count = 0
                }
                r.removeClass("active"), r.eq(count).addClass("active")
            })
        },
        selectPreferredBank: function () {
            $(".preffered-banking-list").find("li").on("click", function () {
                var e = $(this).attr("data-bc");
                localStorage.setItem("pay_mode", e), localStorage.setItem("pay_source", "netbanking"), $(".preffered-banking-list").find("li").removeClass("selected"), $(this).addClass("selected"), $(".search-bank").val(""), localStorage.setItem("saved_bank", 1), fn_checkout.resetLiciousWallet()
            })
        },
        selectPaypalOption: function () {
            $(".pay-method.paypal").find("li").on("click", function () {
                if (!$(this).hasClass("disabled")) {
                    var e = $(this).attr("data-paymode");
                    localStorage.setItem("pay_mode", e), localStorage.setItem("pay_source", "paypal"), $(".pay-method.paypal").find("li").removeClass("selected"), $(this).addClass("selected")
                }
            })
        },
        selectWallet: function () {
            $(".other-wallets").find("li").on("click", function () {
                if (!$(this).hasClass("disabled")) {
                    var e = $(this).attr("data-paymode");
                    localStorage.setItem("pay_mode", e), localStorage.setItem("pay_source", "wallet"), $(".other-wallets").find("li").removeClass("selected"), $(this).addClass("selected"), fn_checkout.resetLiciousWallet()
                }
            })
        },
        clickOut: function () {
            $(document).click(function (e) {
                return !$(e.target).is(".dropdown-list, .search-bank") && void($(e.target).is(".dropdown-list p") ? ($(".search-bank").val($(e.target).text()), $(".dropdown-list").hide(), $(".dropdown-list .screen").hide(), localStorage.setItem("pay_mode", $(e.target).attr("data-bc")), localStorage.setItem("pay_source", "netbanking")) : $(".dropdown-list").fadeOut())
            })
        },
        fetchWallet: function (e, t) {
            var a = {};
            t && (a = {
                type: "loyalty",
                subProgramId: subProgramId
            }), $(".licious-wallet").find(".lic-btn").css("pointer-events", "none"), fn_home.ajaxForm(a, "POST", "/checkout/fetch-wallet").done(function (a) {
                fn_main.hideloader(), $(".licious-wallet").find(".lic-btn").css("pointer-events", "auto");
                var o = JSON.parse(a),
                    s = $(".lic-breakup"),
                    r = {
                        licious_wallet: {
                            total_payble_without_wallet: o.licious_wallet.total_payble_without_wallet,
                            total_payble_after_wallet: o.licious_wallet.total_payble_after_wallet
                        }
                    };
                localStorage.setItem("fetchWalletApi", JSON.stringify(r));
                var n = $(".bill-breakup");
                n.html("");
                var i = 0,
                    l = 0,
                    d = "";
                if ($.map(o.order_charges, function (e, t) {
                        var a = e.attribute.toLowerCase().replace(/ /g, "-");
                        if ("Overdue" !== e.attribute && "total" !== e.key.toLowerCase()) {
                            var o = '<li class="' + a + '">\n                                ' + e.attribute + "\n                                <span>" + ("discount" === e.key && e.value ? "-" + e.value : e.value) + '</span>\n                                <div class="message ' + ("discount" === e.key || ("deliverycharge" === e.key || "delivery_charge" === e.key) && 0 === e.value ? "positive" : "") + '">' + e.message + "</div>\n                              </li>";
                            n.append(o), "deliverycharge" !== e.key && "delivery_charge" !== e.key || (l = e.value)
                        } else if ("total" === e.key.toLowerCase()) {
                            i = e.value, d = '<li class="' + a + '">' + e.attribute + "<span>" + e.value + '</span>\n              <div class="message">' + e.message + "</div></li>";
                            var s = e.value,
                                r = JSON.parse(localStorage.getItem("amount"));
                            "CREATED_WITH_FAILURE" === localStorage.getItem("payment_info") && null !== r.total ? localStorage.setItem("payable", r.total) : localStorage.setItem("payable", s), $(".payment-cta").find(".init-pay").find("i").html(parseFloat(s).toFixed(2))
                        }
                    }), t && (fn_ll.loyalty_cart_value = i.toString(), fn_ll.loyalty_delivery_charges = l.toString()), n.append(d), o.licious_wallet) {
                    localStorage.setItem("wallet_status", "INACTIVE"), s.find(".usable-licp").html("Usable Bonus Cash " + o.licious_wallet.licious_cashp), s.find(".usable-licw").html("Usable Licious Cash " + o.licious_wallet.licious_cash);
                    var c = "<h5>Balance</h5><p>Licious Cash<span>" + o.licious_wallet.transactional_balance + "</span></p><p>Bonus Cash<span>" + o.licious_wallet.promotional_balance + "</span></p>";
                    s.find(".balance").html(c);
                    var u = o.licious_wallet.payable_wallet_amount > 0 ? "enabled" : "disabled";
                    if ($(".licious-wallet").find(".usable-liwallet").html(parseFloat(o.licious_wallet.payable_wallet_amount)), $(".licious-wallet").find(".lic-btn").attr("data-usableamt", parseFloat(o.licious_wallet.payable_wallet_amount)).addClass(u), "remove-coupon" == e) return;
                    localStorage.setItem("wallet_used", 0), localStorage.setItem("balance", o.licious_wallet.payable_wallet_amount), localStorage.setItem("wallet_usedValue", o.licious_wallet.payable_wallet_amount), localStorage.setItem("status", o.licious_wallet.Status)
                }
            }).fail(function () {
                fn_main.hideloader()
            }).always(function () {
                fn_main.hideloader()
            }), fn_checkout.payments.useWalletBalance()
        },
        fetchWalletNew: function (e, t) {
            fn_home.ajaxForm({
                ship_id: e,
                isShipment: t ? 1 : 0
            }, "POST", "/checkout/fetch-wallet-new").done(function (e) {
                var t = JSON.parse(e),
                    a = $(".lic-breakup");
                if ("success" == t.status) {
                    a.find(".usable-licp").html("Usable Bonus Cash " + t.licious_wallet.licious_cashp), a.find(".usable-licw").html("Usable Licious Cash " + t.licious_wallet.licious_cash);
                    var o = "<h5>Balance</h5><p>Licious Cash<span>" + t.licious_wallet.transactional_balance + "</span></p><p>Bonus Cash<span>" + t.licious_wallet.promotional_balance + "</span></p>";
                    a.find(".balance").html(o);
                    var s = t.licious_wallet.payable_wallet_amount > 0 ? "enabled" : "disabled";
                    $(".licious-wallet").find(".usable-liwallet").html(parseFloat(t.licious_wallet.payable_wallet_amount)), $(".licious-wallet").find(".lic-btn").attr("data-usableamt", parseFloat(t.licious_wallet.payable_wallet_amount)).addClass(s), localStorage.setItem("balance", t.licious_wallet.payable_wallet_amount), localStorage.setItem("status", t.licious_wallet.Status)
                }
            }), fn_checkout.payments.useWalletBalance("pay-later")
        },
        useWalletBalance: function (e) {
            $(".licious-wallet").find(".lic-btn").on("click", function (t) {
                t.stopImmediatePropagation();
                var a, o = $(this).hasClass("enabled"),
                    s = parseFloat($(this).attr("data-usableamt"));
                a = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : localStorage.getItem("payable");
                $(".payment-options-list").find('[data-payname="cod"]').hasClass("disabled");
                if (!o) return void localStorage.setItem("wallet_status", "INACTIVE");
                if ($(this).hasClass("checked")) {
                    fn_paypal.updateUIviaPaypal(Number(a) + Number(s)), $(this).removeClass("checked"), localStorage.setItem("wallet_used", 0), localStorage.setItem("wallet_usedValue", 0), localStorage.setItem("wallet_status", "INACTIVE"), fn_checkout.updateBilling(s, "li_plus");
                    var r = localStorage.getItem("before_paylater");
                    if ("pay-later" == e && "false" == r && null != r) {
                        var n = $(".payment-options-list ul .enabled.active").data("payname");
                        $(".payment-options-list").find('[data-payname="cod"]').addClass("disabled").removeClass("active"), $(".payment-options-list").find('[data-payname="pod"]').addClass("disabled").removeClass("active"), "cod" !== n && "pod" !== n || ! function () {
                            var e = !0;
                            $.map($(".payment-options-list ul li"), function (t, a) {
                                "enabled" === t.className && e && ($(".payment-options-list").find('[data-payname="' + t.dataset.payname + '"]').trigger("click"), e = !1)
                            })
                        }()
                    } else if (0 === $(".lp-ll-selling-price").length) {
                        var i = Number(localStorage.getItem("max_cod_value")),
                            l = Number(localStorage.getItem("payable"));
                        l <= i && (fn_checkout.isCODEnabled && $(".payment-options-list").find('[data-payname="cod"]').removeClass("disabled"), fn_checkout.isPODEnabled && $(".payment-options-list").find('[data-payname="pod"]').removeClass("disabled"))
                    }
                } else {
                    fn_paypal.updateUIviaPaypal(Number(a) - Number(s)), $(this).addClass("checked"), localStorage.setItem("wallet_status", "ACTIVE"), localStorage.setItem("wallet_usedValue", s), localStorage.setItem("wallet_used", s), fn_checkout.updateBilling(s, "li_minus");
                    var n = $(".payment-options-list ul .enabled.active").data("payname");
                    $(".payment-options-list").find('[data-payname="cod"]').addClass("disabled"), $(".payment-options-list").find('[data-payname="pod"]').addClass("disabled"), "cod" !== n && "pod" !== n || ! function () {
                        var e = !0;
                        $.map($(".payment-options-list ul li"), function (t, a) {
                            "enabled" === t.className && e && ($(".payment-options-list").find('[data-payname="' + t.dataset.payname + '"]').trigger("click"), e = !1)
                        })
                    }(), localStorage.setItem("pay_mode", ""), localStorage.setItem("saved_bank", 0), localStorage.setItem("saved_card", 0), fn_checkout.payments.resetWallets(), fn_checkout.payments.resetBanks(), fn_checkout.payments.resetSavedpayments()
                }
            })
        },
        upiTimer: function (e, t) {
            function a() {
                s = parseInt(n / 60, 10), r = parseInt(n % 60, 10), s = s < 10 ? "0" + s : s, r = r < 10 ? "0" + r : r, --n < 0 ? (o(), t.html("00:00"), $(".upi-loader").css("animation", "none"), fn_checkout.razorPay.emit("payment.cancel")) : t.html(s + ":" + r)
            }

            function o() {
                clearInterval(fn_checkout.initTimer)
            }
            clearInterval(fn_checkout.initTimer);
            var s, r, n = e;
            fn_checkout.initTimer = setInterval(a, 1e3), $(".confirm").on("click", function () {
                o(), fn_checkout.razorPay.emit("payment.cancel"), $(".upi-loader-container").removeClass("show"), $(".li-checkout-container").show(), $(".li-alert-screen").removeClass("show")
            })
        },
        detectPopupBlocker: function () {
            var e = window.open("about:blank", "", "directories=no,height=1,width=1,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");
            return e.document.getElementsByTagName("body")[0].style.opacity = .5, e ? void e.close() : void fn_checkout.alertBox("Please turn off the pop up blocker in the browser and refresh the page, as it may affect your payment", "", "alert")
        },
        validateBeforePay: function (e) {
            var t = 0;
            t = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : localStorage.getItem("payable");
            var a = localStorage.getItem("pay_mode"),
                o = (localStorage.getItem("default_addr_id"), $(".search-bank")),
                s = 0,
                r = localStorage.getItem("saved_card"),
                n = localStorage.getItem("saved_bank"),
                i = $("#user-vpa").val(),
                l = /^.+@.+$/,
                d = $(".payment-cta").find(".init-pay");
            switch (e) {
                case "paypal":
                    $("#paypal_one_time_pay").hasClass("selected") || $("#paypal_auto_pay").hasClass("selected") ? s = 1 : (fn_checkout.alertBox("Select a payment method to continue", "", "alert"), d.removeClass("disabled"));
                    break;
                case "l_wallet":
                    return 1;
                case "netbanking":
                    1 == n ? s = 1 : "" == o.val() ? (fn_checkout.alertBox("Select a payment method to continue", "", "alert"), d.removeClass("disabled"), s = 0) : s = 1;
                    break;
                case "wallet":
                    "" == a ? (fn_checkout.alertBox("Select a payment method to continue", "", "alert"), d.removeClass("disabled"), s = 0) : s = 1;
                    break;
                case "card":
                    if (1 == r) {
                        var c = (fn_checkout.payments.card, $(".pay-method.saved .cards").find("li.selected")),
                            u = c.find(".sc-cvv").val();
                        if ("" == u) return fn_checkout.alertBox("Provide CVV to continue", "", "alert"), s = 0, void d.removeClass("disabled");
                        if (u.length < 3) return fn_checkout.alertBox("CVV of a Card must be 3 digits", "", "alert"), d.removeClass("disabled"), void(s = 0);
                        s = 1
                    } else {
                        var p = fn_checkout.payments.validateCard();
                        if (1 != p) return d.removeClass("disabled"), s = 0, !1;
                        fn_checkout.payments.card;
                        s = 1
                    }
                    break;
                case "upi":
                    if (!$(".upi-card ").hasClass("selected")) return fn_checkout.alertBox("Select a payment method to continue", "", "alert"), d.removeClass("disabled"), 0;
                    "" == i || null == i ? ($(".error-upi-vpa").html("Please enter VPA ID / UPI ID"), s = 0, d.removeClass("disabled")) : l.test(i) ? ($(".error-upi-vpa").html(""), s = 1) : ($(".error-upi-vpa").html("Please enter a valid VPA ID / UPI ID"), s = 0, d.removeClass("disabled"));
                    break;
                case "paytm":
                    if ($(".paytm-checkbox").hasClass("selected")) {
                        var m = Number(localStorage.getItem("paytm_amt")),
                            h = Math.ceil(t - m);
                        t > m && $(".paytm-checkbox").hasClass("selected") ? ($(".min-amount-head .minimum-amount").html("&#8377; " + h), $(".paytm-load-amt").val(h), $(".paytm-add-money-wrapper").addClass("show"), $(".paytm-lock-screen").addClass("show"), s = 0, d.removeClass("disabled")) : s = 1
                    } else fn_checkout.alertBox("Select a payment method to continue", "", "alert"), d.removeClass("disabled"), s = 0;
                    break;
                case "saved_payments":
                    var f = $(".pay-method.saved.active").find("li").hasClass("selected");
                    return f || fn_checkout.alertBox("Select a payment method to continue", "", "alert"), d.removeClass("disabled"), s = 0, 0
            }
            return s
        },
        getPaymentsObjectsForOtherMethod: function () {
            var e = "ACTIVE" === localStorage.getItem("wallet_status"),
                t = [];
            if (e) {
                var a = localStorage.getItem("wallet_usedValue");
                t.push({
                    type: "wallet",
                    amount_to_deduct: a
                })
            }
            return t
        },
        activityAfterRazorpaySuccessOrError: function (e, t) {
            var a = t.amount,
                o = t.isreinitiate,
                s = localStorage.getItem("max_cod_value"),
                r = a / 100 > Number(s),
                n = $(".payment-cta").find(".init-pay");
            n.removeClass("disabled");
            var i = "false" === localStorage.getItem("before_paylater"),
                l = window.location.pathname.includes("/order-status/"),
                d = '\n        <div class="payment-fail-container">\n        <img src="https://d2407na1z3fc0t.cloudfront.net/Banner/payment-fail.png" alt="">\n        <div class="desc">\n            <div class="title">Order create failure</div>\n            <div class="subtitle">Your order is not created due to unforeseen issues</div>\n        </div>\n\n        <div class="retry-cta">\n            <!-- <button class = "create-order-pod">Pay on Delivery</button> -->\n            <button class = "retry cart loaded" data-url="/user/checkout">Back to cart</button>\n        </div>\n        </div>\n\n        ',
                c = '\n          <div class="payment-fail-container">\n          <img src="https://d2407na1z3fc0t.cloudfront.net/Banner/payment-fail.png" alt="">\n          <div class="desc">\n              ' + (r ? "" : '<div class="title">Payment Cancelled</div>') + "\n              " + (r ? "" : fn_checkout.isPODEnabled || fn_checkout.isCODEnabled ? '<div class="subtitle">You can place the order now via Pay Online on Delivery and pay online later when your order is out for delivery.</div>' : '<div class="subtitle">Please try again online. In case your amount is debited, your amount will be refunded automatically.</div>') + "\n              " + (r ? '<div class="subtitle">Your order is exceeding maximum COD amount. Please click on Back to cart to cancel the order</div>' : "") + '\n              </div>\n\n          <div class="retry-cta">\n              ' + (r ? '<button class = "create-order-pod">Retry</button>' : fn_checkout.isPODEnabled || fn_checkout.isCODEnabled ? '<button class = "create-order-pod">Pay on Delivery</button>' : "") + "\n              " + (l ? '<button class = "retry cart loaded" data-url="/user/checkout">Cancel</button>' : '<button class = "retry cart loaded" data-url="/user/checkout">Back to cart</button>') + "\n\n          </div>\n          </div>\n        ";
            i && o && (c = '\n        <div class="payment-fail-container">\n        <img src="https://d2407na1z3fc0t.cloudfront.net/Banner/payment-fail.png" alt="">\n        <div class="desc">\n           <div class="title">Payment Cancelled</div>\n            <div class="subtitle">Please retry again</div>\n            </div>\n\n        <div class="retry-cta">\n            <button class = "retry cart loaded" data-url="/user/checkout">Retry</button>\n        </div>\n        </div>\n      ');
            var u = $(".retry-payment");
            switch (u.html(""), e) {
                case "orderFailure":
                    u.html(d).show(), u.off(), u.find(".retry-cta .retry.cart.loaded").on("click", function () {
                        u.hide(), fn_cart.miniCart()
                    });
                    break;
                case "paymentFailed":
                    u.html(c).show(), u.off();
                    var p = u.find(".retry-cta .retry.cart.loaded"),
                        m = u.find(".retry-cta .create-order-pod");
                    i && o ? p.on("click", function () {
                        window.location.reload()
                    }) : p.on("click", function () {
                        u.hide(), new Promise(function (e, a) {
                            var o = t.orderApiResponse,
                                s = t.amount,
                                r = t.razorpayResponse,
                                n = {
                                    order_id: o.order_id,
                                    payment: {
                                        type: "razorpay",
                                        id: "",
                                        amount: s,
                                        status: "FAILURE",
                                        failed_reason: r && r.error ? r.error.description : ""
                                    },
                                    secondry_action: "CANCELLED"
                                };
                            paymentStatusApiCall(n).then(function (e) {
                                if (e) return l ? (u.html(c).hide(), void window.location.reload()) : (u.html(c).hide(), void fn_home.ajaxForm({}, "POST", "/new-cart").done(function (e) {
                                    var t = JSON.parse(e);
                                    200 === t.statusCode && (fn_checkout.setNavActive("redo-addr"), fn_checkout.setPageActive("redo-addr"), fn_cart.miniCart())
                                }))
                            })["catch"](function (e) {})
                        })
                    }), r && l ? (m.off(), m.on("click", function () {
                        window.location.reload()
                    })) : r ? (m.off(), m.on("click", function () {
                        new Promise(function (e, a) {
                            var o = t.orderApiResponse,
                                s = t.amount,
                                r = t.razorpayResponse,
                                n = {
                                    order_id: o.order_id,
                                    payment: {
                                        type: "razorpay",
                                        id: "",
                                        amount: s,
                                        status: "FAILURE",
                                        failed_reason: r && r.error ? r.error.description : ""
                                    },
                                    secondry_action: "CANCELLED"
                                };
                            paymentStatusApiCall(n).then(function (e) {
                                if (e) {
                                    if (l) return u.html(c).hide(), void window.location.reload();
                                    window.location.reload(), u.html(c).hide()
                                }
                            })["catch"](function (e) {})
                        })
                    })) : m.on("click", function () {
                        u.hide();
                        new Promise(function (e, a) {
                            var o = t.orderApiResponse,
                                s = t.amount,
                                r = t.razorpayResponse,
                                n = {
                                    order_id: o.order_id,
                                    payment: {
                                        type: "razorpay",
                                        id: "",
                                        amount: s,
                                        status: "FAILURE",
                                        failed_reason: r && r.error ? r.error.description : ""
                                    },
                                    secondry_action: "COD"
                                };
                            paymentStatusApiCall(n, o).then(function (e) {
                                if (e) {
                                    var t;
                                    ! function () {
                                        var a = e.orderDetailsRes || {},
                                            o = a.order_id,
                                            s = a.address_id,
                                            r = a.orderDetails;
                                        try {
                                            ! function () {
                                                var e = r || {},
                                                    a = e.cart_value,
                                                    n = e.discount_amount,
                                                    i = e.currency,
                                                    l = e.product_ids,
                                                    d = e.product_names,
                                                    c = e.prices,
                                                    u = e.delivery_type,
                                                    p = e.delivery_slots,
                                                    m = e.hub_id,
                                                    h = parseFloat(localStorage.getItem("wallet_used")),
                                                    f = localStorage.getItem("coupon_used"),
                                                    v = (localStorage.getItem("method"), localStorage.getItem("pay_source")),
                                                    g = fn_ll.getterSS("customer_type"),
                                                    _ = {
                                                        Source: "Purchase",
                                                        "Total Amount": Number(a),
                                                        "Coupon Name": f,
                                                        "Coupon Type": localStorage.getItem("coupon_type"),
                                                        "City Name": localStorage.getItem("city_name"),
                                                        "Hub ID": m,
                                                        Discount: n,
                                                        "Licious wallet Amount": h,
                                                        "Charged ID": o,
                                                        Currency: i,
                                                        "Payment Method": "POD",
                                                        "Product ID": l ? l.toString() : "",
                                                        "Product Name": d ? d.toString() : "",
                                                        "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                                                        Price: c ? c.toString() : "",
                                                        Quantity: localStorage.getItem("product_quantity"),
                                                        ShipmentIDs: localStorage.getItem("shipmentCount"),
                                                        ShipmentTypes: u,
                                                        ShipmentTime: p,
                                                        AddressID: s,
                                                        "Transaction ID": o,
                                                        Checkout_Flow: checkout_flow(),
                                                        user_type: g
                                                    };
                                                fn_main.assignIncomingSource(_), fn_home.sendBranchChargedEvent(_, o);
                                                ({
                                                    Charged: "Yes",
                                                    "Total Amount": Number(a),
                                                    City: localStorage.getItem("city_name"),
                                                    "Payment Method": v,
                                                    "Charged ID": o
                                                });
                                                ga("ecommerce:addTransaction", {
                                                    id: o,
                                                    revenue: Number(a)
                                                }), t = localStorage.getItem("product_quantity"), t = t.split(","), $.map(d, function (e, a) {
                                                    ga("ecommerce:addItem", {
                                                        id: o,
                                                        name: e,
                                                        sku: l[a],
                                                        price: c[a],
                                                        quantity: t[a]
                                                    })
                                                }), window.dataLayer && window.dataLayer.push({
                                                    event: "debug-charged",
                                                    "ga-category": "debug-charged",
                                                    "ga-action": "Logging debug charged",
                                                    "ga-label": r ? JSON.stringify(r) : "orderDetails not available"
                                                }), pushEEPurchases(parsePushEEPurchaseEvent({
                                                    product_names: d,
                                                    product_ids: l,
                                                    prices: c,
                                                    pr_qty: t,
                                                    currency: i,
                                                    order_id: o,
                                                    transactionId: o,
                                                    cart_value: a,
                                                    delivery_type: u,
                                                    delivery_slots: p,
                                                    address_id: s,
                                                    coupon_used: f,
                                                    charged: _
                                                })), fn_cart.gaAddRemoveEvent("Charged", "Charged", JSON.stringify(_)), clevertap.event.push("Charged", _)
                                            }()
                                        } catch (n) {}
                                        redirectToOrderStatusPage(o)
                                    }()
                                }
                            })["catch"](function (e) {})
                        })
                    });
                    break;
                default:
                    return
            }
        },
        reinitiatePaymentForCreatedOrder: function (e, t, a, o) {
            var s = Object.assign({}, e),
                r = $(".retry-payment"),
                n = localStorage.getItem("is_shipment");
            if (t || o) return s = {
                payments: s.payments,
                order_id: localStorage.getItem("order_id"),
                total: s.total,
                is_shipment: "true" === n ? 1 : 0,
                source: SOURCE
            }, fn_main.showloader(), void fn_home.ajaxForm(s, "POST", "/checkout/reinitiate-payment", 6e4).done(function (e) {
                var t = parseJSON(e);
                localStorage.setItem("CreateOrderApiResponse", JSON.stringify(t));
                var o = !0;
                processCreateOrderResponse(t, a, o)
            }).fail(function () {
                r.html(orderFailureContent).show()
            }).always(function () {
                fn_main.hideloader()
            })
        },
        pushEEProceedToPayment: function (e) {
            function t() {
                try {
                    var e = function () {
                        var e = JSON.parse(localStorage.getItem("cart"));
                        try {
                            productInCart = JSON.parse(localStorage.getItem("allitem"))
                        } catch (t) {}
                        var a = e.ProductID.split(",").reduce(function (e, t) {
                                return "" !== t.trim() ? (e.push(t.trim()), e) : e
                            }, []),
                            o = e.ProductName.split(",").reduce(function (e, t) {
                                return "" !== t.trim() ? (e.push(t.trim()), e) : e
                            }, []),
                            s = productInCart.category_id ? productInCart.category_id.split(",").reduce(function (e, t) {
                                return "" !== t.trim() ? (e.push(t.trim()), e) : e
                            }, []) : [];
                        return {
                            v: a.reduce(function (e, t, r) {
                                return e.push({
                                    item_name: o[r],
                                    id: a[r],
                                    item_id: a[r],
                                    item_category: s[r]
                                }), e
                            }, [])
                        }
                    }();
                    if ("object" == typeof e) return e.v
                } catch (t) {
                    return []
                }
            }
            try {
                window.dataLayer && window.dataLayer.push({
                    event: "proceed_to_pay",
                    ecommerce: {
                        checkout: {
                            actionField: e.actionField,
                            products: t()
                        }
                    }
                })
            } catch (a) {}
        },
        logProceedToPayment: function (e) {
            try {
                var t = {
                    "Licious Wallet Status": localStorage.getItem("wallet_status"),
                    "Licious Wallet Used Value": Number(localStorage.getItem("wallet_usedValue")),
                    "Payment Method": localStorage.getItem("method"),
                    Total: Number(e),
                    "Coupon Name": localStorage.getItem("coupon_used"),
                    hub_id: fn_ll.getterLS("hub_id"),
                    "City Name": localStorage.getItem("city_name"),
                    "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                    "Coupon Type": localStorage.getItem("coupon_type"),
                    Checkout_Flow: checkout_flow()
                };
                fn_main.assignIncomingSource(t), fn_cart.gaAddRemoveEvent("Purchase_charged", "Purchase", JSON.stringify(t));
                var a = {
                    total: Number(e),
                    payment_method: "l_wallet" == fn_ll.getterLS("pay_source") ? "l_wallet" : fn_ll.getterLS("method")
                };
                t.Source = "Purchase", clevertap.event.push("Proceed to Payment Gateway", t), branch.logEvent("proceed_to_pay", a), fn_checkout.payments.pushEEProceedToPayment({
                    actionField: {
                        licious_wallet_status: localStorage.getItem("wallet_status"),
                        licious_wallet_used_value: Number(localStorage.getItem("wallet_usedValue")),
                        payment_method: localStorage.getItem("method"),
                        total: Number(e),
                        coupon_name: localStorage.getItem("coupon_used"),
                        coupon_type: localStorage.getItem("coupon_type"),
                        paytm_amt: localStorage.getItem("paytm_amt"),
                        step: 3,
                        option: "proceed_to_pay"
                    }
                })
            } catch (o) {}
        },
        initPay: function (e) {
            var t = $(".payment-cta").find(".init-pay"),
                a = location.href.search("/order-status/") !== -1,
                o = localStorage.getItem("pay_source");
            t.off(), t.on("click", function (e) {
                var s = {
                    screen_width: screen.width.toString(),
                    screen_height: screen.height.toString(),
                    browser_fingerprint_id: ""
                };
                if (branch.getBrowserFingerprintId(function (e, t) {
                        null === e && (s.browser_fingerprint_id = t)
                    }), t.addClass("disabled"), o = localStorage.getItem("pay_source"), !fn_checkout.payments.validateBeforePay(o) && "cod" !== o && "pod" !== o) return void(o || fn_checkout.alertBox("Select a payment method to continue", "", "alert"));
                var r = 0,
                    n = "/checkout/new-create-order";
                if ($(".lp-ll-selling-price").length) {
                    n = "/loyalty/loyalty-purchase", r = Number(loyaltyPayableAmount);
                    var i = {
                            licious_wallet_status: $(".lic-btn").hasClass("checked") ? "ACTIVE" : "INACTIVE",
                            licious_wallet_usedValue: $(".lic-btn").hasClass("checked") ? $(".usable-liwallet").html() : "0",
                            Payment_method: o,
                            total_amount: r.toString(),
                            plan_details: $(".lp-ll-sub-program").html() + ", " + ($(".lp-ll-marked-price").length > 0 ? $(".lp-ll-marked-price").attr("value") : "0") + ", " + $(".lp-ll-selling-price").attr("value"),
                            paytm_balance: fn_ll.getPaytmBalance(),
                            name: fn_ll.loyalty_plan_name,
                            city: fn_ll.getCityFromLS()
                        },
                        l = null === localStorage.getItem("loyaltyPaymentState") || void 0 === localStorage.getItem("loyaltyPaymentState") ? "purchase_loyalty" : localStorage.getItem("loyaltyPaymentState");
                    fn_ll.sendAnalyticsData(l, _extends({
                        source: "loyalty"
                    }, i))
                } else r = localStorage.getItem("payable");
                var d = (localStorage.getItem("pay_mode"), localStorage.getItem("default_addr_id")),
                    c = ($(".search-bank"), localStorage.getItem("saved_card"), localStorage.getItem("saved_bank"), $(this).attr("data-po"), localStorage.getItem("order_id")),
                    u = localStorage.getItem("cust_key"),
                    p = ($(".user_mobile").val(), localStorage.getItem("hub_id")),
                    m = localStorage.getItem("coupocreateOrderPaypaln_used"),
                    h = ($(".retry-payment"), fn_checkout.payments.getPaymentsObjectsForOtherMethod());
                switch (o) {
                    case "paypal":
                        if (a) return void fn_checkout.payments.createOrderPaypal(!0, c);
                        fn_checkout.payments.createOrderPaypal(!1, c);
                        break;
                    case "upi":
                        var f = function () {
                            $("#user-vpa").val();
                            localStorage.setItem("isCodPod", !1);
                            var t = {
                                customer_key: u,
                                hub_id: p,
                                source: SOURCE,
                                coupon: m,
                                address_id: d,
                                payments: [{
                                    type: "razorpay",
                                    amount_to_deduct: Number(r)
                                }],
                                total: Number(r)
                            };
                            return $(".lp-ll-selling-price").length ? t.loyalty_item = {
                                sub_program_id: subProgramId,
                                amount: $(".lp-ll-selling-price").attr("value")
                            } : t.user_data = s, 0 !== h.length && ! function () {
                                var e = t.payments;
                                h.forEach(function (a) {
                                    isNaN(parseInt(t.total)) && (t.total = 0), t.total += Number(a.amount_to_deduct), e.push(a)
                                })
                            }(), PAYMENTRAZORPAYOBJECT = {}, fn_checkout.razorPay.createPayment(PAYMENTRAZORPAYOBJECT, {
                                paused: !0,
                                message: "loading"
                            }), a ? (fn_checkout.payments.logProceedToPayment(t.total), fn_checkout.payments.reinitiatePaymentForCreatedOrder(t, a, o), {
                                v: void 0
                            }) : (fn_checkout.payments.logProceedToPayment(t.total), void fn_home.ajaxForm(t, "POST", n, 6e4).done(function (t) {
                                var a = parseJSON(t);
                                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, "upi")
                            }).fail(function () {
                                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                            }))
                        }();
                        if ("object" == typeof f) return f.v;
                        break;
                    case "saved_payments":
                    case "card":
                        var v = function () {
                            localStorage.setItem("isCodPod", !1);
                            var t = {
                                customer_key: u,
                                hub_id: p,
                                source: SOURCE,
                                coupon: m,
                                address_id: d,
                                payments: [{
                                    type: "razorpay",
                                    amount_to_deduct: Number(r)
                                }],
                                total: Number(r)
                            };
                            return $(".lp-ll-selling-price").length ? t.loyalty_item = {
                                sub_program_id: subProgramId,
                                amount: $(".lp-ll-selling-price").attr("value")
                            } : t.user_data = s, 0 !== h.length && ! function () {
                                var e = t.payments;
                                h.forEach(function (a) {
                                    isNaN(parseInt(t.total)) && (t.total = 0), t.total += Number(a.amount_to_deduct), e.push(a)
                                })
                            }(), PAYMENTRAZORPAYOBJECT = {}, fn_checkout.razorPay.createPayment(PAYMENTRAZORPAYOBJECT, {
                                paused: !0,
                                message: "loading"
                            }), a ? (fn_checkout.payments.logProceedToPayment(t.total), fn_checkout.payments.reinitiatePaymentForCreatedOrder(t, a, o), {
                                v: void 0
                            }) : (fn_checkout.payments.logProceedToPayment(t.total), void fn_home.ajaxForm(t, "POST", n, 6e4).done(function (t) {
                                var a = parseJSON(t);
                                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, "card")
                            }).fail(function (e) {
                                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                            }))
                        }();
                        if ("object" == typeof v) return v.v;
                        break;
                    case "netbanking":
                        var g = function () {
                            localStorage.setItem("isCodPod", !1);
                            var t = {
                                customer_key: u,
                                hub_id: p,
                                source: SOURCE,
                                coupon: m,
                                address_id: d,
                                payments: [{
                                    type: "razorpay",
                                    amount_to_deduct: Number(r)
                                }],
                                total: Number(r)
                            };
                            return $(".lp-ll-selling-price").length ? t.loyalty_item = {
                                sub_program_id: subProgramId,
                                amount: $(".lp-ll-selling-price").attr("value")
                            } : t.user_data = s, 0 !== h.length && ! function () {
                                var e = t.payments;
                                h.forEach(function (a) {
                                    isNaN(parseInt(t.total)) && (t.total = 0), t.total += Number(a.amount_to_deduct), e.push(a)
                                })
                            }(), PAYMENTRAZORPAYOBJECT = {}, fn_checkout.razorPay.createPayment(PAYMENTRAZORPAYOBJECT, {
                                paused: !0,
                                message: "loading"
                            }), a ? (fn_checkout.payments.logProceedToPayment(t.total), fn_checkout.payments.reinitiatePaymentForCreatedOrder(t, a, o), {
                                v: void 0
                            }) : (fn_checkout.payments.logProceedToPayment(t.total), void fn_home.ajaxForm(t, "POST", n, 6e4).done(function (t) {
                                var a = parseJSON(t);
                                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, o)
                            }).fail(function (e) {
                                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                            }))
                        }();
                        if ("object" == typeof g) return g.v;
                        break;
                    case "wallet":
                        var _ = function () {
                            localStorage.setItem("isCodPod", !1);
                            var t = {
                                customer_key: u,
                                hub_id: p,
                                source: SOURCE,
                                coupon: m,
                                address_id: d,
                                payments: [{
                                    type: "razorpay",
                                    amount_to_deduct: Number(r)
                                }],
                                total: Number(r)
                            };
                            return $(".lp-ll-selling-price").length ? t.loyalty_item = {
                                sub_program_id: subProgramId,
                                amount: $(".lp-ll-selling-price").attr("value")
                            } : t.user_data = s, 0 !== h.length && ! function () {
                                var e = t.payments;
                                h.forEach(function (a) {
                                    isNaN(parseInt(t.total)) && (t.total = 0), t.total += Number(a.amount_to_deduct), e.push(a)
                                })
                            }(), PAYMENTRAZORPAYOBJECT = {}, fn_checkout.razorPay.createPayment(PAYMENTRAZORPAYOBJECT, {
                                paused: !0,
                                message: "loading"
                            }), a ? (fn_checkout.payments.logProceedToPayment(t.total), fn_checkout.payments.reinitiatePaymentForCreatedOrder(t, a, o), {
                                v: void 0
                            }) : (fn_checkout.payments.logProceedToPayment(t.total), void fn_home.ajaxForm(t, "POST", n, 6e4).done(function (t) {
                                var a = parseJSON(t);
                                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, o)
                            }).fail(function () {
                                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                            }))
                        }();
                        if ("object" == typeof _) return _.v;
                        break;
                    case "l_wallet":
                        var y = function () {
                            localStorage.setItem("isCodPod", !1);
                            var t = {
                                customer_key: u,
                                hub_id: p,
                                source: SOURCE,
                                coupon: m,
                                address_id: d,
                                payments: [],
                                total: Number(r)
                            };
                            return $(".lp-ll-selling-price").length ? t.loyalty_item = {
                                sub_program_id: subProgramId,
                                amount: $(".lp-ll-selling-price").attr("value")
                            } : t.user_data = s, 0 !== h.length && ! function () {
                                var e = t.payments;
                                h.forEach(function (a) {
                                    isNaN(parseInt(t.total)) && (t.total = 0), t.total += Number(a.amount_to_deduct), e.push(a)
                                })
                            }(), a ? (fn_checkout.payments.logProceedToPayment(t.total), fn_checkout.payments.reinitiatePaymentForCreatedOrder(t, a, o), {
                                v: void 0
                            }) : (fn_checkout.payments.logProceedToPayment(t.total), void fn_home.ajaxForm(t, "POST", n, 6e4).done(function (t) {
                                var a = parseJSON(t);
                                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, o)
                            }).fail(function () {
                                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                            }))
                        }();
                        if ("object" == typeof y) return y.v;
                        break;
                    case "cod":
                    case "pod":
                        localStorage.setItem("isCodPod", !0);
                        var b = localStorage.getItem("wallet_status");
                        if ("ACTIVE" === b) return;
                        var k = {
                            customer_key: u,
                            hub_id: p,
                            source: SOURCE,
                            coupon: m,
                            address_id: d,
                            payments: [{
                                type: "COD",
                                amount_to_deduct: Number(r)
                            }],
                            total: Number(r)
                        };
                        if ($(".lp-ll-selling-price").length ? k.loyalty_item = {
                                sub_program_id: subProgramId,
                                amount: $(".lp-ll-selling-price").attr("value")
                            } : k.user_data = s, a) return fn_checkout.payments.logProceedToPayment(k.total), void fn_checkout.payments.reinitiatePaymentForCreatedOrder(k, a, o);
                        fn_checkout.payments.logProceedToPayment(k.total), fn_home.ajaxForm(k, "POST", n, 6e4).done(function (t) {
                            var a = parseJSON(t);
                            "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, o)
                        }).fail(function () {
                            fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                        });
                        break;
                    case "paytm":
                        fn_checkout.payments.createOrderPaytm();
                    default:
                        return
                }
            })
        },
        createOrder: function (e, t, a, o, s) {
            var r = parseFloat(localStorage.getItem("wallet_used")),
                n = localStorage.getItem("coupon_used"),
                i = localStorage.getItem("method");
            $(".li-checkout-page.payment").addClass("loader-div"), fn_home.ajaxForm({
                txn_id: e,
                addr_id: t,
                type: a,
                wallet: r,
                coupon: n
            }, "POST", "/checkout/confirm-order").done(function (o) {
                var l = JSON.parse(o);
                if ("success" == l.status) {
                    "pay on Delivery" == i ? s = i : "Cash on Delivery" == i && (s = "Card, Cash on Delivery"), "wallet" == a && (clevertap.event.push("Transaction Success", {
                        "Transaction ID": "",
                        Msg: "Success",
                        Status: "Authorized",
                        Type: a,
                        Source: ""
                    }), fn_cart.gaAddRemoveEvent("Transaction Success", "Transaction Success", i));
                    var d = {
                        "Total Amount": Number(l.orderDetails.cart_value),
                        "Coupon Name": n,
                        "Coupon Type": localStorage.getItem("coupon_type"),
                        "City Name": localStorage.getItem("city_name"),
                        "Hub ID": Number(localStorage.getItem("hub_id")),
                        Discount: l.orderDetails.discount_amount,
                        "Licious wallet Amount": r,
                        "Charged ID": l.order_id,
                        Currency: l.orderDetails.currency,
                        "Payment Method": s,
                        "Product ID": l.orderDetails.product_ids.toString(),
                        "Product Name": l.orderDetails.product_names.toString(),
                        Price: l.orderDetails.prices.toString(),
                        Quantity: localStorage.getItem("product_quantity"),
                        ShipmentIDs: localStorage.getItem("shipmentCount"),
                        ShipmentTypes: l.orderDetails.delivery_type,
                        ShipmentTime: l.orderDetails.delivery_slots,
                        AddressID: t,
                        "Transaction ID": e,
                        Checkout_Flow: checkout_flow()
                    };
                    fn_main.assignIncomingSource(d);
                    var c = {
                        Charged: "Yes",
                        "Total Amount": Number(l.orderDetails.cart_value),
                        City: localStorage.getItem("city_name"),
                        "Payment Method": a,
                        "Charged ID": l.order_id
                    };
                    localStorage.setItem("gtm_obj", JSON.stringify(c)),
                        ga("ecommerce:addTransaction", {
                            id: l.order_id,
                            revenue: Number(l.orderDetails.cart_value)
                        });
                    var u = localStorage.getItem("product_quantity"),
                        u = u.split(",");
                    $.map(l.orderDetails.product_names, function (e, t) {
                        ga("ecommerce:addItem", {
                            id: l.order_id,
                            name: e,
                            sku: l.orderDetails.product_ids[t],
                            price: l.orderDetails.prices[t],
                            quantity: u[t]
                        })
                    }), fn_cart.gaAddRemoveEvent("Charged", "Charged", JSON.stringify(d)), d.Source = "Charged", clevertap.event.push("Charged", d), fn_checkout.payments.flushLSD(), window.location.href = "/order-status/" + l.order_id + "?action=confirm_order"
                } else {
                    var p = JSON.parse(localStorage.getItem("payment-delivery")),
                        m = localStorage.getItem("wallet_status");
                    m = "ACTIVE" == m ? "True" : "False";
                    var h = {
                        Status: l.status,
                        "Error Message": l.message,
                        "Payment Method": i,
                        "Payment ID": e,
                        "Licious wallet used": m,
                        "Licious Amount": Number(localStorage.getItem("wallet_usedValue")),
                        Discount: Number(localStorage.getItem("discount_coupon")),
                        Total: p.Total
                    };
                    if (fn_cart.gaAddRemoveEvent("OrderCreate_Fail", "Order", JSON.stringify(h)), h.Source = "Order", clevertap.event.push("OrderCreate_Fail", h), "wallet" == a) {
                        var f = {
                            Msg: l.error.description,
                            Status: "Error",
                            Method: a,
                            hub_id: fn_ll.getterLS("hub_id"),
                            "City Name": localStorage.getItem("city_name"),
                            "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                            Source: ""
                        };
                        clevertap.event.push("Transaction Failed", f), fn_cart.gaAddRemoveEvent("Transaction Failed", "Transaction Failed", f)
                    }
                    Materialize.toast(l.message, 5e3), fn_cart.miniCart(), fn_checkout.setNavActive("redo-addr"), fn_checkout.setPageActive("redo-addr");
                    var v = $(".li-address-container"),
                        g = v.find("li").length,
                        _ = {
                            title: "Choose Address",
                            subtitle: "You have " + g + " saved address"
                        };
                    fn_checkout.setNavMessages(_, "addr"), $(".li-bill-details").hide(), $(".change-addr").hide(), $(".edit-shipments").hide(), $(".li-checkout-nav-steps").find(".li-nav-title .edit-shipment").hide();
                    var _ = {
                        title: "Payment methods",
                        subtitle: ""
                    };
                    fn_checkout.setNavMessages(_, "cards")
                }
            }).always(function () {
                $(".li-checkout-page.payment").addClass("complete"), $(".init-pay").removeClass("disabled"), setTimeout(function () {
                    $(".li-checkout-page.payment").removeClass("loader-div complete")
                }, 1200)
            })
        },
        createOrderPaypal: function (t, a) {
            localStorage.setItem("isCodPod", !1);
            var o = $("#paypal-payment-types > .selected")[0].dataset.paymentcode,
                s = localStorage.getItem("payable"),
                r = fn_checkout.payments.getPaymentsObjectsForOtherMethod(),
                n = location.href.search("/order-status/") !== -1,
                i = "paypal",
                l = {
                    customer_key: localStorage.getItem("cust_key"),
                    hub_id: localStorage.getItem("hub_id"),
                    source: SOURCE,
                    coupon: localStorage.getItem("coupon_used"),
                    address_id: localStorage.getItem("default_addr_id"),
                    payments: [{
                        type: "paypal",
                        amount_to_deduct: Number(s),
                        pg_mode: o,
                        "paypal-client-metadata-id": ggUID
                    }],
                    total: Number(s)
                };
            if ("paypal_one_time_pay" === o) {
                var d = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                if (l.payments[0].return_url = d + "/user/checkout#paypal-order-success", l.payments[0].cancel_url = d + "/user/checkout#paypal-order-fail", 0 !== r.length && ! function () {
                        var e = l.payments;
                        r.forEach(function (t) {
                            isNaN(parseInt(l.total)) && (l.total = 0), l.total += Number(t.amount_to_deduct), e.push(t)
                        })
                    }(), n || t && a) return fn_checkout.payments.logProceedToPayment(l.total), void fn_checkout.payments.reinitiatePaymentForCreatedOrder(l, n, i);
                fn_checkout.payments.logProceedToPayment(l.total), fn_main.showloader(), fn_home.ajaxForm(l, "POST", "/checkout/new-create-order", 6e4).done(function (t) {
                    var a = parseJSON(t);
                    "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" == a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), localStorage.setItem("CreateOrderApiResponse", t), processCreateOrderResponse(a, "paypal")
                }).fail(function (e) {
                    fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
                })
            } else if ("paypal_auto_pay" === o) return 0 !== r.length && ! function () {
                var e = l.payments;
                r.forEach(function (t) {
                    isNaN(parseInt(l.total)) && (l.total = 0), l.total += Number(t.amount_to_deduct), e.push(t)
                })
            }(), n || t && a ? (fn_checkout.payments.logProceedToPayment(l.total), void fn_checkout.payments.reinitiatePaymentForCreatedOrder(l, n, i)) : (fn_checkout.payments.logProceedToPayment(l.total), setTimeout(function () {
                fn_main.showloader()
            }, 1e3), void fn_home.ajaxForm(l, "POST", "/checkout/new-create-order", 6e4).done(function (t) {
                var a = parseJSON(t);
                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" == a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), localStorage.setItem("CreateOrderApiResponse", t), processCreateOrderResponse(a, "paypal")
            }).fail(function (e) {
                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
            }))
        },
        createOrderPaytm: function (t, a) {
            var o = localStorage.getItem("pay_source"),
                s = (parseFloat(localStorage.getItem("wallet_used")), localStorage.getItem("coupon_used"), localStorage.getItem("method"), location.href.search("/order-status/") !== -1),
                r = 0;
            r = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : localStorage.getItem("payable");
            var n = (localStorage.getItem("pay_mode"), localStorage.getItem("default_addr_id")),
                i = ($(".search-bank"), localStorage.getItem("saved_card"), localStorage.getItem("saved_bank"), $(this).attr("data-po"), localStorage.getItem("cust_key")),
                l = ($(".user_mobile").val(), localStorage.getItem("hub_id")),
                d = localStorage.getItem("coupon_used"),
                c = ($(".retry-payment"), {
                    screen_width: screen.width.toString(),
                    screen_height: screen.height.toString(),
                    browser_fingerprint_id: ""
                });
            branch.getBrowserFingerprintId(function (e, t) {
                null === e && (c.browser_fingerprint_id = t)
            });
            var u = fn_checkout.payments.getPaymentsObjectsForOtherMethod(),
                p = {
                    customer_key: i,
                    hub_id: l,
                    source: SOURCE,
                    coupon: d,
                    address_id: n,
                    payments: [{
                        type: "paytm",
                        amount_to_deduct: Number(r)
                    }],
                    total: Number(r)
                },
                m = "/checkout/new-create-order";
            return $(".lp-ll-selling-price").length ? (p.loyalty_item = {
                sub_program_id: subProgramId,
                amount: $(".lp-ll-selling-price").attr("value")
            }, m = "/loyalty/loyalty-purchase") : p.user_data = c, $(".li-checkout-page.payment").addClass("loader-div"), 0 !== u.length && ! function () {
                var e = p.payments;
                u.forEach(function (t) {
                    isNaN(parseInt(p.total)) && (p.total = 0), p.total += Number(t.amount_to_deduct), e.push(t)
                })
            }(), s || t && a ? (fn_checkout.payments.logProceedToPayment(p.total), void fn_checkout.payments.reinitiatePaymentForCreatedOrder(p, s, o, !0)) : (fn_checkout.payments.logProceedToPayment(p.total), void fn_home.ajaxForm(p, "POST", m, 6e4).done(function (t) {
                var a = parseJSON(t);
                "CREATED_WITH_SUCCESS" === a.status && "ORDER PLACED SUCCESSFULLY" === a.statusMessage ? fn_home.addDeviceData() : "error" === a.status && fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e), processCreateOrderResponse(a, o)
            }).fail(function () {
                fn_checkout.payments.activityAfterRazorpaySuccessOrError("orderFailure", e)
            }).always(function () {
                $(".li-checkout-page.payment").addClass("complete"), $(".init-pay").removeClass("disabled"), setTimeout(function () {
                    $(".li-checkout-page.payment").removeClass("loader-div complete")
                }, 1200)
            }))
        },
        payNow: function (e, t, a, o, s) {
            var r = parseFloat(localStorage.getItem("wallet_used")).toFixed(2),
                n = 0;
            n = $(".lp-ll-selling-price").length ? Number(loyaltyPayableAmount) : localStorage.getItem("payable");
            var i = localStorage.getItem("coupon_used");
            $(".li-checkout-page.payment").addClass("loader-div"), fn_home.ajaxForm({
                txn_id: e,
                orderId: t,
                type: o,
                wallet: r,
                payable: n,
                coupon: i,
                cust_key: a
            }, "POST", "/checkout/pay-now").done(function (e) {
                var t = JSON.parse(e);
                200 === t.statusCode ? (Materialize.toast("Payment successful", 3e3), setTimeout(function () {
                    window.location.reload()
                }, 2e3)) : (Materialize.toast("Some thing went wrong", 3e3), setTimeout(function () {}, 3e3))
            }).always(function () {
                $(".li-checkout-page.payment").addClass("complete"), $(".init-pay").removeClass("disabled"), setTimeout(function () {
                    $(".li-checkout-page.payment").removeClass("loader-div complete")
                }, 1200)
            })
        },
        retryPayments: function (e) {
            $(".retry-payment").find(".retry").on("click", function (t) {
                if (t.stopImmediatePropagation(), "payment" == e && (fn_cart.gaAddRemoveEvent("Purchase_fail_Tryagain", "Purchase", ""), clevertap.event.push("Purchase_fail_Tryagain", {
                        Source: "Purchase"
                    })), "track-page" == e) {
                    var a = {
                        Source: "Order",
                        "Order Status": localStorage.getItem("order_status")
                    };
                    fn_cart.gaAddRemoveEvent("Order_PoDfail_Tryagain", "order", JSON.stringify(a)), clevertap.event.push("Order_PoDfail_Tryagain", {
                        Source: "Order",
                        "Order Status": localStorage.getItem("order_status")
                    })
                }
                $(".retry-payment").hide()
            }), $(".retry-payment").find(".dismiss").on("click", function () {
                if ("track-page" == e) {
                    window.location.href = "/";
                    var t = {
                        Source: "Order",
                        "Order Status": localStorage.getItem("order_status")
                    };
                    fn_cart.gaAddRemoveEvent("Order_PoDfail_cash", "Order", JSON.stringify(t)), clevertap.event.push("Order_PoDfail_cash", {
                        Source: "Order",
                        "Order Status": localStorage.getItem("order_status")
                    })
                }
                $(".retry-payment").hide(), $(".payment-option-wrapper").hide(), setTimeout(function () {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 700, "swing")
                }, 500)
            }), $(".retry-payment").find(".create-order-pod").on("click", function (t) {
                t.stopImmediatePropagation();
                var a = localStorage.getItem("default_addr_id");
                "payment" == e && (fn_cart.gaAddRemoveEvent("Purchase_fail_PoD", "Purchase", ""), clevertap.event.push("Purchase_fail_PoD", {
                    Source: "Purchase"
                })), fn_checkout.payments.createOrder("", a, "COD")
            })
        },
        flushLSD: function () {
            var e = ["default_addr_id", "pay_mode", "pay_source", "payable", "rp_cust_token", "saved_card", "coupon_used"];
            $.map(e, function (e) {
                localStorage.setItem(e, "")
            })
        },
        execute: function () {
            this.fetchPayments()
        }
    },
    execute: function () {
        this.validateMobile(), this.validateEmail(), this.validateFlat(), this.validateName(), this.validateLoc(), this.payments.selectBank(), this.addAddress(), this.payments.showBanks(), this.updateAddr()
    }
}, fn_cart = {
    flag: !1,
    getAttributesString: function (e) {
        return "data-name='" + e.product_name + "' data-offered_product='" + e.offer_discount + "' data-discount=" + parseFloat(e.actual_price - e.base_price).toFixed(2) + " data-is_combo_child='" + e.is_combo_child + "' data-combo_msgs='" + JSON.stringify(e.combo_pop_up_messages) + "'"
    },
    showAndHideAlertToast: function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 5e3 : arguments[1],
            a = '<div class="variable-pay-toast">  \n                  <div class="variable-pay-message">' + e + "</div>\n                </div>";
        document.querySelector(".variable-pay-msgholder").innerHTML = a, $(".variable-pay-msgholder").show(), setTimeout(function () {
            $(".variable-pay-msgholder").hide()
        }, t)
    },
    miniCart: function (e) {
        return new Promise(function (t, a) {
            $(".li-cart-summary-wrapper").addClass("show"), $(".cart-screen").show(), $(".btn-proceed").addClass("disabled"), fn_cart.resetCart();
            var o = $(".li-cart-container").find(".item-available");
            o.find(".minus-one").unbind("click"), o.find(".plus-one").unbind("click"), o.find(".close").unbind("click"), fn_home.ajaxForm({}, "POST", "/new-cart").done(function (a) {
                var o = JSON.parse(a);
                if ($(".item-available ul").html(""), $(".item-unavailable ul").html(""), $(".item-unavailable").hide(), 200 === o.statusCode) {
                    var s, r, n, i, l, d, c, u, p, m, h;
                    ! function () {
                        if (fn_ll.populateCartData(o.data), o.data.hasOwnProperty("overdue")) {
                            var t = o.data.overdue,
                                a = t.message,
                                f = t.amount,
                                v = t.status;
                            v && f > 0 && a && null != a && fn_cart.showAndHideAlertToast(a)
                        }
                        s = o.data.products.concat(o.data.exotic), r = {
                            CartValue: o.data.cart_total,
                            ProductID: " ",
                            ProductName: " ",
                            Quantity: " ",
                            DeliveryCharge: o.data.shipping,
                            SavedAmount: o.data.discount,
                            UnavailableItems: " ",
                            product_category: "",
                            product_price: ""
                        }, n = [], i = 0, l = o.data.oss_products, l.length && ($(".item-unavailable").show(), $.map(l, function (e) {
                            r.UnavailableItems = r.UnavailableItems.concat(e.product_name + ","), r.Quantity = r.Quantity + Number(e.quantity) + ",";
                            var t = '<li><div class="item-detail"><span class="item-name">' + e.product_name + '</span><span class="item-qty">Qty:' + e.quantity + "</span></div></li>";
                            $(".item-unavailable ul").append(t)
                        })), fn_home.branchData = [];
                        var g = "";
                        if (s.length) {
                            d = 1, $.map(s, function (e) {
                                function t(e) {
                                    return "" != e.pieces ? e.pieces : e.weight
                                }
                                fn_home.branchData.push({
                                    item_name: e.product_name,
                                    item_id: e.product_id,
                                    quantity: e.quantity,
                                    item_category: e.category_name,
                                    price: e.base_price,
                                    currency: "INR"
                                }), r.Quantity = r.Quantity + Number(e.quantity) + ",", r.ProductID = r.ProductID.concat(e.product_id + ","), r.ProductName = r.ProductName.concat(e.product_name + ","), r.product_category = r.product_category.concat(e.category_name + ","), r.product_price = r.product_price.concat(e.base_price + ","), g = g.concat(e.category_id + ",");
                                var a = e.offer_discount && e.discount > 0 ? '<span class = "discount-price text-red rupee">' + parseFloat(e.base_price).toFixed(2) + '</span><span class = "base-price discount rupee">' + parseFloat(e.actual_price).toFixed(2) + "</span>" : '<span class = "discount-price text-red rupee">' + parseFloat(e.base_price).toFixed(2) + "</span>",
                                    s = '<li class="prd-' + e.product_id + '"><div class="item-desc"><span class="index-item">' + d++ + '</span><div class="item-name">' + e.product_name + "</div>" + ('<span class="close" ' + fn_cart.getAttributesString(e) + " data-prid = ") + e.product_id + '></span></div><div class="item-total"><span class="item-qty">' + t(e) + "</span>" + a + '<div class="qty">' + ('<span class="minus-one" ' + fn_cart.getAttributesString(e) + " data-prid = ") + e.product_id + " data-prqty=" + e.quantity + " data-stock=" + e.stock + '></span><span class="number prd-' + e.product_id + '">' + e.quantity + '</span><span class="plus-one" data-cartvalue=' + o.data.cart_total + " data-isoffer=" + o.data.offer_discount + " data-discount=" + o.data.discount + " data-offer=" + e.offer_type + ' data-prname = "' + e.product_name + '" data-prid = ' + e.product_id + " data-prqty=" + e.quantity + " data-stock=" + e.stock + "></span></div></div></li>";
                                $(".item-available ul").append(s), n = n.concat(e.quantity), localStorage.setItem("itemQuan", n.toString()), fn_cart.deleteCartItem($(".li-cart-container .close")), fn_cart.addCartItem($(".qty")), fn_cart.removeCartItem($(".qty"))
                            });
                            var _ = {
                                cart_value: o && o.data && o.data.cart_total ? String(o.data.cart_total) : "",
                                city_name: fn_ll.getterLS("city_name"),
                                hub_id: fn_ll.getterLS("hub_id"),
                                product_id: r && r.ProductID ? r.ProductID : "",
                                product_name: r && r.ProductName ? r.ProductName : "",
                                quantity: r && r.Quantity ? r.Quantity : "",
                                total_items: String(s.length),
                                "Category ID": g
                            };
                            if (localStorage.setItem("start_checkout_obj", JSON.stringify(_)), "loyalty_item" in o.data && null !== o.data.loyalty_item && 0 !== o.data.loyalty_item.length) renderCartLoyaltyItem(o.data.loyalty_item[0]), $(".mc-ll-top-banner-placeholder").hide(), $(".li-crossell-wrapper").css("box-shadow", "0 0 13px 0 rgba(0, 0, 0, 0.14)"), localStorage.setItem("loyalty_price", o.data.loyalty_item[0].price.toString()), localStorage.setItem("loyalty_discounted_price", o.data.loyalty_item[0].discounted_price.toString()), localStorage.setItem("loyalty_subprogram_name", o.data.loyalty_item[0].subprogram_name.toString()), localStorage.setItem("total_items", (o.data.products.length + o.data.exotic.length).toString()), localStorage.setItem("saved_amount", o.data.loyalty_delivery_discount.toString());
                            else {
                                var y = new LoyaltyBanners,
                                    b = "mc";
                                y.getLoyaltyBanner(b)
                            }
                            var k = 0,
                                C = 0;
                            c = !0, u = !1, p = void 0;
                            try {
                                for (m = o.data.cart_order_charges[Symbol.iterator](); !(c = (h = m.next()).done); c = !0) charge = h.value, "total" === charge.key.toLowerCase() ? k = charge.value : "deliverycharge" !== charge.key && "delivery_charge" !== charge.key || (C = charge.value)
                            } catch (w) {
                                u = !0, p = w
                            } finally {
                                try {
                                    !c && m["return"] && m["return"]()
                                } finally {
                                    if (u) throw p
                                }
                            }
                            fn_ll.loyalty_cart_value = k.toString(), fn_ll.loyalty_delivery_charges = C.toString(), fn_cart.cartSaveMessage(o.data, r), fn_cart.setTotalBar(k, C, o.data.delivery_free), localStorage.setItem("cart", JSON.stringify(r))
                        } else $(".mc-ll-top-banner-placeholder").html(""), $(".mc-ll-top-banner-placeholder").hide(), $(".li-crossell-wrapper").css("box-shadow", "0 0 13px 0 rgba(0, 0, 0, 0.14)"), l.length ? ($(".li-cart-wrapper").show(), $(".btn-proceed").removeClass("disabled")) : ($(".li-cart-wrapper").hide(), $(".li-crossell-wrapper").hide(), "review" == e ? fn_checkout.showContinueShopping() : fn_checkout.showContinueShopping("cart"));
                        fn.checkout_oos.cartCount()
                    }()
                } else 202 === o.statusCode && "empty_cart" == o.data.errorMessage ? ($(".li-cart-wrapper").hide(), $(".li-crossell-wrapper").css("box-shadow", "0 0 13px 0 rgba(0, 0, 0, 0.14)"), $(".li-crossell-wrapper").hide(), fn_checkout.showContinueShopping("cart"), $(".mc-ll-top-banner-placeholder").html(""), $(".mc-ll-top-banner-placeholder").hide()) : 400 === o.statusCode && ($(".li-crossell-wrapper").css("box-shadow", "0 0 13px 0 rgba(0, 0, 0, 0.14)"), $(".mc-ll-top-banner-placeholder").html(""), $(".mc-ll-top-banner-placeholder").hide(), fn_cart.miniCart());
                0 == fn_cart.flag && (fn_cart.stickyBarFixed(), fn_cart.flag = !0), t(a)
            }).fail(function (e) {
                $(".btn-proceed").removeClass("disabled"), a(e)
            }).always(function () {
                fn_cart.hideCart(), fn_cart.reloadCartCheckout(), fn_cart.OfferedProducts()
            })
        })
    },
    hideCart: function () {
        $(".li-cart-header .close").on("click", function (e) {
            $(".free-delivery-mssg").hide(), $(".li-checkout-nav-steps ul").removeClass("ul-wth-msg"), e.stopImmediatePropagation(), $(".update-cart").addClass("disabled"), fn_home.ajaxForm({}, "POST", "/new-cart").done(function (e) {
                var t = JSON.parse(e);
                200 === t.statusCode ? (fn_checkout.setNavActive("redo-addr"), 0 === $(".lp-ll-item").length && fn_checkout.setPageActive("redo-addr"), $(".li-cart-summary-wrapper").removeClass("show"), $(".cart-screen").hide(), $(".update-cart").removeClass("disabled")) : $(".update-cart").removeClass("disabled")
            }), fn.checkout_oos.cartCount(), $(".li-cart-summary-wrapper").removeClass("show"), $(".cart-screen").hide()
        }), $(".cart-screen").on("click", function () {
            $(".li-cart-summary-wrapper").removeClass("show"), $(".cart-screen").hide()
        })
    },
    resetCart: function () {
        $(".li-cart-wrapper").show(), $(".cart-empty-wrapper").hide()
    },
    appendCartItem: function (e) {
        function t(e) {
            return "" != e.pieces ? e.pieces + "Pieces" : e.weight
        }
        var a = $(".item-available ul li").length,
            o = e.offer_discount && e.discount > 0 ? '<span class = "discount-price text-red rupee">' + parseFloat(e.base_price).toFixed(2) + '</span><span class = "base-price discount rupee">' + parseFloat(e.base_price + e.discount / e.quantity).toFixed(2) + "</span>" : '<span class = "discount-price text-red rupee">' + parseFloat(e.base_price).toFixed(2) + "</span>",
            s = '<li class="prd-' + e.product_id + '"><div class="item-desc"><span class="index-item">' + Number(a + 1) + '</span><div class="item-name">' + e.product_name + "</div>" + ('<span class="close" ' + fn_cart.getAttributesString(e) + " data-prid = ") + e.product_id + '></span></div><div class="item-total"><span class="item-qty">' + t(e) + "</span>" + o + '<div class="qty">' + ('<span class="minus-one" ' + fn_cart.getAttributesString(e) + " data-prid = ") + e.product_id + " data-prqty=" + e.quantity + " data-stock=" + e.stock + '></span><span class="number prd-' + e.product_id + '">' + e.quantity + '</span><span class="plus-one" data-prid = ' + e.product_id + " data-prqty=" + e.quantity + " data-stock=" + e.stock + "></span></div></div></li>";
        $(".item-available ul").append(s), fn_cart.deleteCartItem($(".close")), fn_cart.addCartItem($(".qty")), fn_cart.removeCartItem($(".qty"))
    },
    cartSaveMessage: function (e, t) {
        if (e.messages.length > 0) {
            var a = "",
                o = "";
            $.each(e.messages, function (e, a) {
                if ("free_delivery" == a.condition) {
                    $(".btn-proceed").removeClass("disabled"), $(".complete-shipments").removeClass("disabled");
                    var o = '<div class="free-delivery-text">' + a.message + "</div>";
                    if ($(".free-delivery-wrapper").html(o), $(".free-delivery-wrapper").show(), "above_limit" == a.whichEvent) {
                        var s = {
                            "Cart Value": t.CartValue,
                            "Delivery Charge": t.DeliveryCharge,
                            "Saved Amount": t.SavedAmount,
                            "Product Name": t.ProductName,
                            Quantity: t.Quantity,
                            "City Name": localStorage.getItem("city_name"),
                            "Hub ID": Number(localStorage.getItem("hub_id"))
                        };
                        fn_cart.gaAddRemoveEvent("Cart_FreeDel_Apply", "CartView", JSON.stringify(s)), s.Source = "CartView", clevertap.event.push("Cart_FreeDel_Apply", s)
                    } else {
                        var s = {
                            "Cart Value": t.CartValue,
                            "Delivery Charge": t.DeliveryCharge,
                            "Saved Amount": t.SavedAmount,
                            "Product Name": t.ProductName,
                            Quantity: t.Quantity,
                            "City Name": localStorage.getItem("city_name"),
                            "Hub ID": Number(localStorage.getItem("hub_id"))
                        };
                        fn_cart.gaAddRemoveEvent("Cart_FreeDel_Remove", "CartView", JSON.stringify(s)), s.Source = "CartView", clevertap.event.push("Cart_FreeDel_Remove", s)
                    }
                }
            }), $.each(e.messages, function (e, t) {
                return "eggs" == t.condition ? ($(".btn-proceed").addClass("disabled"), a = "<span>" + t.message + "</span>", o = "warn", $(".warn-msg").html(a).show(), $(".li-cart-message").html(a).addClass(o), $(".li-cart-message").show(), !1) : void("cart_discount" == t.condition && ($(".checkout-proceed-wrapper .li-cart-message").removeClass("warn"), $(".btn-proceed").removeClass("disabled"), $(".complete-shipments").removeClass("disabled"), a = "<span>" + t.message + "</span>", o = "", localStorage.setItem("save-message", t.message), $(".li-cart-message").html(a), $(".li-cart-message").show()))
            })
        } else $(".li-cart-message").hide(), $(".warn-msg").html("").hide(), $(".complete-shipments").removeClass("disabled"), $(".btn-proceed").removeClass("disabled")
    },
    setTotalBar: function (e, t, a) {
        1 == a && (t = 0);
        var o = '<div class="pay-amt"><span class="total pay">Total</span><span class="rupees text-red rupee">' + e + '</span></div><div class="delivery-charges"><span class="delivery-text">Delivery Charge:</span><span class="delivery-pay rupee"> ' + t + "</span></div>";
        $(".checkout-wrapper").find(".amount").html(o)
    },
    stickyBarFixed: function () {
        $(".li-cart-header").innerHeight() + $(".li-cart-container").innerHeight() + 50 > window.innerHeight ? ($(".checkout-proceed-wrapper").addClass("fixed"), $(".li-cart-wrapper").css("margin-bottom", "125px")) : ($(".checkout-proceed-wrapper").removeClass("fixed"), $(".li-cart-wrapper").css("margin-bottom", "0px"))
    },
    deleteCartItem: function (e) {
        e.on("click", function (e) {
            e.stopImmediatePropagation();
            var t = $(this);
            if (t.data("is_combo_child")) return void fn_cart.showRemovePopup(t, "cart");
            var a = t.data("prid"),
                o = $(".li-cart-container").find("li.prd-" + a);
            fn_cart.addLoader(o), t.addClass("disabled");
            var s = "/new-cart-item-delete",
                r = {};
            r = window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders") ? {
                product_id: a,
                type: "reorder"
            } : {
                product_id: a
            }, fn_home.ajaxForm(r, "POST", s).done(function (e) {
                var a = JSON.parse(e);
                fn_cart.pushEERemoveFromCart(a), "success" == a.status ? (fn_cart.flag = !1, fn_cart.removeLoader(o), t.removeClass("disabled"), fn_cart.EventAddRemoveCart(a, "Remove Item", "CartView", t), fn_home.checkForCombo(a, "cart"), fn_home.sendBranchEvent("remove_from_cart", a.product, !0), 0 == a.item_count && ($(".li-cart-wrapper").hide(), $(".li-crossell-wrapper").hide(), fn_checkout.showContinueShopping("cart")), fn_cart.eggMessage(a.message), fn_cart.removeCartAnimation("li.prd-" + a.product_id), "" == a.popup_message || null == a.popup_message ? (fn_cart.updatePrdPage(a, "delete"), fn_cart.miniCart()) : ($(".li-cart-message").html("<span>" + a.popup_message + "</span>").addClass("warn"), $(".li-cart-message").show(), fn_cart.removeCartAnimation("li.prd-" + a.product_id), setTimeout(function () {
                    fn_cart.updatePrdPage(a, "delete"), fn_cart.miniCart()
                }, 5e3))) : (fn_cart.removeLoader(o), t.removeClass("disabled"), Materialize.toast("Something went wrong, please retry", 3e3))
            })
        })
    },
    updatePrdPage: function (e, t) {
        var a = e.product_id,
            o = "delete" == t ? e.item_count : e.quantity,
            s = e.product.next_available_by ? e.product.next_available_by : "",
            r = $(".li-main-container").find('[data-prod="' + a + '"]'),
            n = r.find(".action-slider"),
            i = r.find(".action-slider1"),
            l = n.find(".item-qty"),
            d = r.find(".product-message").find(".message"),
            c = i.find(".item-qty-pdp");
        "delete" == t ? (l.html(0), c.html(0), n.removeClass("slide"), i.removeClass("slide")) : 0 == o ? (l.html(o), c.html(o), n.removeClass("slide"), i.removeClass("slide")) : (l.html(o), c.html(o)), "" != s && d.length && d.html(s)
    },
    removeCartAnimation: function (e) {
        fn.checkout_oos.cartCount(), $(".item-available ul").find(e).addClass("remove"), setTimeout(function () {
            $(".item-available ul").find(e).removeClass("remove"), $(".item-available ul").find(e).remove()
        }, 500)
    },
    addCartItem: function (e) {
        e.find(".plus-one").on("click", function (e) {
            e.stopImmediatePropagation();
            var t = $(this),
                a = parseInt(t.parent().find(".number").html()),
                o = $(this).data("prid"),
                s = $(this).data("stock"),
                r = $(this).data("cartvalue"),
                n = $(this).data("isoffer"),
                i = $(this).data("discount"),
                l = $(this).data("offer"),
                d = $(this).data("prname"),
                c = a + 1;
            if (!(c <= s)) {
                var u = {
                    "Product Name": d,
                    Discount: i,
                    "New Cart Value": r,
                    Quantity: s,
                    "is Discounted Item": n,
                    "City Name": localStorage.getItem("city_name"),
                    "Hub ID": Number(localStorage.getItem("hub_id"))
                };
                return l && "undefined" != l && (u["Offer Name"] = l), fn_cart.gaAddRemoveEvent("Cart_Add_OOS", "CartView", JSON.stringify(u)), u.Source = "CartView", clevertap.event.push("Cart-Add Out of Stock", u), void Materialize.toast("Only " + s + " units left", 3e3)
            }
            fn_cart.updateCartItem(o, c, t, "add")
        }), e.find(".add").on("click", function (e) {
            e.stopImmediatePropagation();
            var t = $(this),
                a = $(this).data("prid"),
                o = $(this).data("crosssellid"),
                s = $(this).data("offertype"),
                r = $(this).data("prname"),
                n = $(this).data("baseprice"),
                i = $(this).data("position"),
                l = 1;
            t.addClass("disabled"), fn_cart.crosssellAddCartItem(a, l, o, s, r, n, t, i)
        })
    },
    showRemovePopup: function (e, t) {
        function a() {
            o.removeClass("show");
            var a = {
                "Product Name": e.attr("data-name"),
                Discount: e.attr("data-discount"),
                "is discounted item": e.attr("data-offered_product"),
                "City Name": fn_ll.getterLS("city_name"),
                "Hub ID": fn_ll.getterLS("hub_id")
            };
            "cart" === t ? fn_ll.sendAnalyticsData("Cart_ComboModal_DontRemove", a) : "shipment" === t && fn_ll.sendAnalyticsData("Del_ComboModal_DontRemove", a)
        }
        var o = $(".remove-child-product-background"),
            s = e.data("combo_msgs") || {
                title: "Remove combo product ?",
                description: "Removing a combo product or changing any quantity will result in cancellation of combo offer. Prices can change accordingly"
            },
            r = s.description,
            n = s.title;
        o.find(".title").html(n), o.find(".description").html(r), o.addClass("show"), o.unbind("click"), o.find(".close-icon").unbind("click"), o.find(".do-not-remove-cta").unbind("click"), o.find(".remove-cta").unbind("click"), o.find(".do-not-remove-cta, .cross-icon").click(function (e) {
            a()
        }), o.click(function (e) {
            e.target == this && a()
        }), o.find(".remove-cta").click(function (t) {
            o.removeClass("show"), e.data("is_combo_child", !1), e.data("is_combo", 1), e.click()
        })
    },
    removeCartItem: function (e) {
        e.find(".minus-one").on("click", function (e) {
            e.stopImmediatePropagation();
            var t = $(this);
            if (t.data("is_combo_child")) return void fn_cart.showRemovePopup(t, "cart");
            var a = parseInt(t.parent().find(".number").html()),
                o = $(this).data("prid"),
                s = ($(this).data("stock"), a - 1);
            if (0 == s) {
                event.stopImmediatePropagation();
                var r = "/new-cart-item-delete",
                    n = {};
                n = window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders") ? {
                    product_id: o,
                    type: "reorder"
                } : {
                    product_id: o
                }, fn_home.ajaxForm(n, "POST", r).done(function (e) {
                    fn_cart.flag = !1;
                    var a = JSON.parse(e);
                    fn_cart.pushEERemoveFromCart(a), "success" == a.status && (fn_cart.EventAddRemoveCart(a, "Remove Item", "CartView", t), fn_home.sendBranchEvent("remove_from_cart", a.product, !0), fn_home.checkForCombo(a, "cart"), 0 == a.item_count && ($(".li-cart-wrapper").hide(), $(".li-crossell-wrapper").hide(), fn_checkout.showContinueShopping("cart")), "" == a.popup_message || null == a.popup_message ? (fn_cart.updatePrdPage(a, "update"), fn_cart.OfferedProducts(), fn_cart.removeCartAnimation("li.prd-" + a.product_id), fn_cart.miniCart(), fn.checkout_oos.cartCount()) : ($(".li-cart-message").html("<span>" + a.popup_message + "</span>").addClass("warn"), $(".li-cart-message").show(), fn_cart.removeCartAnimation("li.prd-" + a.product_id), setTimeout(function () {
                        fn_cart.updatePrdPage(a, "update"), fn_cart.OfferedProducts(), fn_cart.miniCart(), fn.checkout_oos.cartCount()
                    }, 5e3)))
                })
            } else fn_cart.updateCartItem(o, s, t, "remove")
        })
    },
    crosssellAddCartItem: function (e, t, a, o, s, r, n, i) {
        var l = "/new-cart-item-update",
            d = $(".crossell-container").find(".productid-" + e);
        return fn_cart.addLoader(d), fn_home.ajaxForm({
            crosssell_id: a,
            product_id: e,
            quantity: t
        }, "POST", l).done(function (t) {
            var a = JSON.parse(t);
            if (fn_cart.pushEEAddToCart(a), "success" == a.status) {
                $(".li-crossell-wrapper .crossell-container .crossell").find(".productid-" + e).fadeOut(300, function () {
                    $(this).remove(), $(".li-crossell-wrapper .crossell-container .crossell").children("div").length < 1 ? $(".li-crossell-wrapper").hide() : $(".li-crossell-wrapper").show()
                }), fn.checkout_oos.cartCount(), fn_cart.miniCart();
                var o = {
                    "Product Name": a.product.product_name,
                    Discount: a.product.discount,
                    "Offer Name": a.product.offer_type,
                    "New Cart Value": a.total,
                    "Delivery Charge": a.shipping_charge,
                    "Saved Amount": "",
                    "is discounted item": a.product.offer_discount,
                    "City Name": localStorage.getItem("city_name"),
                    "Hub ID": Number(a.product.hub_id),
                    "Position of item": i,
                    Source: "CartView",
                    incoming_source: "cross_category"
                };
                if (fn_cart.gaAddRemoveEvent("Add-Cross Sell", "CartView", JSON.stringify(o)), clevertap.event.push("Add-Cross Sell", o), "delivery" == a.product.offer_type) {
                    var s = "<span>" + localStorage.getItem("offer_message") + "</span>";
                    $(".li-cart-message").html(s), $(".li-cart-message").show()
                }
            } else fn_cart.removeLoader(d), n.removeClass("disabled")
        }).fail(function () {
            fn_cart.removeLoader(d), n.removeClass("disabled")
        })
    },
    gaAddRemoveEvent: function (e, t, a) {
        ga("send", {
            hitType: "event",
            eventAction: e,
            eventCategory: t,
            eventLabel: a
        })
    },
    EventAddRemoveCart: function (e, t, a) {
        var o = arguments.length <= 3 || void 0 === arguments[3] ? void 0 : arguments[3],
            s = {
                "Product Name": e.product.product_name,
                Discount: e.product.discount,
                "New Cart Value": e.total,
                "Delivery Charge": e.shipping_charge,
                "Saved Amount": "",
                "is discounted item": e.product.offer_discount,
                "City Name": localStorage.getItem("city_name"),
                "Hub ID": Number(e.product.hub_id)
            };
        if (void 0 != o && 1 == o.data("is_combo")) {
            s.is_combo = 1;
            var r = o.data("combo_msgs") || {
                    alert_message: "Combo offer removed due to combo modification"
                },
                n = r.alert_message;
            fn_cart.showAndHideAlertToast(n, 5e3), o.removeData("is_combo")
        }
        e.product.offer_type && (s["Offer Name"] = e.product.offer_type), fn_cart.gaAddRemoveEvent(t, a, JSON.stringify(s)), s.Source = a, clevertap.event.push(t, s)
    },
    pushEEAddToCart: function (e) {
        try {
            var t = e.product.product_id,
                a = e.product.category_id,
                o = e.product.base_price,
                s = e.product.quantity,
                r = e.product.product_name,
                n = "INR";
            e && window.dataLayer && dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    currencyCode: "INR",
                    add: {
                        products: [{
                            item_id: t,
                            item_category: a,
                            price: o,
                            quantity: s,
                            currency: n,
                            item_name: r
                        }]
                    }
                }
            })
        } catch (i) {}
    },
    pushEERemoveFromCart: function (e) {
        try {
            var t = e.product.product_id,
                a = e.product.category_id,
                o = e.product.base_price,
                s = e.product.product_name,
                r = e.product.quantity,
                n = "INR";
            e && window.dataLayer && dataLayer.push({
                event: "remove_from_cart",
                ecommerce: {
                    currencyCode: "INR",
                    remove: {
                        products: [{
                            item_id: t,
                            item_category: a,
                            price: o,
                            quantity: r,
                            currency: n,
                            item_name: s
                        }]
                    }
                }
            })
        } catch (i) {}
    },
    updateCartItem: function (e, t, a, o) {
        var s = $(".li-cart-container").find("li.prd-" + e);
        a.addClass("disabled"), fn_cart.addLoader(s);
        var r = "/new-cart-item-update";
        return fn_home.ajaxForm({
            product_id: e,
            quantity: t
        }, "POST", r).done(function (e) {
            var t = JSON.parse(e);
            "remove" === o ? fn_cart.pushEERemoveFromCart(t) : "add" === o && fn_cart.pushEEAddToCart(t), "success" == t.status ? (fn_home.checkForCombo(t, "cart"), $(".qty").find(".prd-" + t.product_id).html(t.quantity), fn_cart.updatePrdPage(t, "update"), fn_cart.removeLoader(s), fn.checkout_oos.cartCount(), fn_cart.miniCart().then(function () {
                a.removeClass("disabled")
            }), fn_cart.eggMessage(t.message), $(".checkout-proceed-wrapper .pay-amt .rupees.text-red.rupee").html(t.grand_total), "add" == o && (fn_cart.EventAddRemoveCart(t, "Add-Item", "CartView"), fn_home.sendBranchEvent("add_to_cart", t.product)), "remove" == o && (fn_cart.EventAddRemoveCart(t, "Remove-Item", "CartView", a), fn_home.sendBranchEvent("remove_from_cart", t.product))) : fn_cart.removeLoader(s)
        }).fail(function (e) {
            Materialize.toast("Something went wrong, please retry", 3e3), fn_cart.removeLoader(s)
        })
    },
    eggMessage: function (e) {
        "" == e ? ($(".btn-proceed").removeClass("disabled"), $(".li-cart-message").removeClass("warn").hide()) : ($(".li-cart-message").show(), $(".btn-proceed").addClass("disabled"), $(".li-cart-message").html("<span>" + e + "</span>").addClass("warn"))
    },
    OfferedProducts: function () {
        fn_home.ajaxForm({}, "POST", "/new-offered-products").done(function (e) {
            var t = JSON.parse(e);
            if ($(".li-crossell-wrapper .crossell").html(""), "success" == t.status) {
                var a, o, s, r;
                ! function () {
                    var e = function (e, t, a, o) {
                        return "percentage" == a ? Math.round(e - e * t / 100) : "flat" == a ? Math.round(e - t) : "nooffer" == a && o > 0 ? Math.round(e - e * o / 100) : e
                    };
                    o = "hide", $(".li-crossell-wrapper").show(), s = " " + t.title + " ", $(".crossell-container .header").html(s),
                        localStorage.setItem("offer_message", t.delivery_free_message), r = 1, $.map(t.data, function (t) {
                            var s = "delivery" == t.crosssell.type || "nooffer" == t.crosssell.type ? "hide" : "show",
                                n = ("nooffer" == t.crosssell.type ? "hide" : "show", "nooffer" == t.crosssell.type && t.base_discount > 0 ? "show" : "hide"),
                                i = "nooffer" == t.crosssell.type && t.base_discount > 0 ? "hide" : "show";
                            "" == t.pieces ? weight = t.net : weight = t.pieces + "Pieces", "percentage" == t.crosssell.type ? (a = t.rounded_base_discount > 0 ? t.rounded_base_discount + " %Off" : t.crosssell.value + " %Off", o = "show") : "delivery" == t.crosssell.type ? (a = "Free Delivery", o = "show") : "flat" == t.crosssell.type ? (a = t.rounded_base_discount > 0 ? t.rounded_base_discount + " Off" : t.crosssell.value + " Off", o = "show") : "nooffer" == t.crosssell.type && (t.rounded_base_discount || t.base_discount) > 0 ? (a = (t.rounded_base_discount || t.base_discount) + " %Off", o = "show") : "nooffer" == t.crosssell.type && 0 == t.base_discount && (a = "", o = "hide");
                            var l = '<div class="crossell-products productid-' + t.crosssell.product_id + " csid-" + t.crosssell.parent_product_id + '"><div class="product-image"><img src=" ' + t.pr_image + '"></div><span class="offer-discount ' + o + '">' + a + '</span><div class="item-name"><span>' + t.merchandise_name + '</span></div><div class="item-detail ' + i + '"><span class="item-qty">' + weight + '</span><span class="discounted-price rupee ">' + e(t.base_price, t.crosssell.value, t.crosssell.type) + '</span><span class="base-price rupee ' + s + '">' + t.base_price + '</span></div><div class="item-detail ' + n + '"><span class="item-qty">' + weight + '</span><span class="discounted-price rupee">' + e(t.base_price, t.crosssell.value, t.crosssell.type, t.base_discount) + '</span><span class="base-price rupee">' + t.base_price + '</span></div><div class="add-item">' + ('<button class="add' + (2 == t.slot_available ? " disabled" : "") + '" data-position=') + r++ + " data-prid = " + t.crosssell.product_id + " data-crosssellid = " + t.crosssell.id + " data-offertype = " + t.crosssell.type + ' data-prname = "' + t.merchandise_name + '" data-baseprice = ' + e(t.base_price, t.crosssell.value, t.crosssell.type, t.base_discount) + ">ADD</button></div></div>";
                            $(".li-crossell-wrapper .crossell").append(l)
                        }), fn_cart.addCartItem($(".add-item"))
                }()
            } else $(".li-crossell-wrapper").hide()
        })
    },
    reloadCartCheckout: function () {
        $(".update-cart").on("click", function (e) {
            e.stopImmediatePropagation();
            var t = $(this);
            t.addClass("disabled"), $(".free-delivery-mssg").hide(), $(".li-checkout-nav-steps ul").removeClass("ul-wth-msg"), $(".co-ll-item-placeholder").html("");
            var a = JSON.parse(localStorage.getItem("cart")),
                o = localStorage.getItem("itemQuan"),
                s = {
                    "Cart Value": a.CartValue,
                    "City Name": localStorage.getItem("city_name"),
                    "Hub ID": Number(localStorage.getItem("hub_id")),
                    "Product ID": a.ProductID,
                    "Product Name": a.ProductName,
                    "Delivery Charge": a.DeliveryCharge,
                    "Saved Amount": a.SavedAmount,
                    "Unavailable Items": a.UnavailableItems
                },
                r = JSON.parse(JSON.stringify(s));
            "object" == typeof o.split(",") && (s.Quantity = o.split(",")), "string" == typeof o && (r.Quantity = o), fn_cart.gaAddRemoveEvent("Cart_UpdateCart", "CartView", JSON.stringify(r)), r.Source = "CartView", clevertap.event.push("Update Cart", r), fn_home.ajaxForm({}, "POST", "/new-cart").done(function (e) {
                var a = JSON.parse(e);
                200 === a.statusCode ? (fn_checkout.setNavActive("redo-addr"), 0 === $(".lp-ll-item").length && fn_checkout.setPageActive("redo-addr"), $(".li-cart-summary-wrapper").removeClass("show"), $(".cart-screen").hide(), t.removeClass("disabled")) : (Materialize.toast(a.data.message, 3e3), $(".li-cart-wrapper").hide(), $(".li-crossell-wrapper").hide(), $(".item-unavailable").hide(), fn_checkout.showContinueShopping("cart"))
            })
        })
    },
    removeLoader: function (e) {
        e.addClass("complete"), setTimeout(function () {
            e.removeClass("loader-div complete"), e.prop("disabled", !1)
        }, 250)
    },
    addLoader: function (e) {
        e.addClass("loader-div"), e.prop("disabled", !0)
    },
    execute: function () {}
}, fn_trackorder = {
    renderTrackOrderFaliure: function (e, t) {
        var a = '\n    <div class="timer-order-status" >\n              <img src="https://d2407na1z3fc0t.cloudfront.net/Banner/watch-timer.png" alt="">\n              <div class="minute-left">00</div>\n              <div class="second-left">00</div>\n              <div class="msg">Retry your<br> payment within 7mins</div>\n    </div>';
        $(".Faliure-Container").append(a), $(".first").css("display", "block"), $("#btn").css("display", "block");
        var o = e && e ? e.timer : 0,
            s = $(".timer-order-status"),
            r = s.find(".minute-left");
        console.log(r);
        var n = s.find(".second-left"),
            i = o;
        i = Math.floor(i), o ? ! function () {
            var e = setInterval(function () {
                0 === i && (clearInterval(e), window.location.reload(), $(".payment-option-wrapper").hide()), i > 0 ? i -= 1 : i = 0;
                var t = i / 60,
                    a = i % 60;
                t < 10 && (t = "0" + Math.floor(t)), a < 10 && (a = "0" + Math.floor(a)), r.html(t), n.html(a)
            }, 1e3);
            fn_trackorder.getPaymentStatusV2orderPage()
        }() : ($(".new-div").hide(), $(".first").hide(), s.hide())
    },
    clearCancelOrderUI: function () {
        var e = $(".order-placed-wrapper-static");
        e.find(".cancel-order").hide(), e.find(".cancel-duration-msg").hide(), e.find("hr").hide(), document.querySelector(".refund-toast-placeholder").innerHTML = ""
    },
    updateOrderCancellationUI: function (e, t, a) {
        return new Promise(function (o) {
            var s = $(".order-placed-wrapper-static");
            if (void 0 != e && null != e && void 0 != e.order_cancellation_meta && null != e.order_cancellation_meta) {
                var r = e.order_cancellation_meta,
                    n = r.title,
                    i = r.description,
                    l = r.sub_title,
                    d = r.Cancellation_reason,
                    c = r.disable_cancel_description;
                if (e && null !== e && e.enable && Array.isArray(d) && d.length && "5" != a) {
                    if (o(e), !is_cancel_button_pressed) {
                        var u = void 0,
                            p = void 0,
                            m = '<div class="order-cancellation-header">\n                              <div class="cross-icon">x</div>\n                              <div class="order-cancellation-text">' + n + "</div>\n                          </div>",
                            h = '<div class="action">\n                                  <div class="do-not-cancel-btn">DO NOT CANCEL</div>\n                                  <div class="cancel-order-btn">CANCEL ORDER</div>\n                              </div>\n                              <div class="bottom-msg-wrapper">\n                                *' + i + "\n                              </div>";
                        u = '<div class="options-wrapper">\n                        <div class="options-header">' + l + '</div>\n                        <div class="options">', d.map(function (e, t) {
                            u += '<div class="reason">\n                          <div>\n                              <input class="radio-custom" name="cancellation_reasons" type="radio" id="radio_' + t + '" value="' + e + '">\n                              <label for="radio_' + t + '" class="radio-custom-label">' + e + "</label>\n                          </div>\n                        </div>"
                        }), u += "</div></div>", p = m + ('<div class="column-wrapper">' + (u + h) + "</div>"), document.querySelector(".cancel-order-popup").innerHTML = "", document.querySelector(".cancel-order-popup").innerHTML = p
                    }
                    $(".cancel-order").unbind("click"), $(".cancel-order-btn").unbind("click"), $(".options").unbind("change"), $(".loc-screen").unbind("click"), $("do-not-cancel-btn").unbind("click"), $(".cross-icon").unbind("click"), void 0 === $(".options").find("input[type='radio'][name='cancellation_reasons']:checked").val() ? $(".cancel-order-btn").addClass("disabled") : $(".cancel-order-btn").removeClass("disabled"), $(".cancel-order").on("click", function () {
                        $(".loc-screen").show(), $(".cancel-order-popup").show(), is_cancel_button_pressed = !0, $(".options-header").removeClass("warning")
                    }), $(".options").on("change", function () {
                        $(".cancel-order-btn").removeClass("disabled"), $(".options-header").removeClass("warning")
                    }), $(".loc-screen, .do-not-cancel-btn, .cross-icon").on("click", function () {
                        $(".loc-screen").hide(), $(".cancel-order-popup").hide(), is_cancel_button_pressed = !1
                    }), $(".cancel-order-btn").on("click", function (e) {
                        if (e.stopImmediatePropagation(), e.stopPropagation(), $(".cancel-order-btn").hasClass("disabled")) $(".options-header").addClass("warning");
                        else {
                            var a = $(".options").find("input[type='radio'][name='cancellation_reasons']:checked").val();
                            fn_trackorder.cancelOrder(a, t)
                        }
                    }), s.find(".cancel-order").show(), e.is_visible ? s.find(".cancel-order").removeClass("disabled") : s.find(".cancel-order").addClass("disabled"), s.find(".cancel-duration-msg").show(), s.find("hr").show(), s.find(".cancel-duration-msg").html(c)
                } else fn_trackorder.clearCancelOrderUI();
                fn_trackorder.updateRefundToast(e, a)
            }
        })
    },
    updateRefundToast: function (e) {
        if (e && e.hasOwnProperty("refund_meta") && e.refund_meta.is_visible) {
            var t = e.refund_meta,
                a = t.weblink,
                o = t.refund_info,
                s = '<div class="refund-toast" ' + (a ? "" : 'style="cursor:default !important; pointer-events:none !important"') + ">\n                              " + (a ? "<a href = '" + a + "'>" : "<a>") + '  \n                                <div class="refund-toast-message" ' + (a ? "" : 'style="width:100%"') + ">" + o + "</div>\n                                " + (a ? '<div class="view-btn">View</div>' : "") + "\n                              </a>\n                            </div>";
            document.querySelector(".refund-toast-placeholder").innerHTML = s
        } else document.querySelector(".refund-toast-placeholder").innerHTML = ""
    },
    cancelOrder: function (e, t) {
        return new Promise(function (a) {
            fn_main.showloader(), $(".loc-screen").hide(), $(".cancel-order-popup").hide(), is_cancel_button_pressed = !0, fn_home.ajaxForm({
                reason: e,
                refund_type: "source",
                order_id: t
            }, "POST", "/checkout/cancel-order").done(function (e) {
                var t = JSON.parse(e);
                "success" === t.status ? (a(t), is_cancel_button_pressed = !1, fn_main.hideloader(), setTimeout(function () {
                    window.location.reload()
                }, 500)) : Materialize.toast(t.message, 5e3)
            }).fail(function (e) {
                var t = JSON.parse(e);
                Materialize.toast(t.message ? t.message : "Something went wrong. Try refreshing the page", 5e3)
            }).always(function () {
                fn_main.hideloader(), is_cancel_button_pressed = !1
            })
        })
    },
    updateOrderPrices: function (e) {
        for (var t = (e.total, e.split), a = {}, o = 0; o < t.length; o++) {
            var s = t[o].key;
            a[s] = t[o].value, "total" === s.toLowerCase() || "revisedamount" === s ? $("#" + s).html("₹ " + t[o].value) : $("#" + s).html(t[o].value)
        }
        var r = localStorage.getItem("payment_status"),
            n = localStorage.getItem("payable");
        null !== r && "undefined" != typeof r && "CREATED_WITH_FAILURE" === r && null !== n ? $("#Total-Absolute-Value").html(n) : $("#Total-Absolute-Value").html(a.total)
    },
    getInvoiceURL: function (e) {
        sendAnalyticsData("order_status_view_bill");
        var t = e.shipmentId,
            a = e.orderProcessingDate;
        return a = moment(a).format("YYYY-MM-DD"), fn_main.showloader(), new Promise(function (e, o) {
            fn_home.ajaxForm({
                order_id: t,
                order_date: a
            }, "GET", "/get-invoice-url").done(function (t) {
                var a = JSON.parse(t);
                200 == a.statusCode ? (fn_main.hideloader(), e(a.data)) : (fn_main.hideloader(), alert("Something went wrong try again."))
            }).fail(function (e) {
                console.log(e), o(e)
            })
        })["catch"](function (e) {
            fn_main.hideloader()
        })
    },
    renderPaintHeader: function (e, t) {
        var a = arguments.length <= 2 || void 0 === arguments[2] ? null : arguments[2],
            o = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
            s = arguments.length <= 4 || void 0 === arguments[4] ? null : arguments[4],
            r = arguments.length <= 5 || void 0 === arguments[5] ? null : arguments[5],
            n = $("#map").attr("data-maptype"),
            i = $(".Faliure-Container"),
            l = '\n  <div class="container-error-payment">\n        <img class="img-tag" >\n        <div class="text-section">\n          <p class="head-txt"></p>\n          <p class="sub-txt"></p>\n        </div>\n  </div>',
            d = '<div class="order-placed-container"><div class="scooter"><img src="' + e.image + '"></div><div class="order-success-container"><div class="order-success-wrapper"><div class="out-delivery-text">' + e.message + "</div></div></div></div>" + l + "<div id='map'></div>";
        if (0 === $("#map").length ? ($(".order-placed-wrapper-dynamic").html(d), $(".order-placed-wrapper-dynamic").append(i)) : ($(".scooter > img").attr("src", e.image), $(".out-delivery-text").html(e.message)), 3 === t)
            if (a) {
                var c = document.getElementById("locusIframe");
                null === c && "LocusWebView" !== n && o && Object.keys(o).length > 0 && fn_trackorder.renderLocousWebView(a, o.eta, o.badge_image)
            } else o && Object.keys(o).length > 0 && "GoogleMap" !== n && fn_trackorder.renderGoogleMap(o, r, s);
        else 4 === t && ($("#map").remove(), $(".order-placed-container").css("display", "block"), $(".scooter > img").attr("src", e.image), $("#Arriving-Container").css("display", "none"))
    },
    renderPaintContractContainer: function (e, t) {
        void 0 === e && (e = 0);
        var a = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2],
            o = arguments.length <= 3 || void 0 === arguments[3] ? "" : arguments[3],
            s = arguments.length <= 4 || void 0 === arguments[4] ? "" : arguments[4],
            r = !(arguments.length <= 5 || void 0 === arguments[5]) && arguments[5];
        if ("" !== s) {
            var n = '<div class=\'contact-container\'><div class="cancel-order">CANCEL ORDER</div><div class="contact-query"><div  style="text-align:left;margin-left: 16px;"> <p class="products-arriving" >' + t + '<p><p class="subtext-products-arriving"><img src="/img/house.svg" style="margin-right: 5px;"/>' + s + '<p><div class="seperator"></div></div><div id="Arriving-Container"> <div class="arrivalInfoText" style="margin: 0px 20px 0px auto"></div><div class="arrivalInfoBadge"><img/></div></div><hr/><div class="cancel-duration-msg"></div></div></div>';
            $(".order-placed-wrapper-static").html(n)
        } else 3 === e && r && "" !== o && "" !== a ? ($(".arrivalInfoText").html(a), $(".arrivalInfoBadge > img").attr("src", o)) : 3 === e ? ($(".cancel-order").addClass("shift"), $(".subtext-products-arriving").css("width", "40%"), $(".arriving").html('<div style="right: 2%;bottom: 32%;">' + a + "</div>"), $(".badge").html('<img src="' + o + '"  height="41"/>')) : ($(".arrivalInfoText").html(""), $(".arrivalInfoBadge").html(""), $(".arriving").html(""), $(".badge").html(""))
    },
    renderPaintTimeLine: function (e, t, a) {
        var o = "";
        if (e[1].cta_info && e[1].cta_info.value && t >= 2 ? $(".GenerateBill").css("cursor", "pointer") : "", 1 === t) $("#Arriving-Container").css("display", "none"), o = '<div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="normalLowerLine"></div><div class="firstStateTextContainer"><div class="stateText">' + e[0].status_message + '</div><div class="subStateText">' + e[0].message + '</div></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="normalTick"></div><div class="normalLowerLine"></div><div class="secondStateTextContainer" style="padding-bottom:40px"><div class="stateTextInactive">' + e[1].status_message + '</div></div><div><img src="/img/bill_disabled.svg" height="30px" style="margin-top:10px;margin-left:15%;" /></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="normalTick"></div><div class="normalLowerLine"></div><div class="secondStateTextContainer" style="padding-bottom:40px"><div class="stateTextInactive">' + e[2].status_message + '</div></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="normalTick"></div><div class="normalStateTextContainer"><div class="stateTextInactive">' + e[3].status_message + "</div></div></div></div>";
        else if (2 === t) {
            $("#Arriving-Container").css("display", "none");
            var s = e[1].cta_info && e[1].cta_info.value ? '<div class="GenerateBill" style=""><img src="/img/bill_generated.svg" height="30px" style="margin-left:15%;margin-top:10px;"/></div>' : '<div ><img src="/img/bill_disabled.svg" height="30px" style="margin-left:15%;margin-top:10px;"/></div>';
            o = '<div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="successLowerLine"></div><div class="firstStateTextContainer"><div class="stateText">' + e[0].status_message + '</div><div class="subStateText">' + e[0].message + '</div></div></div></div><div class="concentricStateBar"><div class="tickimageLineContainer"><div class="circle-ripple"></div><div class="concentricNormalLowerLine"></div><div class="concentricStateTextContainer"><div class="stateText">' + e[1].status_message + '</div><div class="subStateText rm-btm-padding">' + e[1].message + "</div>" + ('<div class="eg-message">\n              ' + (e[1].eg_message && e[1].eg_message.length ? "\n                " + e[1].eg_message + '\n                <span class="eg-tooltip">Please check the bill details</span>\n                <img src="/img/eg_info_icon.svg" class="eg-info-icon"/>\n                ' : "") + "\n             </div>") + "</div>" + s + '</div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="normalTick"></div><div class="normalLowerLine"></div><div class="secondStateTextContainer" style="padding-bottom:40px"><div class="stateTextInactive">' + e[2].status_message + '</div></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="normalTick"></div><div class="normalStateTextContainer"><div class="stateTextInactive">' + e[3].status_message + "</div></div></div></div>"
        } else 3 === t ? o = '<div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="successLowerLine"></div><div class="firstStateTextContainer"><div class="stateText">' + e[0].status_message + '</div><div class="subStateText">' + e[0].message + '</div></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="successLowerLine"></div><div class="secondStateTextContainer"><div class="stateText">' + e[1].status_message + '</div><div class="subStateText rm-btm-padding">' + e[1].message + "</div>" + ('<div class="eg-message">\n                  ' + (e[1].eg_message && e[1].eg_message.length ? "\n                    " + e[1].eg_message + '\n                    <span class="eg-tooltip">Please check the bill details</span>\n                    <img src="/img/eg_info_icon.svg" class="eg-info-icon"/>\n                    ' : "") + "\n                 </div>") + '</div><div class="GenerateBill"><img src="/img/bill_generated.svg" height="30px" style="margin-left:15%;margin-top:10px;"/></div></div></div><div class="concentricStateBar"><div class="tickimageLineContainer"><div class="circle-ripple"></div><div class="concentricNormalLowerLine"></div><div class="concentricStateTextContainer"><div class="stateText">' + e[2].status_message + '</div><div class="subStateText">' + e[2].message + '</div></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="normalTick"></div><div class="normalStateTextContainer"><div class="stateTextInactive">' + e[3].status_message + "</div></div></div></div>" : 5 == t ? ($("#Arriving-Container").css("display", "none"), o = '<div class="stateBar"><div class="tickimageLineContainer"><div class="rejectedCross"><img src="/img/rejectedcross.svg"/></div><div class="firstStateTextContainer"><div class="stateText">' + a.status_message + '</div><div class="subStateText">' + a.slot_message + "</div></div></div></div>") : ($(".badge").hide(), $(".arriving").hide(), o = '<div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="successLowerLine"></div><div class="firstStateTextContainer"><div class="stateText">' + e[0].status_message + '</div><div class="subStateText">' + e[0].message + '</div></div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="successLowerLine"></div><div class="secondStateTextContainer"><div class="stateText">' + e[1].status_message + '</div><div class="subStateText rm-btm-padding">' + e[1].message + "</div>" + ('<div class="eg-message">\n                ' + (e[1].eg_message && e[1].eg_message.length ? "\n                  " + e[1].eg_message + '\n                  <span class="eg-tooltip">Please check the bill details</span>\n                  <img src="/img/eg_info_icon.svg" class="eg-info-icon"/>\n                  ' : "") + "\n               </div>") + '</div></div></div><div class="stateBar"><div class="tickimageLineContainer"><div class="successTick"><img src="/img/checked.svg"/></div><div class="successLowerLine"></div><div class="secondStateTextContainer"><div class="stateText">' + e[2].status_message + '</div><div class="subStateText">' + e[2].message + '</div></div></div></div><div class="concentricStateBar"><div class="tickimageLineContainer"><div class="circle-ripple"></div><div class="concentricStateTextContainer"><div class="stateText">' + e[3].status_message + '</div><div class="subStateText">' + e[3].message + "</div></div></div></div>");
        $(".newOrderStatusContainer").html(o)
    },
    renderLocousWebView: function (e, t, a) {
        $("#map").html(""), $(".arrivalInfoText").html(""), $(".arrivalInfoBadge").html(""), $("<iframe>", {
            src: e,
            id: "locusIframe",
            frameborder: 0,
            scrolling: "no"
        }).appendTo("#map"), $(".order-placed-container").hide(), $("#map").show(), $("#map").attr("data-mapType", "LocusWebView"), $(".badge").hide(), $(".arriving").hide(), $("#Arriving-Container").show(), $(".cancel-order").addClass("shift"), $(".subtext-products-arriving").css("width", "40%"), $(".arrivalInfoText").html(t), $(".arrivalInfoBadge").html("<img src=" + a + ">")
    },
    showMap: function (e, t) {
        function a() {
            var e = p.getPosition(),
                t = m.getPosition(),
                a = map.getProjection(),
                s = a.fromLatLngToPoint(e),
                r = a.fromLatLngToPoint(t),
                l = new i(r.x - s.x, r.y - s.y),
                d = new i(l.x / 2, l.y / 2),
                c = new i(l.y, (-l.x)),
                h = new i(d.x + o * c.x, d.y + o * c.y),
                f = "M 0,0 q " + h.x + "," + h.y + " " + l.x + "," + l.y,
                v = map.getZoom(),
                g = 1 / Math.pow(2, -v),
                _ = {
                    path: f,
                    scale: g,
                    strokeWeight: 2,
                    fillColor: "none",
                    strokeOpacity: 1
                };
            u ? u.setOptions({
                position: e,
                icon: _
            }) : u = new n({
                position: e,
                clickable: !1,
                icon: _,
                zIndex: 0,
                map: map
            })
        }
        var o = .3,
            s = (google.maps.Map, google.maps.LatLng),
            r = google.maps.LatLngBounds,
            n = google.maps.Marker,
            i = google.maps.Point,
            l = new s(e.lat, e.lng),
            d = new s(t.lat, t.lng),
            c = new r;
        c.extend(l), c.extend(d), map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: {
                lat: (e.lat + t.lat) / 2,
                lng: (e.lng + t.lng) / 2
            },
            zoomControl: !1,
            mapTypeControl: !1,
            scaleControl: !1,
            streetViewControl: !1,
            rotateControl: !1,
            fullscreenControl: !1
        }), map.fitBounds(c), map.setOptions({
            draggable: !1
        });
        var u, p = new google.maps.Marker({
                position: l,
                draggable: !1,
                map: map,
                icon: "/img/location-home-icon.svg"
            }),
            m = new google.maps.Marker({
                position: d,
                draggable: !1,
                map: map,
                icon: "/img/pin-location.svg"
            }),
            h = '<div id ="infoBox">Delivering nearby</div>',
            f = new google.maps.InfoWindow({
                content: h
            });
        f.open(map, m), google.maps.event.addListener(f, "domready", function () {
            $(".gm-ui-hover-effect").hide()
        }), google.maps.event.addListener(map, "projection_changed", a), google.maps.event.addListener(map, "zoom_changed", a), google.maps.event.addListener(p, "position_changed", a), google.maps.event.addListener(m, "position_changed", a)
    },
    renderGoogleMap: function (e, t, a) {
        $(".order-placed-container").hide(), $("#map").show(), $("#map").attr("data-mapType", "GoogleMap");
        var o = {
                lat: Number(e.address_info.lat),
                lng: Number(e.address_info.lng)
            },
            s = {
                lat: Number(e.hub_info.lat),
                lng: Number(e.hub_info.lng)
            };
        fn_trackorder.showMap(o, s)
    },
    orderTrackStatus: function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
        return fn_home.ajaxForm({
            order_id: e
        }, "GET", "/order-track-status").done(function (a) {
            var o = JSON.parse(a);
            fn_main.hideloader(), mapAttributesForAnalytics(o.data.order, "track-order");
            var s = o.data.order.state_id,
                r = o.data.order.shipment_stages,
                n = o.data.order.shipment_messages,
                i = o.data.order.amount.payment_status,
                l = o.data.order.live_track_data.eta,
                d = o.data.order.live_track_data.badge_image,
                c = o.data.order.live_track_data.live_track_enabled,
                u = o.data.order.is_order_edited;
            if (fn_trackorder.renderPaintTimeLine(r, s, n), fn_trackorder.renderPaintContractContainer(s, n.items_message, l, d, "", c), !$(".shipment1.prd-" + e).data("bill_updated") && r[1].cta_info && r[1].cta_info.value && location.reload(), !$(".shipment1.prd-" + e).data("order_edited") && u && location.reload(), 3 === s) {
                var p = $("#map").attr("data-maptype"),
                    m = o.data.order.live_track_data,
                    h = o.data.order.live_track_data.eta,
                    f = o.data.order.live_track_data.badge_image,
                    v = o.data.order.track_link,
                    g = o.data.order.amount;
                "GoogleMap" === p && ($(".arriving").html('<div style="right: 5%;bottom: 25%; z-index:100;">' + h + "</div>"), $(".badge").html('<img z-index:100; src="' + f + '"  height="41"/>'), $(".badge").css("z-index", "100")), fn_trackorder.renderPaintHeader(n, s, v, m, f, h), fn_checkout.payments.renderPaymentBar(g, s, i)
            } else if (4 === s) {
                var g = o.data.order.amount;
                clearInterval(t), rr_fn.getReviewRating("Order status page", e), $(".download-invoice-container").show(), fn_trackorder.renderPaintHeader(n, s), fn_checkout.payments.renderPaymentBar(g, s, i)
            } else fn_trackorder.renderPaintHeader(n, s);
            fn_trackorder.updateOrderCancellationUI(o.data.customer_cancellation, e, o.data.order.state_id), is_cancel_button_pressed || fn_main.hideloader()
        }).fail(function (e) {
            console.log("errr=>", e), is_cancel_button_pressed || fn_main.hideloader()
        })
    },
    order_state_homepage: "",
    trackOrderHomePage: function () {
        return $(".shipment-title").css("float", "none"), new Promise(function (e, t) {
            fn_home.ajaxForm({}, "POST", "/track-order-home").done(function (t) {
                var a = JSON.parse(t);
                if (e(t), 200 === a.statusCode) {
                    var o = a.data.payment_info,
                        s = $(".track-order-container"),
                        r = a.data.shipments[0],
                        n = r.state_id,
                        i = (r.homepage_date.img_shipment, r.shipment_messages.image),
                        l = r.shipment_messages.message,
                        d = a.data.shipments[0].homepage_date.label,
                        c = 1 == r.shipment_items.length ? r.shipment_items.length + " item" : r.shipment_items.length + " items",
                        u = (r.homepage_date.placed_on_label, r.state_id - 1),
                        p = r.shipment_messages.status_message,
                        m = r.track_link;
                    s.find(".img-container .img1").attr("data-lazy", i), s.find(".cross-icon").attr("order_state", n);
                    var h = "\n            <span>\n              " + c + '\n            </span>\n            <span class="hometrack-btn"></span>\n            ';
                    s.find(".shipment-delivery").html(h), a.data.overdue.overdue_text && a.data.overdue.overdue_text.length && (s.find(".desc .eg-overdue-message").remove(), s.find(".desc").append('<div class="eg-overdue-message">' + a.data.overdue.overdue_text + "</div>")), $(".track-order-container").find(".track").attr("data-url", m), $(".track-order-container").find(".track").attr("data-url", m);
                    var f = a.data.shipments[0];
                    null != a.data && setTimeout(function () {
                        fn_trackorder.trackOrderHomePage()
                    }, 1e3 * f.track_refresh_interval), null == m || "" == m ? (s.find(".track").hide(), $(".hometrack-btn").show()) : (s.find(".track").show(), $(".hometrack-btn").hide()), $(".chargeddetail1").html(""), $.map(f.amount.split, function (e) {
                        var t = '<p><span class="chargedtype">' + e.attribute + '</span><span class="charged">' + e.value + "</span></p>";
                        $(".chargeddetail1").append(t)
                    }), $(".hometrack-btn").html("");
                    var v = "",
                        g = "CREATED_WITH_FAILURE" === o.payment_status && 0 === o.payble,
                        _ = "CREATED_WITH_FAILURE" === o.payment_status && o.payble > 0,
                        y = "CREATED_WITH_UNKNOWN" === o.payment_status,
                        b = ("CREATED_WITH_SUCCESS" === o.payment_status, $(".track-order-container .desc").find("title")),
                        k = $(".track-order-container .desc").find(".shipment-title"),
                        C = ($(".track-order-container .desc .shipment-delivery").find(".hometrack-btn"), $(".new-status-images"));
                    if (g) {
                        r.state_id <= 4 ? (l = "Your order is created", d = r.shipment_stages[r.state_id - 1].message) : (l = r.shipment_messages.status_message, d = r.shipment_messages.message), b.html(l), k.html(d);
                        var w = '<span class="view">View Order</span>';
                        v = "view", $(".hometrack-btn").html(w)
                    } else if (_) {
                        r.state_id <= 4 ? (l = r.shipment_stages[r.state_id - 1].status_message, d = r.shipment_stages[r.state_id - 1].message) : (l = r.shipment_messages.status_message, d = r.shipment_messages.message), b.html(l), k.html(d);
                        var S = '<span class="retry-pay">Retry Payment</span>';
                        v = "retrypay", $(".hometrack-btn").html(S)
                    } else if (y) {
                        r.state_id <= 4 ? (l = r.shipment_stages[r.state_id - 1].status_message, d = r.shipment_stages[r.state_id - 1].message) : (l = r.shipment_messages.status_message, d = r.shipment_messages.message), b.html(l), k.html(d);
                        var w = '<span class="view">View Order</span>';
                        v = "view", $(".hometrack-btn").html(w)
                    } else {
                        C.hide();
                        var I = "",
                            P = "";
                        if (r.state_id <= 4 ? (I = r.shipment_stages[r.state_id - 1].status_message, P = r.shipment_stages[r.state_id - 1].message) : 5 === r.state_id ? l = "Your order is cancelled" : (I = r.shipment_messages.status_message, P = r.shipment_messages.message), s.find(".title").html(I), s.find(".shipment-title").html(P), $(".hometrack-btn").html(""), 1 == f.amount.is_payble && null != m && 3 == f.state_id) {
                            var S = '<span class="track-pay">Track & Pay</span>';
                            v = "trackpay", $(".track").show(), $(".track").html(S)
                        } else if (1 == f.amount.is_payble && f.state_id >= 3) {
                            var S = '<span class="deliver-pay">Pay</span>';
                            v = "deliverpay", $(".track").show(), $(".track").html(S)
                        } else if (null != m && 3 == f.state_id) {
                            var S = '<span class="track-btn">Track Order</span>';
                            v = "track", $(".track").show(), $(".track").html(S)
                        } else if (1 == f.amount.is_payble && 4 == f.state_id) {
                            var w = '<span class="pay">Pay</span>';
                            v = "pay", $(".hometrack-btn").html(w)
                        } else {
                            var w = '<span class="view">View Order</span>';
                            v = "view", $(".hometrack-btn").html(w)
                        }
                    }
                    $(".payment-wrapper .pay-cta").on("click", function () {
                        var e = {
                            Screen: "Track"
                        };
                        fn_cart.gaAddRemoveEvent("Track_Pay_Order", "Track", JSON.stringify(e)), e.Source = "Track", clevertap.event.push("Track_Pay_Order", e), window.location.href = "/order-status/" + a.data.shipments[0].order_id
                    }), $(".locus-wrapper .close").on("click", function (e) {
                        e.stopPropagation(), $(".locus-wrapper").hide(), $(".payment-wrapper").hide();
                        var t = {};
                        fn_cart.gaAddRemoveEvent("TrackViewClose", "Track", JSON.stringify(t)), t.Source = "Track", clevertap.event.push("TrackViewClose", t)
                    }), $(".track-order-container").on("click", function (e) {
                        var t = a.data.shipments[0].parent_order_id + "#" + a.data.shipments[0].order_id;
                        if ("view" == v) {
                            var o = {
                                Screen: "Home"
                            };
                            fn_cart.gaAddRemoveEvent("Home_View_Order", "Order", JSON.stringify(o)), o.Source = "Order", clevertap.event.push("Home_View_Order", o), window.location.href = "/order-status/" + t
                        } else if ("pay" == v) {
                            var o = {
                                Screen: "Track"
                            };
                            fn_cart.gaAddRemoveEvent("Track_Pay_Order", "Order", JSON.stringify(o)), o.Source = "Order", clevertap.event.push("Track_Pay_Order", o), window.location.href = "/order-status/" + t
                        } else if ("deliverpay" == v) {
                            var o = {
                                Screen: "Home"
                            };
                            fn_cart.gaAddRemoveEvent("Home_DeliveredPay_Order", "Order", JSON.stringify(o)), o.Source = "Order", clevertap.event.push("Home_DeliveredPay_Order", o), window.location.href = "/order-status/" + t
                        } else if ("trackpay" == v) {
                            window.location.href = "/order-status/" + t;
                            var o = {
                                Screen: "Home"
                            };
                            fn_cart.gaAddRemoveEvent("Home_TrackPay_Order", "Order", JSON.stringify(o)), o.Source = "Order", clevertap.event.push("Home_TrackPay_Order", o)
                        } else if ("track" == v) {
                            window.location.href = "/order-status/" + t;
                            var o = {
                                Screen: "Home"
                            };
                            fn_cart.gaAddRemoveEvent("Home_Track_Order", "Order", JSON.stringify(o)), o.Source = "Order", clevertap.event.push("Home_Track_Order", o)
                        } else "retrypay" == v && (window.location.href = "/order-status/" + a.data.shipments[0].parent_order_id)
                    }), $(".track-order-container").find(".cross-icon").on("click", function (e) {
                        fn_trackorder.order_state_homepage = $(this).attr("order_state"), e.preventDefault(), e.stopImmediatePropagation(), $(".track-order-container").hide()
                    });
                    var x = s.find(".timeline-cont span");
                    $.each(x, function (e, t) {
                        e == u && $(t).addClass("active").find(".status-text").html(p), e < u && $(t).addClass("completed").find(".status-text").html("")
                    }), n != fn_trackorder.order_state_homepage && s.show()
                } else $(".track-order-container").hide(), rr_fn.getReviewRating("Home page")
            })
        })
    },
    getOrderIdFromurl: function () {
        var e = [],
            t = "",
            a = "";
        return window.location.href.indexOf("#") == -1 ? (e = window.location.href.split("/"), t = e[e.length - 1], t = t.split("?"), t = t[0]) : (e = window.location.href.split(/['\/','#']+/), t = e[e.length - 2], a = e[e.length - 1]), {
            parent_order_id: t,
            child_order_id: a,
            url: e
        }
    },
    orderTrackShipment: function () {
        $(".first").attr("pay_key", ""), fn_main.showloader(), $(".download-invoice-container").hide(), $(".review-rating-container").hide();
        var e = [],
            t = "",
            a = "";
        window.location.href.indexOf("#") == -1 ? (e = window.location.href.split("/"), t = e[e.length - 1], t = t.split("?"), t = t[0]) : (e = window.location.href.split(/['\/','#']+/), t = e[e.length - 2], a = e[e.length - 1]), fn_home.ajaxForm({
            orderId: t
        }, "POST", "/order-track-shipment").done(function (e) {
            var t = JSON.parse(e);
            if (fn_main.hideloader(), 200 === t.statusCode && null != t.data.loyalty_status && void 0 != t.data.loyalty_status) {
                var o = t.data.loyalty_status;
                if (o.is_subscribed) {
                    if (null !== o.message && (document.querySelector(".ll-message").innerHTML = '<div class="ll-free-message"> <span class="message-text"> ' + o.message + " </span></div>"), null !== o.purchased_banner) {
                        var s = document.querySelector(".ll-item");
                        s.innerHTML = '<div class="loyalty-purchased-item">\n                                                <img src="/img/loyalty_licious_logo.svg" />\n                                                <div class="separator"></div>\n                                                <div class="ll-details">\n                                                    <div class="ll-item-name"> <span> ' + o.purchased_banner.plan_details.program_name + '</span></div>\n                                                    <div class="ll-price-sec">\n                                                      <div class="ll-plan-name"> <span> ' + o.purchased_banner.plan_details.plan_name + ' </span> </div>\n                                                      <div> <span style="color:#313131; padding: 0 15px;opacity: 0.3"> | </span> </div>\n                                                      <div class="ll-act-price"> <span> ' + (o.purchased_banner.plan_details.strike_price - o.purchased_banner.plan_details.actual_price <= 0 ? "" : " ₹ " + o.purchased_banner.plan_details.strike_price) + ' </span> </div>\n                                                      <div class="ll-price"> <span> ₹ ' + o.purchased_banner.plan_details.actual_price + " </span> </div>\n                                                    </div>           \n                                                </div>\n                                          </div>";
                    } else if (null === o.purchased_banner) {
                        var r = new LoyaltyBanners,
                            n = "os";
                        r.getLoyaltyBanner(n)
                    }
                } else {
                    var r = new LoyaltyBanners,
                        n = "os";
                    r.getLoyaltyBanner(n)
                }
            }
            var i = t.data.payment_info,
                l = i.payment_status,
                d = i && i ? i.timer : 0;
            d ? (localStorage.setItem("isCodPod", !1), localStorage.setItem("pay-later-scenario", !1), localStorage.setItem("order_id", i.parent_order_id), localStorage.setItem("is_shipment", !1)) : (localStorage.setItem("order_id", t.data.shipments[0].order_id), localStorage.setItem("is_shipment", !0), localStorage.setItem("isCodPod", !0), localStorage.setItem("pay-later-scenario", !0), t.data.payment_info.total && localStorage.setItem("payable", t.data.payment_info.total)), l && "CREATED_WITH_FAILURE" === l && fn_trackorder.renderTrackOrderFaliure(i, t), null !== t.data.customer_type && "" !== t.data.customer_type && (localStorage.setItem("user_type", t.data.customer_type), analyticsAttributes.user_type = t.data.customer_type);
            if ($(".total-shipment").html(""), "success" == t.statusMessage) {
                var c = t.data.shipments;
                if ($.map(t.data.shipments, function (e, t) {
                        var a = e.order_processing_date,
                            o = '<span class="shipment1 prd-' + e.order_id + '" index="' + t + '" \n                     data-order_id="' + e.order_id + '" data-cust_key="' + e.customer_key + '" \n                     data-bill_updated="' + Boolean(e.shipment_stages[1].cta_info && e.shipment_stages[1].cta_info.value) + '"\n                     data-order_edited="' + e.is_order_edited + '"\n                     data-order-processing-date="' + a + '">\n                ' + e.shipment_messages.label + "\n              </span>";
                        $(".total-shipment").append(o)
                    }), localStorage.setItem("payment_status", l), "" != a) {
                    $(".shipment1.prd-" + a).addClass("active");
                    var u = c.filter(function (e) {
                        return e.order_id == a
                    });
                    localStorage.setItem("order_id", a), localStorage.setItem("cust_key", u[0].customer_key), fn_checkout.payments.fetchPayments("track-page", a), fn_trackorder.orderStatus(u[0], t.data.payment_info), fn_trackorder.selectShipment(t.data.shipments, t.data.payment_info)
                } else {
                    $(".shipment1.prd-" + t.data.shipments[0].order_id).addClass("active"), localStorage.setItem("cust_key", t.data.shipments[0].customer_key);
                    var p = "true" === localStorage.getItem("is_shipment");
                    p ? fn_checkout.payments.fetchPayments("track-page", t.data.shipments[0].order_id) : fn_checkout.payments.fetchPayments("track-page", localStorage.getItem("order_id")), mapAttributesForAnalytics(t.data.shipments[0], "order-shipments"), fn_trackorder.orderStatus(t.data.shipments[0], t.data.payment_info), fn_trackorder.selectShipment(t.data.shipments, t.data.payment_info);
                    var m = $(".container-error-payment").find(".head-txt"),
                        h = $(".container-error-payment").find(".sub-txt"),
                        f = $(".container-error-payment").find(".img-tag"),
                        v = t.data.payment_info.alert,
                        g = t.data.payment_info.payment_status;
                    if (localStorage.setItem("payment_status", g), v) {
                        var _ = v.header,
                            y = v.label;
                        switch (m.html(_), h.html(y), localStorage.setItem("payment_status", g), localStorage.setItem("headerDataOrderStatus", _), localStorage.setItem("subTxtDataOrderStatus", y), g) {
                            case "CREATED_WITH_FAILURE":
                                $(".first").show(), $("#btn1").show(), $(".container-error-payment").addClass("failure-case"), f.attr("src", "https://d2407na1z3fc0t.cloudfront.net/Banner/alert-pay.png");
                                break;
                            case "CREATED_WITH_UNKNOWN":
                                $(".container-error-payment").addClass("unknown-case"), f.attr("src", "https://d2407na1z3fc0t.cloudfront.net/Banner/not-confirm-icon.png");
                                break;
                            default:
                                $(".container-error-payment").hide(), $(".first").hide(), $("#btn1").hide()
                        }
                    } else $(".container-error-payment").hide(), $(".first").hide(), $("#btn1").hide()
                }
            } else $(".order-status-container").hide(), $(".payemnt-wrapper").hide();
            var b = localStorage.getItem("order_id"),
                k = t.data.payment_info.payment_status,
                C = t.data.shipments,
                w = C.findIndex(function (e, t) {
                    return e.order_id === b
                }),
                S = C[w],
                I = S && S.amount.is_payble,
                P = t.data.payment_info.timer || 0,
                x = S && S.state_id,
                O = t.data.payment_info.payble || 0;
            localStorage.setItem("showPaymentOption", !1), "CREATED_WITH_SUCCESS" === k && I && x > 2 ? ($(".first").show(), $("#btn1").show(), localStorage.setItem("showPaymentOption", !0), localStorage.setItem("before_paylater", !1), $(".payment-options-list").find('[data-payname="cod"]').addClass("disabled"), $(".payment-options-list").find('[data-payname="pod"]').addClass("disabled"), $(".payment-option-wrapper .page-title").show()) : ($(".payment-option-wrapper .page-title").hide(), localStorage.setItem("before_paylater", !0)), "CREATED_WITH_SUCCESS" !== k && (localStorage.setItem("showPaymentOption", !1), $(".total-shipment").show()), "CREATED_WITH_FAILURE" === k && P && O && localStorage.setItem("showPaymentOption", !0);
            var A = localStorage.getItem("showPaymentOption");
            "false" === A && $(".payment-option-wrapper").hide(), fn_trackorder.updateOrderCancellationUI(t.data.shipments[0].customer_cancellation, t.data.shipments[0].order_id, t.data.shipments[0].state_id)
        }).fail(function (e) {
            fn_main.hideloader()
        })
    },
    getPaymentStatusV2orderPage: function (e, t) {
        $(".first").css("display", "block"), $("#btn").css("display", "block");
        var a = '<div class="loader-dot"><span /><span /><span /><span /><span /></div>',
            o = '<div class="waiting-loader-container"><div>' + a + "</div><div>Meanwhile we are checking with bank for the payment confirmation</div></div>";
        fn_trackorder.getOrderIdFromurl().parent_order_id, $(".licious-wallet-container");
        $(".order-status-info-bars").html(o)
    },
    selectShipment: function (e, t) {
        var a = $($(".shipment1")).attr("data-order_id");
        window.location.href.indexOf("#") !== -1 && (url = window.location.href.split("#"), a = url[1]);
        var o = "",
            s = [],
            r = (localStorage.getItem("cust_key"), e.filter(function (e) {
                return e.order_id == a
            }));
        if ($(".first").hide(), $("#btn1").hide(), 4 === r[0].state_id) {
            fn_main.hideloader();
            var n = '<div class="billImage"><img src="/img/bill_generated.svg"></div><div class="textContainer">Invoice<span>Download your invoice copy</span></div><img class="downloadIcon" src="/img/download-arrow.png" download id="downloadId">';
            $(".download-invoice-container").html(n).show(), $(".payment-option-wrapper").show(), $(".payment-option-wrapper .page-title").show(), rr_fn.getReviewRating("Order status page", a)
        }
        var i = r[0].amount;
        if (fn_trackorder.updateOrderPrices(i), fn_trackorder.renderPaintTimeLine(r[0].shipment_stages, r[0].state_id, r[0].shipment_messages), fn_trackorder.renderPaintHeader(r[0].shipment_messages, r[0].state_id), 4 !== r[0].state_id) {
            var l = fn_trackorder.orderTrackStatus(a);
            s.push(l), o = setInterval(function () {
                var e = fn_trackorder.orderTrackStatus(a, o);
                s.push(e)
            }, 3e4)
        }
        $(".shipment1").on("click", function () {
            fn_trackorder.clearCancelOrderUI(), $(".review-rating-container").hide(), $(".download-invoice-container").hide(), $(".badge").hide(), $(".arriving .div").hide(), fn_main.showloader(), $(".first").hide(), $("#btn1").hide(), "0" === $(this).attr("index") ? $(".ll-item").show() : $(".ll-item").hide(), clearInterval(o);
            for (var a = 0; a < s.length; a++) s[a].abort();
            s = [];
            var r = $(this).attr("data-order_id"),
                n = e.filter(function (e) {
                    return e.order_id == r
                });
            n.parent_order_id;
            mapAttributesForAnalytics(n[0], "order-shipments");
            var i = (localStorage.getItem("cust_key"), n[0].amount);
            if (fn_trackorder.updateOrderPrices(i), $("#map").remove(), $("order-placed-container").css("display", "block"), 4 !== n[0].state_id) {
                var l = fn_trackorder.orderTrackStatus(r);
                s.push(l), o = setInterval(function () {
                    var e = fn_trackorder.orderTrackStatus(r, o);
                    s.push(e)
                }, 3e4)
            } else 4 === n[0].state_id && fn_main.hideloader();
            var d = $(this).attr("data-order_id"),
                c = $(this).attr("data-cust_key");
            localStorage.setItem("order_id", d), localStorage.setItem("cust_key", c), fn_cart.gaAddRemoveEvent("Shipment", "Order", " "), 4 === n[0].state_id && (rr_fn.getReviewRating("Order status page", r), $(".download-invoice-container").show()), clevertap.event.push("Shipment Switch Bar", {
                Source: "Order"
            }), $(".shipment1").removeClass("active"), $(this).addClass("active"), fn_trackorder.renderPaintTimeLine(n[0].shipment_stages, n[0].state_id, n[0].shipment_messages), fn_trackorder.renderPaintHeader(n[0].shipment_messages, n[0].state_id), fn_trackorder.orderStatus(n[0], t);
            var u = "true" === localStorage.getItem("is_shipment");
            u && fn_checkout.payments.fetchWalletNew(d, u)
        })
    },
    orderStatus: function (e, t) {
        fn_main.hideloader(), $(".split-pay").html(""), $(".chargeddetail").html(""), $(".chargeddetail1").html(""), $(".offer-wrapper .refer-banner").html(""), $(".shipmentitem-holder").show();
        var a, o;
        "" != e.amount.cod_info_message ? (a = "show", o = e.amount.cod_info_message) : (a = "hide", o = ""), fn_trackorder.renderPaintContractContainer(e.state_id, e.shipment_messages.items_message, "", "", e.delivery_address);
        var s = localStorage.getItem("payment_status"),
            r = localStorage.getItem("headerDataOrderStatus"),
            n = localStorage.getItem("subTxtDataOrderStatus"),
            i = $(".container-error-payment").find(".head-txt");
        switch (s) {
            case "CREATED_WITH_FAILURE":
                $(".first").show(), $("#btn1").show();
                var l = $(".container-error-payment").find(".sub-txt"),
                    d = $(".container-error-payment").find(".img-tag"),
                    c = r,
                    u = n;
                i.html(c), l.html(u), $(".container-error-payment").addClass("failure-case"), d.attr("src", "https://d2407na1z3fc0t.cloudfront.net/Banner/alert-pay.png");
                break;
            case "CREATED_WITH_UNKNOWN":
                var l = $(".container-error-payment").find(".sub-txt"),
                    d = $(".container-error-payment").find(".img-tag"),
                    c = r,
                    u = n;
                i.html(c), l.html(u), $(".container-error-payment").addClass("unknown-case"), $(".payment-option-wrapper").hide(), d.attr("src", "https://d2407na1z3fc0t.cloudfront.net/Banner/not-confirm-icon.png");
                break;
            default:
                $(".first").hide(), $("#btn1").hide()
        }
        fn_checkout.payments.renderPaymentBar(e.amount, e.state_id, s), 5 === e.state_id && $(".track-bar").hide();
        var p = " ";
        $(".shipment-item ul").html("");
        $.map(e.shipment_items, function (e) {
            function t(e) {
                return "" == e.shipment_quantity ? e.quantity : e.shipment_quantity
            }
            var a = e.discount > 0 ? "show" : "hide";
            p = p.concat(e.product_name + ","), localStorage.setItem("productName", p);
            var o = 0;
            e.is_grammage_edited && e.is_order_edited ? o = 1 : e.is_grammage_edited ? o = 2 : e.is_order_edited && (o = 3);
            var s = '<li id="prod_bar" class="' + (e.is_deleted ? "deleted" : "") + '" cat_slug="' + e.category_list_slug + '" prod_slug="' + e.product_slug + '">\n        <div class="item-desc">\n          <span class="index-item">\n            <img src="' + e.image + '">\n          </span>\n          <div class="item-name">\n            ' + e.product_name + (1 === o ? "*" : "") + '\n          </div>\n        </div>\n        <div class="item-total">\n          <span class="item-qty">\n            ' + e.weight + (2 === o ? "*" : "") + '\n          </span>\n          <span class="separator">|</span>\n          <span class="base-price discount rupee ' + a + '">\n            ' + e.actual_price + '\n          </span>\n          <span class="discount-price text-red rupee ">\n            ' + e.base_price + '\n          </span>\n          <span class="separator">|</span>\n          <span class="qty">qty:</span>\n          <span>\n            ' + t(e) + (3 === o ? "*" : "") + '\n          </span>\n        </div>\n        <div class="new-weight-message ' + (e.is_deleted ? "deleted" : "") + '">\n          ' + (e.new_weight_message && e.new_weight_message.length ? "\n            " + e.new_weight_message + '\n            <span class="eg-tooltip">Please check the bill details</span>\n            <img src="' + (e.is_deleted ? "/img/red_info_icon.svg" : "/img/eg_info_icon.svg") + '" class="eg-info-icon"/>\n            ' : "") + "\n        </div>\n      </li>";
            $(".shipment-item ul").append(s)
        });
        var m = '<div class="bill-heading">Bill Detail</div>';
        if ("Paid" === e.amount.payment_status) {
            var m = '<div class="bill-heading">Bill Detail</div><img class="paid_img" src="https://d2407na1z3fc0t.cloudfront.net/Banner/paid.png" />';
            $(".split-pay").html(m)
        } else {
            var m = '<div class="bill-heading">Bill Detail</div>';
            $(".split-pay").html(m)
        }
        $(".split-pay").html(m);
        var h, f = " ",
            v = "<table>",
            g = e.payment_status,
            _ = "",
            y = "",
            b = "";
        if ($.map(e.amount.split, function (e) {
                "discount" == e.key && (h = e.value), f = f.concat(e.attribute).concat(":" + e.value + ","), "total" === e.key.toLowerCase() ? _ = '\n          <tr class="total-type">\n            <td class="chargedtype">\n              ' + e.attribute + '\n            </td>\n            <td class="charged" style="float: right;">\n              <div id="' + e.key + '">₹ ' + e.value + "</div>\n            </td>\n          </tr>" : "revisedamount" === e.key ? y = '\n          <tr class="total-type">\n            <td class="chargedtype">\n              ' + e.attribute + '\n            </td>\n            <td class="charged" style="float: right;">\n              <div id="' + e.key + '">₹ ' + e.value + "</div>\n            </td>\n          </tr>" : "extragrammage" === e.key && "paid" === g ? b = '\n          <tr>\n            <td class="chargedtype eg-padding">\n              ' + e.attribute + '\n            </td>\n            <td class="charged" id="' + e.key + '">\n              ' + e.value + '\n            </td>\n          </tr>\n          <tr>\n            <td class="charged-message">\n              ' + e.message + "\n            </td>\n          </tr>" : v += '\n          <tr>\n            <td class="chargedtype">\n              ' + e.attribute + '\n            </td>\n            <td class="charged" id="' + e.key + '">\n              ' + e.value + '\n            </td>\n          </tr>\n          <tr>\n            <td class="charged-message ' + ("discount" === e.key || ("delivery_charge" === e.key || "deliverycharge" === e.key) && 0 === e.value ? "positive" : "") + '">\n              ' + e.message + "\n            </td>\n          </tr>"
            }), v += _, b && (v += b + y), v += "</table>", $(".chargeddetail").append(v), $(".variation-explainer").remove(), e.variation_explainer.status) {
            var k = function (e, t, a) {
                    var o = "";
                    return $.map(e, function (e) {
                        o += '\n            <div class="ve-line-items">\n              <div class="ve-li-message ' + ("ls_line_total" !== e.key && "line_total" !== e.key || 2 !== t && !a ? "" : "credit-msg") + '">' + e.message + '</div>\n              <div class="ve-li-amount">' + (e.amount < 0 ? "-" : "") + "₹ " + Math.abs(e.amount) + "</div>\n            </div>\n          "
                    }), o
                },
                C = function (e) {
                    if (1 === e.length) return e[0];
                    var t = "";
                    return $.map(e, function (e) {
                        t += "<div>• " + e + "</div>"
                    }), t
                },
                w = e.variation_explainer,
                S = '\n        <div class="variation-explainer">\n          <div class="ve-title-amount">\n            <div class="ve-title">\n              <img src="/img/ve_alert_icon.svg" class="ve-alert-icon" />\n              ' + w.title + '\n            </div>\n            <div class="ve-amount ' + (w.header_total_amount < 0 ? "less" : "extra") + '">\n              ' + (w.header_total_amount < 0 ? "-" : "") + "₹ " + Math.abs(w.header_total_amount) + '\n            </div>\n          </div>\n          <div class="ve-content">\n            ' + C(w.content) + '\n          </div>\n          <div class="ve-wallet-trans">\n            ' + k(w.line_items, w.extraGrammage.eg_status, w.edit_order.status) + "\n          </div>\n          " + (2 !== w.extraGrammage.eg_status && 3 !== w.extraGrammage.eg_status && 1 !== w.edit_order.status || "cod" === e.payment_type ? "" : '\n            <div class="ve-view-wallet">View Wallet</div>\n          ') + "\n        </div>\n        ";
            $(".shipment-footer").append(S), $(".ve-view-wallet").length && $(".ve-view-wallet").click(function () {
                window.location = "/user/profile#lic-wallet"
            })
        }
        $.map(e.amount.split, function (e) {
            if ("total" != e.key) {
                var t = '<p><span class="chargedtype1">' + e.attribute + '</span><span class="charged1">' + e.value + "</span></p>";
                $(".chargeddetail1").append(t)
            }
        }), $(".info-icon").hover(function () {
            var e = {
                "BreakUp of Payment": f
            };
            fn_cart.gaAddRemoveEvent("Payment Breakup icon", "Order", JSON.stringify(e)), e.Source = "Order", clevertap.event.push("Payment Breakup icon", e)
        }), $(".phone-call").on("click", function () {
            var t = {
                ShipmentNo: e.order_id,
                "Order Status": e.shipment_messages.status_message
            };
            fn_cart.gaAddRemoveEvent("Order_callus", "Order", JSON.stringify(t)), t.Source = "Order", clevertap.event.push("Call us", t)
        }), $(".email").on("click", function () {
            var t = {
                ShipmentNo: e.order_id,
                "Order Status": e.shipment_messages.status_message
            };
            fn_cart.gaAddRemoveEvent("Order_Email", "Order", JSON.stringify(t)), t.Source = "Order", clevertap.event.push("Email", t)
        });
        var I = '<span class="pay-text">Pay</span><span class="rupee">' + e.amount.total + "</span>";
        $(".pay-cta").html(I), $(".pay-cta").find("i").html(e.amount.total), $.map(e.offers, function (e) {
            var t = '<a href = "' + e.web_url + '" ><img src = "' + e.web_image_url + '"/> </a>';
            $(".offer-wrapper .refer-banner").append(t), $(".offer-wrapper .refer-banner").on("click", function () {
                var t = {
                    "Banner Name": e.name,
                    Position: e.id,
                    Type: "Visual",
                    Source: "Order"
                };
                fn_cart.gaAddRemoveEvent("Order_Promo", "Order", JSON.stringify(t)), sendAnalyticsData("order_status_view_banner"), clevertap.event.push("Promo Banner", t)
            })
        }), $(".offer-wrapper .refer-banner").cycle({
            slides: ">a",
            fx: "scrollHorz",
            timeout: 3e3,
            "pause-on-hover": !0
        }), $(".header-new").innerHeight() + $(".order-status-container").innerHeight() + 300 > window.innerHeight ? $(".payment-wrapper").addClass("fixed") : $(".payment-wrapper").removeClass("fixed")
    },
    execute: function () {}
}, fn_main = {
    showloader: function () {
        $(".loader").show()
    },
    hideloader: function () {
        $(".loader").hide()
    },
    formatDateandTime: function (e) {
        function t() {
            return o === !1 ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }

        function a() {
            return s === !1 ? ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
        var o = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
            s = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
            r = e.split(/[^0-9]/),
            n = new Date(r[0], r[1] - 1, r[2], r[3], r[4], r[5]),
            i = a()[n.getDay()] + " " + n.getDate() + " " + t()[n.getMonth()] + " " + n.getFullYear(),
            l = (n.getHours() % 12 ? n.getHours() % 12 : "12") + ":" + ("0" + n.getMinutes()).slice(-2) + " " + (n.getHours() >= 12 ? "PM" : "AM");
        return {
            day: i,
            time: l
        }
    },
    clearCart: function () {
        return new Promise(function (e, t) {
            fn_home.ajaxForm({}, "POST", "/reorder/clear-cart").done(function (t) {
                var a = JSON.parse(t);
                "success" == a.status && e(a)
            }).fail(function () {
                t("failed")
            }).always(function () {})
        })
    },
    throttle: function (e, t) {
        var a = void 0;
        return function () {
            var o = arguments,
                s = this;
            a || (e.apply(s, o), a = !0, setTimeout(function () {
                return a = !1
            }, t))
        }
    },
    showBottomAlertMsg: function (e, t) {
        var a = $(".add_message");
        a.html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info"> ' + e).show(), setTimeout(function () {
            a.hide()
        }, t)
    },
    getIncomingSource: function () {
        var e = new URLSearchParams(window.location.search),
            t = e.get("src");
        return t ? t : ""
    },
    getQuickCheckoutIncomingSource: function () {
        return window.location.href.includes("favourite-items") ? "favorite_items" : window.location.href.includes("past-orders") ? "past_order" : void 0
    },
    assignIncomingSource: function (e) {
        var t = sessionStorage.getItem("incoming_source");
        t && null !== t && "" !== t && e.Checkout_Flow && "quick_checkout" == e.Checkout_Flow && (e.incoming_source = t)
    },
    getPageName: function () {
        var e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0],
            t = "";
        return t = "/" === window.location.pathname ? e ? "homepage" : "home_page" : window.location.pathname.indexOf("/") === window.location.pathname.lastIndexOf("/") ? "category_page" : e ? "product_description_page" : "product_page"
    }
}, document.addEventListener("DOMContentLoaded", function () {
    fn_checkout.execute(), fn_cart.execute(), fn_trackorder.execute(), fn_checkout.paytm.addMoneyCTA()
}), $(document).on("click", ".GenerateBill", function (e) {
    e.stopImmediatePropagation();
    var t = $(".shipment1.active").attr("data-order_id"),
        a = $(".shipment1.active").attr("data-order-processing-date"),
        o = {
            shipmentId: t,
            orderProcessingDate: a
        };
    fn_trackorder.getInvoiceURL(o).then(function (e) {
        fn_home.downloadFIle(e, "invoice.pdf")
    })
}), $(document).on("click", "#prod_bar", function (e) {
    var t = $(this).attr("cat_slug"),
        a = $(this).attr("prod_slug");
    null !== t && "" !== t && null !== a && "" !== a && (window.location.href = "/" + t + "/" + a)
}), $(document).on("click", ".download-invoice-container", function (e) {
    e.stopImmediatePropagation();
    var t = $(".shipment1.active").attr("data-order_id"),
        a = $(".shipment1.active").attr("data-order-processing-date"),
        o = {
            shipmentId: t,
            orderProcessingDate: a
        };
    fn_trackorder.getInvoiceURL(o).then(function (e) {
        fn_home.downloadFIle(e, "invoice.pdf")
    })
}), $(document).on("click", ".help", function (e) {
    sendAnalyticsData("order_status_help")
}), $("#btn1").click(function () {
    $("html,body").animate({
        scrollTop: $(".payment-options-holder").offset().top
    }, "slow"), $(".first").hide()
});
var old_checkout = "old_checkout",
    quick_checkout = "quick_checkout",
    qc_incoming_source = fn_main.getQuickCheckoutIncomingSource(),
    branchData = [],
    is_combo_child = !1,
    char_limit = 90;
fn_home = {
    imageLazyLoad: function (e) {
        if ("IntersectionObserver" in window) {
            console.log("int_called");
            var t = new IntersectionObserver(function (e, t) {
                e.forEach(function (e) {
                    if (e.isIntersecting) {
                        var a = e.target,
                            o = a.getAttribute("data-lazy");
                        o && (a.setAttribute("src", o), t.disconnect())
                    }
                })
            });
            t.observe(e)
        } else {
            var a = entry.target,
                o = a.getAttribute("data-lazy");
            o && a.setAttribute("src", o)
        }
    },
    getAllDOMImages: function () {
        var e = document.querySelectorAll("img");
        e.forEach(fn_home.imageLazyLoad)
    },
    setFDUserAttributes: function () {
        return new Promise(function (e, t) {
            fn_home.ajaxForm({}, "GET", "/checkout/get-user-data").done(function (t) {
                var a = JSON.parse(t);
                e(a);
                var o = a.user_phone,
                    s = a.user_email,
                    r = a.user_name;
                r && window.fcWidget.user.setProperties({
                    firstName: r
                }), s && window.fcWidget.user.setProperties({
                    email: s
                }), o && window.fcWidget.user.setProperties({
                    phone: o
                })
            })
        })
    },
    downloadFIle: function (e, t) {
        var a = new XMLHttpRequest;
        a.open("GET", e, !0), a.responseType = "arraybuffer", a.addEventListener("load", function () {
            if (200 === a.status) {
                console.log(a.response), console.log(new Blob([a.response]));
                var e = new Blob([a.response]),
                    o = document.createElement("a");
                o.href = window.URL.createObjectURL(e), o.download = t, o.click()
            }
        }), a.send()
    },
    splitShipment: !1,
    isSplitShipment: function () {
        return fn_home.splitShipment
    },
    getNotifiedMsg: function () {
        var e = localStorage.getItem("notified-msg");
        return null != e && "" != e || (e = "Once available, you will be notified"), e
    },
    updateAvailabilityMsg: function (e, t) {
        var a = $('[data-prod="' + e.product.product_id + '"]');
        a.length && !a.find(".add-to-cart").hasClass("disabled") && e && e.product && e.product.next_available_by && null !== e.product.next_available_by && "" !== e.product.next_available_by && a.find(".product-message").find(".message").html(e.product.next_available_by)
    },
    checKForBottomMsg: function (e) {
        var t = e.product_inventory.next_available_by;
        return void 0 !== t && null !== t && "" !== t
    },
    ajaxForm: function (e, t, a, o) {
        return $.ajax({
            url: a,
            type: t,
            data: e,
            timeout: o ? o : 2e4,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
            }
        })
    },
    ajaxFormNC: function (e, t, a) {
        return $.ajax({
            url: a,
            type: t,
            data: e,
            timeout: 2e4
        })
    },
    carousel: function (e, t) {
        if ("made" == t) var a = {
            dots: !0,
            infinite: !1,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: !0
        };
        else var a = {
            infinite: !1,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: !0
        };
        $("." + e + " .item-slider").slick(a), $("." + e + " .item-slider").on("setPosition", function (t, a) {
            function o(e) {
                var t = $(e).css("transform"),
                    a = t.replace(/^matrix(3d)?\((.*)\)$/, "$2").split(/, /);
                return a[4]
            }
            var s = ($(".slick-track").css("translateX"), parseInt(o("." + e + " .slick-track")));
            s += 6
        })
    },
    sendAnalyticsData: function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        null === t.source && (t.source = "");
        var a = {
                city: localStorage.getItem("city_name"),
                hub: localStorage.getItem("hub_id"),
                user_type: null !== localStorage.getItem("user_type") ? localStorage.getItem("user_type") : "",
                logged_in: "true",
                total_orders: null !== localStorage.getItem("total_orders") ? localStorage.getItem("total_orders") : ""
            },
            o = {};
        switch (e) {
            case "Banner_impression":
                o = _extends({}, a, t);
                break;
            case "Banner_click":
                o = _extends({}, a, t);
                break;
            case "refer_knowmore":
                o = _extends({}, a, t);
                break;
            case "refer_shareothers":
                o = _extends({}, a, t);
                break;
            case "refer_copycode":
                o = _extends({}, a, t)
        }
        clevertap.event.push(e, o), ga("send", {
            hitType: "event",
            eventCategory: t.source,
            eventAction: e,
            eventLabel: JSON.stringify(o)
        })
    },
    branchData: [],
    sendBranchEvent: function (e, t) {
        var a = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2];
        try {
            var o = {
                quantity: t.quantity ? t.quantity : t[0].quantity,
                item_id: t.product_id ? t.product_id : t[0].product_id,
                price: t.base_price ? t.base_price : t[0].base_price,
                currency: "INR",
                item_name: t.product_name ? t.product_name : t[0].product_name
            };
            a && (o.quantity = "0"), branch.logEvent(e, o, function (t) {
                fn_home.logBranchError(t, e, o)
            })
        } catch (s) {
            fn_home.logBranchError(s, e, o)
        }
    },
    sendBranchCheckoutEvent: function (e, t) {
        try {
            var a = "begin_checkout" === e ? "1.0" : "2.0",
                o = {
                    checkout_step: a,
                    item_list: t
                };
            branch.logEvent(e, o, function (t) {
                fn_home.logBranchError(t, e, o)
            })
        } catch (s) {
            fn_home.logBranchError(s, e, o)
        }
    },
    sendBranchChargedEvent: function (e, t) {
        var a = fn_ll.getterSS("customer_type"),
            o = "PURCHASE";
        try {
            for (var s = (e["Product Name"] + ",").split(","), r = (e["Product ID"] + ",").split(","), n = (e.Price + ",").split(","), i = e.Quantity.split(","), l = [], d = 0; d < r.length - 1; d++) l.push({
                $content_schema: "COMMERCE_PRODUCT",
                $og_title: s[d],
                $price: Number(n[d]),
                $quantity: Number(i[d]),
                $sku: r[d],
                $product_name: s[d],
                $condition: "EXCELLENT",
                $currency: "INR"
            });
            var c = {
                    user_type: a,
                    transaction_id: t
                },
                u = $(".customer_key_value").attr("data-custkey"),
                p = {
                    event_name: o,
                    custom_data: c,
                    content_items: l,
                    customer_key: u
                };
            fn_ll.sendAnalyticsData("BRANCH_CHARGED_EVENT", _extends({}, p), !0), branch.logEvent(o, c, l, function (e) {
                fn_home.logBranchError(e, o, _extends({}, c, l))
            })
        } catch (m) {
            fn_home.logBranchError(m, o, _extends({}, c, l))
        }
    },
    addUserData: function (e) {
        branch.getBrowserFingerprintId(function (t, a) {
            var o = {
                customer_key: e,
                screen_width: screen.width.toString(),
                screen_height: screen.height.toString(),
                device_id: fn_home.getDeviceFingerPrint().toString()
            };
            null === t ? o.browser_fingerprint_id = a : o.browser_fingerprint_id = "", fn_home.ajaxForm(o, "POST", "/add-user-data").done(function (e) {
                console.log(e)
            })
        })
    },
    logBranchError: function (e, t, a) {
        if (null !== e) {
            t += "- catch";
            var o = $(".customer_key_value").attr("data-custkey"),
                s = {
                    error: e,
                    event_name: t,
                    event_data: a,
                    customer_key: o
                };
            fn_ll.sendAnalyticsData("BRANCH_ERR", _extends({}, s), !0), fn_home.ajaxForm(s, "POST", "/log-branch-err").done(function () {})
        }
    },
    homeRefer: function () {
        return new Promise(function (e, t) {
            fn_home.ajaxForm({}, "GET", "/home_page/get-config").done(function (a) {
                var o = JSON.parse(a);
                if (sessionStorage.setItem("customer_type", o.data.customer_type), o.data.hasOwnProperty("customer_chat") && 1 == o.data.customer_chat.enable) {
                    sessionStorage.setItem("customer_chat", !0);
                    var s = "true" === sessionStorage.getItem("customer_chat");
                    s ? $("#chat_opt").css("display", "inline-block") : $("#chat_opt").css("display", "none")
                } else sessionStorage.setItem("customer_chat", !1), $("#chat_opt").css("display", "none"), window.fcWidget && window.fcWidget.destroy();
                if (localStorage.setItem("configApiResponse", a), "success" === o.status.toLowerCase()) {
                    var r = '<a href="/user/profile#hogbucks-view"><div class="referrContainer"><div class="referImage"><img src="' + o.data.referral.referral_image_web + '" /></div><span class="referText">' + o.data.referral.referral_label_web + '</span><div class="referArrow"><img src="/img/play_symbol.png"/></div> </div></a>';
                    localStorage.setItem("user_type", o.data.referral.referral_user_type), localStorage.setItem("total_orders", o.data.referral.referral_total_orders), "TOP" === o.data.referral.referral_position ? $(".referral-banner-top").length > 0 && $(".referral-banner-top").append(r) : $(".referral-banner-bottom").length > 0 && $(".referral-banner-bottom").append(r);
                    var n = {
                            source: "Click",
                            banner_url: o.data.referral.referral_link_web,
                            banner_type: "Referral",
                            position: o.data.referral.referral_position,
                            list: "Home"
                        },
                        i = {
                            source: "Impression",
                            banner_url: o.data.referral.referral_link_web,
                            banner_type: "Referral",
                            position: o.data.referral.referral_position,
                            list: "Home"
                        },
                        l = !1;
                    $(window).on("scroll", function (e) {
                        var t = document.querySelector(".referrContainer");
                        if (!l && null !== t) {
                            var a = t.getBoundingClientRect();
                            a.top >= 0 && a.left >= 0 && a.right <= (window.innerWidth || document.documentElement.clientWidth) && a.bottom <= (window.innerHeight || document.documentElement.clientHeight) && (fn_home.sendAnalyticsData("Banner_impression", i), l = !0)
                        }
                    }), $(".referrContainer").on("click", function () {
                        fn_home.sendAnalyticsData("Banner_click", n)
                    }), e(o)
                } else t("error")
            })
        })
    },
    getDeviceFingerPrint: function () {
        var e = new ClientJS,
            t = e.getFingerprint();
        return t
    },
    validateReferralMsg: function () {
        return null !== sessionStorage.getItem("auto_ref_code") && "" !== sessionStorage.getItem("auto_ref_code") && null !== sessionStorage.getItem("auto_ref_msg_cart") && "" !== sessionStorage.getItem("auto_ref_msg_cart")
    },
    addDeviceData: function () {
        return new Promise(function (e, t) {
            null !== sessionStorage.getItem("checkout_flow") && "" !== sessionStorage.getItem("checkout_flow") && sessionStorage.removeItem("checkout_flow"), null !== sessionStorage.getItem("auto_ref_code") && "" !== sessionStorage.getItem("auto_ref_code") && fn_home.ajaxForm({
                device_uid: fn_home.getDeviceFingerPrint().toString(),
                request_check_type: "coupon",
                request_check_entity: sessionStorage.getItem("auto_ref_code")
            }, "POST", "/home_page/add-device-data").done(function (t) {
                e(t);
                var a = JSON.parse(t);
                "200" === a.statusCode.toString()
            }).fail(function (e) {
                t("error"), console.log(e)
            }).always(function () {
                sessionStorage.removeItem("auto_ref_code"), sessionStorage.removeItem("auto_ref_msg"), sessionStorage.removeItem("auto_ref_msg_cart"), sessionStorage.removeItem("auto_ref_msg_pay")
            })
        })
    },
    getreferral: function () {
        fn_main.showloader(), fn_home.ajaxForm({}, "GET", "/home_page/get-referral").done(function (e) {
            var t = JSON.parse(e);
            "success" === t.status.toLowerCase() && ($(".re-code").html(t.referral_key.code), $(".refer-content").html(t.referral_key.body.replace(/\n/g, "<br/>")), $(".refer-text").html(t.referral_key.terms), $(".refer-header").html(t.referral_key.title), $(".refer-and-earn-link a").html(t.referral_key.deeplink_text), $(".wallet-img").attr("src", t.referral_key.image_web), localStorage.setItem("total_orders", t.referral_key.total_orders), localStorage.setItem("user_type", t.referral_key.user_type), $(".share").html('<a href="mailto:?subject=' + t.referral_key.email_subject + "&body=" + encodeURIComponent(t.referral_key.message) + '"><img src="/img/share.png" /> </a>'))
        }).always(function () {
            fn_main.hideloader()
        })
    },
    homeExplore: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-explore-home").done(function (e) {
            e = JSON.parse(e), "success" == e.status ? ($(".explore-category").find(".img-loader").remove(), $.each(e.data, function (e, t) {
                var a = '<li><a href="/' + t.slug + '" data-index="' + e + '" data-text="' + t.cat_name + '" data-section="explore"><span class = "img-container"><img data-lazy="' + t.cat_tile_img + '" alt="' + t.cat_tile_img + '" title ="' + t.cat_tile_img + '"></span><span>' + t.cat_name + "</span>";
                $(".cat-list-tiles").append(a)
            }), ga("send", {
                hitType: "event",
                eventCategory: "ScreenHome - ExploreByCategory",
                eventAction: "Impression",
                eventLabel: "Explore by category"
            })) : $(".cat-list-tiles").hide(), fn_home.getAllDOMImages()
        }).always(function () {
            fn_home.gaClicks($(".cat-list-tiles").find("a"), "ExploreByCategory")
        })
    },
    campaignTnc: function () {
        fn_home.ajaxForm({}, "GET", "/campaigntnc").done(function (e) {
            var t = JSON.parse(e);
            if ($(".404-error-handler-image").hide(), "success" === t.status && t.data.campaigntnc.length > 0) {
                $(".campaign-tnc-container").html(""), $(".other-tnc-container").html("");
                var a = t.data.campaigntnc[0].campaigntnc,
                    o = t.data.campaigntnc[0].othertnc;
                $.map(a, function (e, t) {
                    var a = 0,
                        o = e.title,
                        s = e.content;
                    content = "", $.map(s, function (e, t) {
                        var o = e.description,
                            s = "";
                        $.map(o, function (e, t) {
                            s += "<li>" + e + "</li>"
                        }), 1 === e.active_flag && (a += 1, content += '<div class="col s12 sub-heading"><h6>' + a + ") " + e.offer_name + '</h6></div><div class="col s12 list-points"><ul>' + s + "</ul></div>")
                    });
                    var r = '<div class="container"><div class="row"><div class="col 12">&nbsp;<br/><br/></div><div class="col s12 heading"><h5>' + o + "</h5></div>" + content + "</div></div>";
                    $(".campaignDiv").append(r)
                }), $.map(o, function (e, t) {
                    var a = e.title,
                        o = e.content,
                        s = "";
                    $.map(o, function (e, t) {
                        var a = e.description,
                            o = "";
                        $.map(a, function (e, t) {
                            o += '<li class="other-tnc-list">' + e + "</li>"
                        }), s += '<div class="other-tnc-container"><div class="other-tnc-header"><u>' + e.tnc_name + '</u></div><div class="col s12 list-points"><ul>' + o + "</ul></div></div>"
                    });
                    var r = '<div class="container tnc"><p  margin-top: 0pt; margin-bottom: 14pt; font-size: 12pt; "><a name="_gjdgxs"></a><strong><u><span style="font-family: Times;font-size:20px;font-weight:bold;">' + a + '</span></u></strong></p></div><div class="container" ><div class="row"><div class="col 12">&nbsp;<br/><br/></div>' + s + "</div>";
                    $(".tncDiv").append(r)
                })
            } else $(".404-error-handler-image").show()
        })
    },
    homeCategory: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-categories-home").done(function (e) {
            e = JSON.parse(e), "success" == e.status ? $.each(e.data, function (e, t) {
                var a = '<li>\n                              <a href="/' + t.slug + '" class="enabled"  data-id="' + t.id + '" data-section="topbar"\n                              data-text="' + t.cat_name + '" data-index="' + e + '" data-slug="' + t.slug + '">\n                                <img class="cat-icon" src="' + t.web_icon + '" icon-active="' + t.web_icon_active + '" \n                                icon-inactive="' + t.web_icon + '">\n                                ' + t.cat_name + "\n                              </a>\n                            </li>";
                $(".cat-list ul.categories").append(a), $(".prod_cat_id").val("set"), ga("send", {
                    hitType: "event",
                    eventCategory: "ScreenHome - TopMenu",
                    eventAction: "Impression",
                    eventLabel: t.cat_name + " - Pos:" + parseInt(e + 1)
                })
            }) : ($(".cat-list").hide(), $(".prod_cat_id").val("unset"))
        }).always(function () {
            fn_home.checkSlug(), fn_home.gaClicks($(".cat-list ul").find("a"), "TopMenu"), "set" == $(".prod_cat_id").val() && (fn_product_page.productListing(), fn_product_page.getCatDetails())
        })
    },
    checkSlug: function () {
        var e = $(".slug").val().replace("/", "");
        $(".cat-list .categories").find("li").each(function (t, a) {
            e == $(a).find("a").data("slug") && ($(a).find("a").addClass("active"), $(a).find("a .cat-icon").attr("src", "" + $(a).find("a .cat-icon").attr("icon-active")), localStorage.setItem("cat_id", $(a).find("a").data("id")), localStorage.setItem("cat_slug", $(a).find("a").data("text")))
        })
    },
    gaClicks: function (e, t) {
        var a = "";
        $(e).click(function (o) {
            o.preventDefault();
            var s, r = parseInt(o.currentTarget.dataset.index) + 1,
                n = o.currentTarget.getAttribute("target");
            if (o.currentTarget.dataset.scname ? s = o.currentTarget.dataset.scname + " - " + o.currentTarget.dataset.text + "- Pos:" + r : (a = o.currentTarget.dataset.text, s = o.currentTarget.dataset.text + "- Pos:" + r), "addCartBtn-home" !== o.target.classList[1]) {
                if (ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - " + t,
                        eventAction: "Click",
                        eventLabel: s,
                        transport: "beacon"
                    }), e.data("section")) {
                    var i = "",
                        l = {
                            "city name": fn_ll.getterLS("city_name"),
                            "hub id": fn_ll.getterLS("hub_id"),
                            "User Identifier": $(".customer_key") ? $(".customer_key").val() : ""
                        };
                    "banners" == e.data("section") ? (i = "Screenhome_CarousalBanner", e = $(this), Object.assign(l, {
                        "Banner name": e.data("title") ? e.data("title") : "",
                        "Position of Banner": (e.data("index") + 1).toString()
                    })) : "explore" == e.data("section") ? (i = "Screenhome_ExplorebyCategory", Object.assign(l, {
                        "Category Name": a
                    })) : "topbar" == e.data("section") && (Object.assign(l, {
                        "Category Name": a,
                        page: fn_main.getPageName(!1)
                    }), i = "Screenhome_CategoryNavigation"), clevertap.event.push(i, l)
                }
                "A" == o.target.tagName && n ? window.open(o.target.href, "_blank") : "A" == o.target.tagName && (window.location.href = o.target.href), o.currentTarget.href && n ? window.open(o.currentTarget.href, "_blank") : o.currentTarget.href && (window.location.href = o.currentTarget.href)
            }
        })
    },
    vanityGA: function (e) {
        $(e).on("click", function (e) {
            e.preventDefault();
            var t = "";
            e.currentTarget.dataset.val && (t = e.currentTarget.dataset.val), ga("send", {
                hitType: "event",
                eventCategory: e.currentTarget.dataset.cat,
                eventAction: "Click",
                eventLabel: t,
                transport: "beacon"
            }), window.location.href = e.currentTarget.href
        })
    },
    headerGA: function (e) {
        $(e).on("click", function (e) {
            e.preventDefault();
            var t = $(this).data("eventlabel");
            ga("send", {
                hitType: "event",
                eventCategory: "ScreenHome - Header",
                eventAction: "Click",
                eventLabel: t,
                transport: "beacon"
            }), e.currentTarget.href && (window.location.href = e.currentTarget.href)
        })
    },
    footerGA: function () {
        $(".footer-new .useful-links a, .footer-new .header a").on("click", function (e) {
            e.preventDefault();
            var t = $(this).data("eventlabel");
            ga("send", {
                hitType: "event",
                eventCategory: "ScreenHome - Footer",
                eventAction: "Click",
                eventLabel: t,
                transport: "beacon"
            }), window.open(e.currentTarget.href, "_blank")
        })
    },
    pdpTestimonialsGA: function (e, t) {
        e.on("click", function (e) {
            e.preventDefault();
            var a, o = parseInt(e.currentTarget.dataset.index) + 1;
            e.currentTarget.dataset.scname ? (a = e.currentTarget.dataset.scname + " - " + e.currentTarget.dataset.text + "- Pos:" + o, "Testimonial" == t && (a = e.currentTarget.dataset.scname + " - " + e.currentTarget.dataset.text)) : (a = e.currentTarget.dataset.text + "- Pos:" + o, "Testimonial" == t && (a = e.currentTarget.dataset.text)), "addCartBtn-home" !== e.target.classList[1] && (ga("send", {
                hitType: "event",
                eventCategory: "ProductDetailPage - Testimonial",
                eventAction: "Click",
                eventLabel: a,
                transport: "beacon"
            }), "A" == e.target.tagName && (window.location.href = e.target.href), e.currentTarget.href && (window.location.href = e.currentTarget.href))
        })
    },
    getOperationalTicker: function () {
        fn_home.ajaxForm({}, "GET", "/home_page/get-operational-ticker").done(function (e) {
            parsedResponse = JSON.parse(e), 200 === parsedResponse.statusCode && parsedResponse.data.status && parsedResponse.data.text && ($(".operational-ticker").html(parsedResponse.data.text).show(), $(".header-new").css("height", "281px"))
        }).fail(function (e) {}).always(function () {})
    },
    homeBanners: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-banners-home").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status) {
                $.each(e.data.banners, function (e, t) {
                    var a = t.web_url.split("?");
                    0 == e && ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - OfferBanner",
                        eventAction: "Impression",
                        eventLabel: a[1] + " - Pos:" + parseInt(e + 1)
                    });
                    var o = '<a href="' + t.web_url + '" data-text="' + a[1] + '" data-index="' + e + '" style="width:100%; background: url(' + t.web_banner + ') no-repeat center /contain" data-webbanner="' + t.web_banner + '" data-section="banners" data-title="' + t.title + '"><img data-lazy="' + t.web_banner + '" style = "opacity: 0" alt=""></a>';
                    $(".slider-banners ").append(o)
                });
                var t = $(".interlaced-banner-wrapper");
                e.data && e.data.interlaced && e.data.interlaced.length ? (t.find(".interlace-img").attr("src", e.data.interlaced[0].web_image_url), t.find(".interlaced-image-container").attr("href", e.data.interlaced[0].website_url), t.show()) : t.hide(), $(".findVideo").on("click", function (e) {
                    $(".myVideo")[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*"), $(".loc-screen-video").addClass("show"), $("body").addClass("noscroll"), $(".slider-banners").cycle("pause")
                }), $(".closePopVid").on("click", function (e) {
                    $(".myVideo")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), $(".loc-screen-video").removeClass("show"), $("body").removeClass("noscroll"), $(".slider-banners").cycle("resume")
                }), $(".loc-screen-video").on("click", function (e) {
                    $(".myVideo")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), $(".loc-screen-video").removeClass("show"), $("body").removeClass("noscroll"), $(".slider-banners").cycle("resume")
                }), $(window).on("keydown", function (e) {
                    27 == e.which && ($(".myVideo")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), $(".loc-screen-video").removeClass("show"), $("body").removeClass("noscroll"), $(".slider-banners").cycle("resume"))
                })
            }
            $(".slider-banners").cycle({
                slides: ">a",
                fx: "scrollHorz",
                timeout: 6e3,
                "pause-on-hover": !0
            }), $(".slider-banners").on("cycle-after", function (e, t) {
                ga("send", {
                    hitType: "event",
                    eventCategory: "ScreenHome - OfferBanner",
                    eventAction: "Impression",
                    eventLabel: t.text + " - Pos:" + parseInt(t.index + 1)
                })
            }), $(".slider-banners").on("cycle-prev", function (e, t) {
                var a = t.slides[t.currSlide].dataset,
                    o = Number(a.index);
                ga("send", {
                    hitType: "event",
                    eventCategory: "ScreenHome - OfferBanner",
                    eventAction: "Left Arrow",
                    eventLabel: a.text + " - Pos:" + parseInt(o + 1)
                })
            }), $(".slider-banners").on("cycle-next", function (e, t) {
                var a = t.slides[t.currSlide].dataset,
                    o = Number(a.index);
                ga("send", {
                    hitType: "event",
                    eventCategory: "ScreenHome - OfferBanner",
                    eventAction: "Right Arrow",
                    eventLabel: a.text + " - Pos:" + parseInt(o + 1)
                })
            }), fn_home.getAllDOMImages()
        }).always(function () {
            fn_home.gaClicks($(".slider-banners").find("a"), "OfferBanner")
        })
    },
    homeBlogs: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-blogs-home").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status) {
                var t = '<span class = "heading">' + e.title + '</span><a href = "https://www.licious.in/blog/" target = "_blank">See all</a>';
                $(".our-blog .header").append(t), $(".blog-items").html(""), $(".our-blog").find(".img-responsive").remove(), $.each(e.data, function (e, t) {
                    if (e < 3) {
                        var a = '<li><a href="' + t.url + '" target="_blank"  data-text="' + t.title + '" data-index="' + e + '"><div class="img-holder"><img data-lazy="' + t.image + '" alt="' + t.title + '" title="' + t.title + '"></div><span>' + t.title + "</span></a>";
                        $(".blog-items").append(a)
                    }
                    ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - Blog",
                        eventAction: "Impression",
                        eventLabel: t.title + " - Pos:" + parseInt(e + 1)
                    }), fn_home.getAllDOMImages()
                })
            } else $(".deals.our-blog").hide()
        }).always(function () {
            fn_home.gaClicks($(".blog-items").find("a"), "Blog")
        })
    },
    reverseTimer: function (e) {
        e = e.replace(" ", "T");
        var t = e.split(/[^0-9]/),
            a = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]).getTime(),
            o = setInterval(function () {
                var t = (new Date).getTime(),
                    s = a - t;
                if (Date.parse(e) < t) $(".timer").html("00:00:00"), $(".timer").fadeOut(), $(".deals.todays-deal").fadeOut(), setTimeout(function () {
                    $(".deals.todays-deal").remove()
                }, 500);
                else {
                    var r = Math.floor(s / 864e5),
                        n = Math.floor(s % 864e5 / 36e5) + 24 * r,
                        i = Math.floor(s % 36e5 / 6e4),
                        l = Math.floor(s % 6e4 / 1e3);
                    $(".timer").html(("0" + n).slice(-2) + ":" + ("0" + i).slice(-2) + ":" + ("0" + l).slice(-2)), 0 == r && 0 == n && 0 == i && 0 == l && ($(".timer").fadeOut(), $(".deals.todays-deal").fadeOut(), setTimeout(function () {
                        $(".deals.todays-deal").remove()
                    }, 500), clearInterval(o))
                }
            }, 1e3)
    },
    getMrpText: function (e, t) {
        function a(e, t) {
            return Math.round(e - e * t / 100)
        }
        return "hide" === e ? "<span class = \"rupee remove-before\"><span style='font-size: 14px;'>MRP: </span> &#8377;" + a(t.product_pricing.base_price, t.product_pricing.base_discount) + '</span><span class = "rupee disc remove-before ' + e + '">&#8377;' + t.product_pricing.base_price + "</span>" : "show" === e ? '<span class = "rupee remove-before">&#8377;' + a(t.product_pricing.base_price, t.product_pricing.base_discount) + '</span><span class = "rupee disc remove-before ' + e + "\"><span>MRP: </span><span class='price'> &#8377;" + t.product_pricing.base_price + "</span></span>" + ('<span class = "offer-discount">' + (t.product_pricing.rounded_base_discount || Math.floor(t.product_pricing.base_discount)) + "% OFF</span>") : ""
    },
    getPlusandMinusButtons: function (e, t, a) {
        function o(e, t) {
            return Math.round(e - e * t / 100)
        }
        return '<span class = "cart-btns remove-one" data-cat = "' + t + '" data-prid="' + e.product_master.product_id + '" data-qty="' + e.product_inventory.stock_units + '" data-index="' + a + '" data-amt=' + o(e.product_pricing.base_price, e.product_pricing.base_discount) + ' data-text="' + e.product_merchantdising.merchandise_name + '" data-recommended="' + e.product_merchantdising.recommended + '"></span>\n            <span class = "item-qty">0</span>\n            <span class = "cart-btns' + (2 == e.product_inventory.slot_available ? " disabled" : "") + ' add-one" data-cat = "' + t + '" data-prid="' + e.product_master.product_id + '" data-qty="' + e.product_inventory.stock_units + '" data-index="' + a + '" data-amt=' + o(e.product_pricing.base_price, e.product_pricing.base_discount) + ' data-text="' + e.product_merchantdising.merchandise_name + '" data-recommended="' + e.product_merchantdising.recommended + '"></span>'
    },
    renderActionButtonandClusterMessage: function (e, t, a, o) {
        function s(e, t) {
            return Math.round(e - e * t / 100, 10)
        }
        var r = "",
            n = "";
        if (e.product_inventory.stock_units > 0) {
            var i = 2 == e.product_inventory.slot_available;
            r = '<button class="add-to-cart addCartBtn-home' + (i ? " disabled" : "") + '" data-cat = "' + t + '" data-amt=' + s(e.product_pricing.base_price, e.product_pricing.base_discount) + ' data-text="' + e.product_merchantdising.merchandise_name + '" data-index="' + o + '" data-prid="' + e.product_master.product_id + '" data-qty="' + e.product_inventory.stock_units + '" data-recommended="' + e.product_merchantdising.recommended + '">Add To Cart</button>', n = fn_home.checKForBottomMsg(e) || i ? '<div class="product-message">\n                            <div class="icon-message">\n                              ' + (i ? "" : '<img src="/img/express_delivery.svg" class="scooter"/>') + '\n                              <span class="message ' + (i ? " oos" : "") + '">' + (i ? e.product_inventory.slot_custom_message : e.product_inventory.next_available_by) + "</span>\n                            </div>\n                          </div>" : ""
        } else fn_home.validateCookieForProduct(e.product_master.product_id) ? (r = '<button type="button" data-pr-id="' + e.product_master.product_id + '"\n                        class="' + a + ' notify-me notified"><img src="/img/tick_symbol.svg" class="alarm"/>\n                        <span class="notify-me-text">NOTIFY ME</span></button>', n = fn_home.checKForBottomMsg(e) ? '<div class="product-message">\n                              <div class="icon-message">\n                                <span class="message notified">' + fn_home.getNotifiedMsg() + "</span>\n                              </div>\n                            </div>" : "") : (r = '<button type="button" data-price="' + e.product_pricing.base_price + '"\n                        data-discount="' + Math.round(e.product_pricing.base_price * e.product_pricing.base_discount / 100) + '"\n                        data-cat="' + t + '" data-pr-id="' + e.product_master.product_id + '"\n                        class="' + a + ' notify-me"><img src="/img/alarm.svg"\n                        class="alarm"/><span class="notify-me-text">NOTIFY ME</span></button>', n = fn_home.checKForBottomMsg(e) ? '<div class="product-message">\n                              <div class="icon-message">\n                                <span class="message oos">' + e.product_inventory.next_available_by + "</span>\n                              </div>\n                            </div>" : "");
        return {
            actionButton: r,
            productMessageDiv: n
        }
    },
    getItemName: function (e) {
        if (e && e.includes(" ") && e.length >= char_limit) {
            var t = '<div class="ellipsis-container"><div class="ellipsis"></div><div class="ellipsis"></div><div class="ellipsis"></div></div>';
            return '<div class="item-title"><span class="product-name">' + e + "</span>" + t + "</div>"
        }
        return '<div class="item-title"><span class="product-name">' + e + "</span></div>"
    },
    getItemDescription: function (e) {
        var t = document.createElement("div");
        return t.innerHTML = e, '<div class="item-desc">' + t.innerText + "</div>"
    },
    getProductWeightDetails: function (e, t) {
        function a(e) {
            return "Kg" == e.uom ? e.gross.search("gm") > 0 ? "Gross: " + e.gross : "Pieces: " + e.gross : "Pieces" == e.unit_sold_mode ? "Pieces: " + e.gross : "Pieces: " + e.gross
        }
        if (1 == Number(e.product_merchantdising.is_combo)) return "";
        var o = "" == e.product_merchantdising.wt_msg || null == e.product_merchantdising.wt_msg ? "hide" : "show";
        return '<p class="item-weight">\n            ' + ("eggs" == t ? "" : '<span class="net-weight"> Net wt: ' + e.product_master.pr_weight + ' <span class = "info-icon ' + o + '">\n              <img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info-dark.png"></span> \n              <span class="info-bubble"> ' + e.product_merchantdising.wt_msg + " </span></span>") + '\n              <span class="gross-weight"> ' + a(e.product_master) + "</span>\n            </p>"
    },
    homeDeals: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-deals-home").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status && e.data.product_details.length > 0 && 1 == e.data.block_details.timer_status) {
                localStorage.setItem("todaysDeals", JSON.stringify(e.data));
                var t = '<span class = "heading">' + e.data.block_details.block_title + '</span><span class = "timer">--:--:--</span>';
                $(".todays-deal .header").append(t), $(".todays-deal  .item-slider .viewport").html(""), $.each(e.data.product_details, function (t, a) {
                    var o = (a.product_details.product_pricing.base_discount + " %OFF", a.product_details.product_pricing.base_discount > 0 ? "show" : "hide");
                    t < 3 && ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - " + e.data.block_details.block_title,
                        eventAction: "Impression",
                        eventLabel: a.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + 1)
                    });
                    var s = fn_home.renderActionButtonandClusterMessage(a.product_details, e.data.block_details.block_title, "hdeals-notify-me", t),
                        r = s.actionButton,
                        n = s.productMessageDiv,
                        i = '<a  href="/' + a.product_details.category_details.slug + "/" + a.product_details.product_master.slug + '" data-text="' + a.product_details.product_master.pr_name + '" data-index="' + t + '"><div class="card" data-prod="' + a.product_id + '"><div class="item-img"><img class="product-image" data-lazy="' + a.product_details.product_merchantdising.pr_image + '" alt="' + a.product_details.product_merchantdising.product_shortname + '" title="' + a.product_details.product_merchantdising.product_shortname + '"><div class="item-details">' + fn_home.getItemName(a.product_details.product_merchantdising.merchandise_name) + fn_home.getItemDescription(a.product_details.product_merchantdising.usp_desc) + fn_home.getProductWeightDetails(a.product_details, a.product_details.category_details.slug) + '<div class="item-action"><div class="rate">' + fn_home.getMrpText(o, a.product_details) + '</div><div class="action"><div class="action-slider">' + r + "<p>" + fn_home.getPlusandMinusButtons(a.product_details, e.data.block_details.block_title, t) + ("</p></p></div></div></div></div></div>" + n + "</a>");
                    $(".todays-deal .item-slider .viewport").append(i)
                }), fn_home.bindNotifyMeButton(".hdeals-notify-me"), fn_home.dealsCarousel(), fn_home.addcart("home", e.data.block_details.block_title), fn_home.removecart("home"), fn_home.gaClicks($(".todays-deal .item-slider .viewport").find("a"), e.data.block_details.block_title)
            } else $(".deals.todays-deal").hide();
            fn_home.getAllDOMImages()
        }).always(function (e) {
            var t = JSON.parse(e);
            "success" == t.status && fn_home.reverseTimer(t.data.block_details.end_time), fn_home.carNav("todays-deal"), fn_home.getCart()
        })
    },
    cycleOption: function (e) {
        var t = $("." + e).find(".card").length;
        t > 4 ? fn_home.cycleScroll(e) : $("." + e).find(".item-slider").cycle()
    },
    carNav: function (e) {
        var t = $("." + e).find(".card").length;
        t > 3 ? $("." + e + " .this_car_nav").show() : $("." + e + " .this_car_nav").hide()
    },
    cycleScroll: function (e) {
        var t = $("." + e).find(".card").length;
        t > 3 ? ($("." + e + " .item-slider").cycle(), $("." + e + " .this_car_nav").show()) : $("." + e + " .this_car_nav").hide(), $("." + e + "  .item-slider").on("cycle-next", function (e, t) {
            var a = t.currSlide + 2;
            t.slideCount - t.currSlide;
            t.slideCount > 4 && $(this).cycle("goto", a)
        }), $("." + e + "  .item-slider").on("cycle-update-view", function (e, t) {
            var a = $(".item-slider").width() - $(".cycle-carousel-wrap").width(),
                o = $(".cycle-carousel-wrap").offset().left;
            parseInt(o - 135) < a ? $(".next-todays-deals").css("opacity", "0.5") : $(".next-todays-deals").css("opacity", "1")
        }), $("." + e + "  .item-slider").on("cycle-prev", function (e, t) {
            var a = t.currSlide - 2,
                o = t.slideCount + t.currSlide;
            t.slideCount > 4 && (a <= t.slideCount ? $(this).cycle("goto", a) : $(this).cycle("goto", o))
        })
    },
    pushEEProductImpressionHomePage: function (e) {
        if (e) {
            var t = e.product_details;
            if (t && Array.isArray(t) && (t = t.reduce(function (e, t, a) {
                    var o = t.product_name,
                        s = t.product_id,
                        r = t.product_details.product_pricing.base_price,
                        n = t.product_details.category_details.id,
                        i = "recommendation-home-page",
                        l = a;
                    return e.push({
                        name: o,
                        id: s,
                        price: r,
                        category: n,
                        list: i,
                        position: l
                    }), e
                }, [])), window.dataLayer) {
                var a = window.dataLayer;
                a.push({
                    event: "productImpression",
                    ecommerce: {
                        currencyCode: "INR",
                        impressions: t
                    }
                })
            }
        }
    },
    pushEEProductImpressionCategoryPage: function (e) {
        if (e && e.data) {
            var t = e.data;
            if (t = t.reduce(function (e, t, a) {
                    var o = t.product_master.pr_name,
                        s = t.product_master.product_id,
                        r = t.product_pricing.base_price,
                        n = t.product_inventory.cat_id,
                        i = "recommendation-category-page",
                        l = a;
                    return e.push({
                        name: o,
                        id: s,
                        price: r,
                        category: n,
                        list: i,
                        position: l
                    }), e
                }, []), window.dataLayer) {
                var a = window.dataLayer;
                a.push({
                    event: "product_impression",
                    ecommerce: {
                        currencyCode: "INR",
                        impressions: t
                    }
                })
            }
        }
    },
    homeRecommendations: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-recomendtaion-home").done(function (e) {
            if (e = JSON.parse(e), e.data && fn_home.pushEEProductImpressionHomePage(e.data), "success" == e.status && e.data.product_details.length > 0) {
                localStorage.setItem("youMayAlsoLike", JSON.stringify(e.data));
                var t = '<span class = "heading">' + e.data.block_details.block_title + "</span>";
                $(".also-like .header").append(t), $(".also-like .item-slider .viewport").html(""), $.each(e.data.product_details, function (t, a) {
                    var o = (a.product_details.product_pricing.base_discount + " %OFF", a.product_details.product_pricing.base_discount > 0 ? "show" : "hide");
                    t < 3 && ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - " + e.data.block_details.block_title,
                        eventAction: "Impression",
                        eventLabel: a.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + 1)
                    });
                    var s = fn_home.renderActionButtonandClusterMessage(a.product_details, e.data.block_details.block_title, "hrecommendations-notify-me", t),
                        r = s.actionButton,
                        n = s.productMessageDiv,
                        i = '<a  href="/' + a.product_details.category_details.slug + "/" + a.product_details.product_master.slug + '" data-text="' + a.product_details.product_master.pr_name + '" data-index="' + t + '"><div class="card" data-prod="' + a.product_id + '"><div class="item-img"><img class="product-image" data-lazy="' + a.product_details.product_merchantdising.pr_image + '" alt=""><div class="item-details">' + fn_home.getItemName(a.product_details.product_merchantdising.merchandise_name) + fn_home.getItemDescription(a.product_details.product_merchantdising.usp_desc) + fn_home.getProductWeightDetails(a.product_details, a.product_details.category_details.slug) + '<div class="item-action"><div class="rate">' + fn_home.getMrpText(o, a.product_details) + '</div><div class="action"><div class="action-slider">' + r + "<p>" + fn_home.getPlusandMinusButtons(a.product_details, e.data.block_details.block_title, t) + ("</p></p></div></div></div></div></div>" + n + "</a>");
                    $(".also-like .item-slider .viewport").append(i)
                }), fn_home.bindNotifyMeButton(".hrecommendations-notify-me"), fn_home.likeCarousel(), fn_home.addcart("home", e.data.block_details.block_title), fn_home.removecart("home"), fn_home.gaClicks($(".also-like .item-slider .viewport").find("a"), e.data.block_details.block_title)
            } else $(".deals.also-like").hide(), $(".also-like .this_car_nav").hide();
            fn_home.getAllDOMImages()
        }).always(function (e) {
            JSON.parse(e);
            $(".also-like .this_car_nav").fadeIn(), fn_home.carNav("also-like"), fn_home.getCart()
        })
    },
    homeBestsellers: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-bestsellers-home").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status && e.data.product_details.length > 0) {
                localStorage.setItem("bestSellers", JSON.stringify(e.data));
                var t = '<span class = "heading">' + e.data.block_details.block_title + "</span>";
                $(".best-sellers .header").append(t), $(".best-sellers .item-slider .viewport").html(""), $.each(e.data.product_details, function (t, a) {
                    var o = (a.product_details.product_pricing.base_discount + " %OFF", a.product_details.product_pricing.base_discount > 0 ? "show" : "hide");
                    t < 3 && ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - " + e.data.block_details.block_title,
                        eventAction: "Impression",
                        eventLabel: a.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + 1)
                    });
                    var s = fn_home.renderActionButtonandClusterMessage(a.product_details, e.data.block_details.block_title, "hbestsellers-notify-me", t),
                        r = s.actionButton,
                        n = s.productMessageDiv,
                        i = '<a  href="/' + a.product_details.category_details.slug + "/" + a.product_details.product_master.slug + '" data-text="' + a.product_details.product_master.pr_name + '" data-index="' + t + '"><div class="card" data-prod="' + a.product_id + '"><div class="item-img"><img class="product-image" data-lazy="' + a.product_details.product_merchantdising.pr_image + '" alt="' + a.product_details.product_merchantdising.product_shortname + '" title="' + a.product_details.product_merchantdising.product_shortname + '"><div class="item-details">' + fn_home.getItemName(a.product_details.product_merchantdising.merchandise_name) + fn_home.getItemDescription(a.product_details.product_merchantdising.usp_desc) + fn_home.getProductWeightDetails(a.product_details, a.product_details.category_details.slug) + '<div class="item-action"><div class="rate">' + fn_home.getMrpText(o, a.product_details) + '</div><div class="action"><div class="action-slider">' + r + "<p>" + fn_home.getPlusandMinusButtons(a.product_details, e.data.block_details.block_title, t) + ("</p></p></div></div></div></div></div>" + n + "</a>");
                    $(".best-sellers  .item-slider .viewport").append(i)
                }), fn_home.bindNotifyMeButton(".hbestsellers-notify-me"), fn_home.bestCarousel(), fn_home.addcart("home", e.data.block_details.block_title), fn_home.removecart("home"), fn_home.gaClicks($(".best-sellers .item-slider .viewport").find("a"), e.data.block_details.block_title)
            } else $(".deals.best-sellers").hide();
            fn_home.getAllDOMImages()
        }).always(function (e) {
            JSON.parse(e);
            fn_home.carNav("best-sellers"), fn_home.getCart()
        })
    },
    bestCarousel: function () {
        var e = $(".best-sellers"),
            a = e.find(".item-slider"),
            o = (a.find(".viewport"), a.find(".next-best-seller"), a.find(".prev-best-seller"), e.find(".viewport").css("transform"));
        t = o.replace(/^matrix(3d)?\((.*)\)$/, "$2").split(/, /), l = e.find(".card").length, e.find(".card").eq(0).addClass("best"), $(".prev-best-seller").addClass("disabled");
        var s = 0,
            r = 2,
            n = 0,
            i = 1,
            d = !1;
        $(".next-best-seller").on("click", function () {
            n = 0;
            $(this);
            if (d) d = !1;
            else {
                d = !0;
                var t = localStorage.getItem("bestSellers"),
                    a = JSON.parse(t),
                    o = JSON.parse(t).length;
                Math.ceil(o / 3);
                if (r < l) {
                    0 == i ? (r += 3, i = 1) : r++;
                    var c = a.product_details.splice(r, 1);
                    $.map(c, function (e, t) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "ScreenHome - " + a.block_details.block_title,
                            eventAction: "Impression",
                            eventLabel: e.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(r + (t + 1))
                        })
                    })
                }
                l > 3 && l < 7 && $(".prev-best-seller").removeClass("disabled"), s < l - 4 ? $(".prev-best-seller").removeClass("disabled") : $(".next-best-seller").addClass("disabled"), s < l - 3 && (s++, e.find(".card").removeClass("best"), e.find(".card").eq(s).addClass("best"));
                var u = $(".viewport").css("transform");
                $(".viewport").innerWidth();
                p = u.replace(/^matrix(3d)?\((.*)\)$/, "$2").split(/, /), h = parseInt(p[4]), w = e.find(".card").innerWidth(), k = $(".best-sellers .item-slider").innerWidth(), q = parseInt(l * w) / k;
                var m = parseInt(h - w);
                $(".item-slider.best").scrollLeft();
                if (m <= -parseInt(w * (l - 2))) return !1;
                $(".item-slider.best").scrollTo(366 * s, 350), setTimeout(function () {
                    d = !1
                }, 350)
            }
        }), w = e.find(".card").innerWidth(), $(".prev-best-seller").on("click", function () {
            if (d) d = !1;
            else {
                d = !0, i = 0;
                var t = localStorage.getItem("bestSellers"),
                    a = JSON.parse(t),
                    o = JSON.parse(t).length;
                Math.ceil(o / 3);
                if (r > 0) {
                    0 == n ? (r -= 3, n = 1) : r--;
                    var c = a.product_details.splice(r, 1);
                    $.map(c, function (e, t) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "ScreenHome - " + a.block_details.block_title,
                            eventAction: "Impression",
                            eventLabel: e.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(r + (t + 1))
                        })
                    })
                }
                s > 1 ? $(".next-best-seller").removeClass("disabled") : $(".prev-best-seller").addClass("disabled"), l > 3 && l < 7 && $(".next-best-seller").removeClass("disabled"), s > 0 && (s--, e.find(".card").removeClass("best"), e.find(".card").eq(s).addClass("best"));
                var u = $(".viewport").css("transform"),
                    p = u.replace(/^matrix(3d)?\((.*)\)$/, "$2").split(/, /),
                    m = parseInt(p[4]);
                $(".item-slider.best").scrollLeft(), parseInt(m + w);
                $(".item-slider.best").scrollTo(366 * s, 350), setTimeout(function () {
                    d = !1
                }, 350)
            }
        })
    },
    likeCarousel: function () {
        $(".deals.also-like");
        $(".prev-also-like").addClass("disabled");
        var e = 0,
            t = 0,
            a = !1;
        $(".next-also-like").on("click", function () {
            if (a) a = !1;
            else {
                a = !0;
                var o = localStorage.getItem("youMayAlsoLike"),
                    s = JSON.parse(o),
                    r = s.product_details.length,
                    n = Math.ceil(r / 3);
                if (t < 3 * n) {
                    t += 3;
                    var i = s.product_details.splice(t, 3);
                    $.map(i, function (e, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "ScreenHome - " + s.block_details.block_title,
                            eventAction: "Impression",
                            eventLabel: e.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + (a + 1))
                        })
                    })
                }
                var l = $(".also-like").find(".card").length,
                    d = $(".also-like .item-slider").innerWidth();
                e < Math.ceil(l / 3) - 1 && e++;
                var c = l % 3,
                    u = c > 0 ? l - c : l - 3;
                l > 3 && l < 7 && $(".prev-also-like").removeClass("disabled"), 3 * e + 1 < u ? $(".prev-also-like").removeClass("disabled") : $(".next-also-like").addClass("disabled"), $(".item-slider.also-like").scrollTo(d * e - .4, 750), a = !1
            }
        }), $(".prev-also-like").on("click", function () {
            if (a) a = !1;
            else {
                a = !0;
                var o = localStorage.getItem("youMayAlsoLike"),
                    s = JSON.parse(o),
                    r = s.product_details.length;
                Math.ceil(r / 3);
                if (t > 0) {
                    t -= 3;
                    var n = s.product_details.splice(t, 3);
                    $.map(n, function (e, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "ScreenHome - " + s.block_details.block_title,
                            eventAction: "Impression",
                            eventLabel: e.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + (a + 1))
                        })
                    })
                }
                var i = $(".also-like").find(".card").length;
                e > 0 && e--, i > 3 && i < 7 && ($(".prev-also-like").addClass("disabled"), $(".next-also-like").removeClass("disabled")), e > 0 ? $(".next-also-like").removeClass("disabled") : $(".prev-also-like").addClass("disabled");
                var l = $(".also-like .item-slider").innerWidth();
                $(".item-slider.also-like").scrollTo(l * e, 750), setTimeout(function () {
                    a = !1
                }, 350)
            }
        })
    },
    dealsCarousel: function () {
        $(".deals.todays-deal");
        $(".prev-todays-deals").addClass("disabled");
        var e = 0,
            t = 0,
            a = !1;
        $(".next-todays-deals").on("click", function () {
            if (a) a = !1;
            else {
                a = !0;
                var o = localStorage.getItem("todaysDeals"),
                    s = JSON.parse(o),
                    r = s.product_details.length,
                    n = Math.ceil(r / 3);
                if (t < 3 * n) {
                    t += 3;
                    var i = s.product_details.splice(t, 3);
                    $.map(i, function (e, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "ScreenHome - " + s.block_details.block_title,
                            eventAction: "Impression",
                            eventLabel: e.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + (a + 1))
                        })
                    })
                }
                var l = $(".todays-deal").find(".card").length,
                    d = $(".todays-deal .item-slider").innerWidth();
                e < Math.ceil(l / 3) - 1 && e++;
                var c = l % 3,
                    u = c > 0 ? l - c : l - 3;
                l > 3 && l < 7 && $(".prev-todays-deals").removeClass("disabled"), 3 * e + 1 < u ? $(".prev-todays-deals").removeClass("disabled") : $(".next-todays-deals").addClass("disabled"), $(".item-slider.t-deals").scrollTo(d * e - .4, 750, "easeOut"), a = !1
            }
        }), $(".prev-todays-deals").on("click", function () {
            if (a) a = !1;
            else {
                a = !0;
                var o = localStorage.getItem("todaysDeals"),
                    s = JSON.parse(o),
                    r = s.product_details.length;
                Math.ceil(r / 3);
                if (t > 0) {
                    t -= 3;
                    var n = s.product_details.splice(t, 3);
                    $.map(n, function (e, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "ScreenHome - " + s.block_details.block_title,
                            eventAction: "Impression",
                            eventLabel: e.product_details.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + (a + 1))
                        })
                    })
                }
                var i = $(".todays-deal").find(".card").length;
                e > 0 && e--, i > 3 && i < 7 && ($(".prev-todays-deals").addClass("disabled"), $(".next-todays-deals").removeClass("disabled")), e > 0 ? $(".next-todays-deals").removeClass("disabled") : $(".prev-todays-deals").addClass("disabled");
                var l = $(".todays-deal .item-slider").innerWidth();
                $(".item-slider.t-deals").scrollTo(l * e, 750), setTimeout(function () {
                    a = !1
                }, 350)
            }
        })
    },
    homeNews: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-news-home").done(function (e) {
            if (e = JSON.parse(e), "error" == e.status) $(".in-news").hide();
            else {
                var t = e.data;
                $(".in-news h3").html(t[0].description), $(".in-news ul").html(""), $.each(e.data, function (e, t) {
                    var a = '<li data-news="' + t.description + '"><a href="' + t.url + '" data-text="' + t.description + '" data-index="' + e + '" target="_blank"><img data-lazy="' + t.image_url + '" alt="The Economic News"></a></li>';
                    $(".in-news").find("ul").append(a), ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - News",
                        eventAction: "Impression",
                        eventLabel: "News"
                    })
                }), $(".in-news ul li").on("mouseover", function () {
                    $(".in-news h3").html($(this).data("news")), $(".in-news ul").find("li").css("opacity", "0.55"), $(this).css("opacity", "1"), ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - News",
                        eventAction: "OnHover",
                        eventLabel: $(this).data("news")
                    })
                })
            }
            $(".in-news ul").find("li").eq(0).css("opacity", "1"), fn_home.getAllDOMImages()
        }).always(function () {
            fn_home.gaClicks($(".in-news ul").find("a"), "News")
        })
    },
    homeSeo: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-seo-home").done(function (e) {
            e = JSON.parse(e), "success" == e.status ? ($(".faqs").html(""), $.each(e.data, function (e, t) {
                var a = "<h4>" + t.title + "</h4><p>" + t.description + "</p>";
                $(".faqs").append(a)
            })) : $(".faqs").hide()
        })
    },
    homeTestimonials: function (e) {
        fn_home.ajaxForm({}, "POST", "/home_page/get-testimonials-home").done(function (t) {
            if (t = JSON.parse(t), "success" == t.status) {
                $(".made-with-licious .heading h3").html(t.data.block_details.block_title), $(".made-with-licious .heading p").html(t.data.block_details.block_description), $(".made-with-licious .heading img").attr("data-lazy", t.data.block_details.img_url);
                var a = '<a href="' + t.data.block_details.web_url + '" data-text="' + t.data.block_details.button_text + '" data-index="0">' + t.data.block_details.button_text + '<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/down-arrow-red.png" alt=""></a>';
                $(".made-with-licious .heading").append(a), $(".made-with-licious").find(".img-loader").remove(), $(".made-with .card").html("");
                var o = "";
                $.each(t.data.testimonials, function (t, a) {
                    o += "pdp" === e ? '<div class="card" style="height:50%" data-index="' + t + '"  data-text="' + a.title + '" data-scname="' + a.username + '"><div class="item-img"><img style="height:230px;" data-lazy="' + a.display_image + '" alt=""></div><div class="item-details"><div class="social-details"><div class="profile"><img data-lazy="' + a.profile_image + '" alt=""><span>' + a.username + '</span></div><div class="s-net"><a href="' + a.social_url + '"  class="social_link" data-text="' + a.title + '" target=_blank><img data-lazy="' + a.social_logo + '" alt="">' + a.social_platform + '</a></div></div><div class="desc">' + a.description + '</div><div class="made-with"><img data-lazy="https://d2407na1z3fc0t.cloudfront.net/Banner/chicken-leg2.png" alt=""><span><a href="' + a.web_url + '"  class="product_link" data-text="' + a.title + '" target=_blank>' + a.title + "</a></span></div></div></div>" : '<div class="card" data-index="' + t + '"  data-text="' + a.title + '" data-scname="' + a.username + '"><div class="item-img"><img data-lazy="' + a.display_image + '" alt=""></div><div class="item-details"><div class="social-details"><div class="profile"><img data-lazy="' + a.profile_image + '" alt=""><span>' + a.username + '</span></div><div class="s-net"><a href="' + a.social_url + '"  class="social_link" data-text="' + a.title + '" target=_blank><img data-lazy="' + a.social_logo + '" alt="">' + a.social_platform + '</a></div></div><div class="desc">' + a.description + '</div><div class="made-with"><img data-lazy="https://d2407na1z3fc0t.cloudfront.net/Banner/chicken-leg2.png" alt=""><span><a href="' + a.web_url + '"  class="product_link" data-text="' + a.title + '" target=_blank>' + a.title + "</a></span></div></div></div>", t < 3 && ("pdp" == e ? ga("send", {
                        hitType: "event",
                        eventCategory: "ProductDetailPage - Testimonial",
                        eventAction: "Impression",
                        eventLabel: a.title + " - Pos:" + parseInt(t + 1)
                    }) : ga("send", {
                        hitType: "event",
                        eventCategory: "ScreenHome - Testimonial",
                        eventAction: "Impression",
                        eventLabel: a.title + " - Pos:" + parseInt(t + 1)
                    }))
                }), $(".made-with").append(o), fn_home.carousel("made-with-licious", "made")
            } else $(".made-with-licious").hide();
            fn_home.getAllDOMImages()
        }).always(function () {
            "pdp" == e ? (fn_home.pdpTestimonialsGA($(".made-with").find(".card")), fn_home.pdpTestimonialsGA($(".made-with-licious .heading").find("a"), "Testimonial")) : (fn_home.gaClicks($(".made-with").find(".card"), "Testimonial"), fn_home.gaClicks($(".made-with-licious .heading").find("a"), "Testimonial"))
        })
    },
    homePopularsearch: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-popularsearch-home").done(function (e) {
            e = JSON.parse(e), "error" == e.status ? $(".popular-searches").hide() : ($(".popular-searches").find(".list-items").html(""), $.each(e.data, function (e, t) {
                var a = '<ul class = "list-' + e + '"><li class="heading"><a href="' + t.category_url + '"> ' + t.category_name + "</a></li></ul>",
                    o = t.category_name;
                $(".popular-searches").find(".list-items").append(a), $.map(t.products, function (t) {
                    $(".list-items").find(".list-" + e).append('<li><a href="' + t.url + '" data-cat = "ScreenHome - Footer - PopularSearches"  data-val = "' + o + " - " + t.product_name + '">' + t.product_name + "</a></li>")
                })
            }), fn_home.vanityGA($(".popular-searches .list-items a")))
        })
    },
    homeHub: function () {
        fn_home.ajaxForm({}, "GET", "/home_page/get-hub-home").done(function (e) {})
    },
    homeUspbanner: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-uspbanner-home").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status) {
                var t = '<img data-lazy="' + e.data.web_url + '" alt="Marketing banner" class = "img-responsive">';
                $(".banner").append(t), ga("send", {
                    hitType: "event",
                    eventCategory: "ScreenHome - USPBanner",
                    eventAction: "Impression",
                    eventLabel: "USP Banner"
                })
            } else $(".banner").hide();
            fn_home.getAllDOMImages()
        })
    },
    getCart: function () {
        return new Promise(function (e) {
            var t = "/new-cart";
            fn_home.ajaxForm({}, "post", t).done(function (t) {
                var a = JSON.parse(t),
                    o = 0;
                200 == a.statusCode && ! function () {
                    var t = a.data.combo ? a.data.combo : [],
                        s = a.data ? a.data.products.concat(a.data.oss_products, a.data.exotic, t) : [];
                    s.length > 0 ? ($.map(s, function (e, a) {
                        if (parseInt(e.quantity) > 0) {
                            var r = $('[data-prod="' + e.product_id + '"]');
                            r.length && (r.find(".item-qty").html(e.quantity), r.find(".action-slider").addClass("slide"), r.find(".item-qty-pdp").html(e.quantity), r.find(".action-slider1").addClass("slide"), r.find(".item-qty-pdp").attr("data-qty", e.quantity), r.find(".add-to-cart").hasClass("disabled") || null === e.next_available_by || void 0 === e.next_available_by || "" === e.next_available_by || r.find(".product-message").find(".message").html(e.next_available_by))
                        }
                        a < s.length - t.length && (o += parseInt(e.quantity))
                    }), $(".new-cart-count").addClass("loaded"), $(".new-cart-count").find("i").html(o), localStorage.setItem("count", o), a.data.messages && $.map(a.data.messages, function (e) {
                        "eggs" == e.condition && $(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + e.message).show()
                    }), e(a), (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && document.querySelector(".quick-checkout") && "quick-checkout fade-in" !== $(".quick-checkout")[0].className && fn_home.quickCheckout()) : $(".new-cart-count").removeClass("loaded")
                }()
            })
        })
    },
    quickCheckoutMergeShipment: function () {
        return new Promise(function (e, t) {
            fn_main.showloader(), fn_checkout.mergeShipments().done(function (t) {
                var a = JSON.parse(t);
                if (200 === a.statusCode) {
                    var o = void 0,
                        s = void 0,
                        r = void 0,
                        n = void 0;
                    $.map(a.data.order_charges, function (e) {
                        "subtotal" === e.key && (o = e.value), "deliverycharge" !== e.key && "delivery_charge" !== e.key || (s = e.value), "total" === e.key.toLowerCase() && (r = e.value), "discount" === e.key && (n = e.value), "loyaltyitem" === e.key && localStorage.setItem("cartHasLoyalty", !0)
                    });
                    var i = {
                        total: r,
                        subtotal: o,
                        discount: n,
                        deliveryCharge: s
                    };
                    localStorage.setItem("amount", JSON.stringify(i)), null !== localStorage.getItem("cartHasLoyalty") && "true" == localStorage.getItem("cartHasLoyalty") && (fn_ll.loyalty_cart_value = o.toString(), fn_ll.loyalty_delivery_charges = s.toString());
                    var l = JSON.parse(localStorage.getItem("allitem")),
                        d = l.quantity_avail,
                        c = localStorage.getItem("split", "True");
                    c = "True" == c;
                    var u = {
                            "Cart Value": o,
                            "City Name": localStorage.getItem("city_name"),
                            "Hub ID": Number(localStorage.getItem("hub_id")),
                            "Product ID": l.productId,
                            "Product Name": l.productName,
                            "Saved Value": i.discount,
                            "Category ID": l.category_id ? l.category_id : "",
                            "Is Split order": c,
                            "No of Split": Number(localStorage.getItem("shipment_split")),
                            Defaultslot: localStorage.getItem("shipmentType"),
                            Checkout_Flow: quick_checkout,
                            incoming_source: qc_incoming_source
                        },
                        p = {
                            CartValue: o,
                            ProductID: l.productId,
                            ProductName: l.productName,
                            SavedValue: i.discount,
                            Delivery: s,
                            Discount: n,
                            Total: r,
                            Checkout_Flow: quick_checkout,
                            incoming_source: qc_incoming_source
                        };
                    localStorage.setItem("payment-delivery", JSON.stringify(p));
                    var m = JSON.parse(JSON.stringify(u));
                    "object" == typeof d.split(",") && (u.Quantity = d.split(",")), "string" == typeof d && (m.Quantity = d), fn_cart.gaAddRemoveEvent("Checkout_ProceedPayment", "Checkout_Slot", JSON.stringify(m)), m.Source = "Checkout_Slot", fn_home.sendBranchCheckoutEvent("checkout_progress", branchData), m["Category ID"] = JSON.parse(localStorage.getItem("allitem")).category_id, clevertap.event.push("Checkout Payment Initiated", m), localStorage.setItem("discount", i.discount), localStorage.setItem("shipment_message", a.data.messages.message), localStorage.setItem("bill_details", JSON.stringify(a.data.order_charges)), e(a), window.location.href = "/user/checkout#quick-checkout?payments"
                } else fn_main.hideloader(), Materialize.toast(a.data.message + " Refreshing! Please try again.", 5e3), fn_home.quickCheckout()
            }).fail(function () {
                fn_main.hideloader(), Materialize.toast(resp.data.message + " Refreshing! Please try again.", 5e3), fn_home.quickCheckout()
            })
        })
    },
    quickCheckout: function () {
        $(".quick-checkout").addClass("fade-in"), $("#addressBody").html(""), $(".total-payment-button .payment-button").addClass("disabled"), $("#slotBody .slot-info").html(""), $("#slotBody .del-charge").html(""), $(".loader-address").show(), $(".loader-shipment").show(), $(".slot-row").css("pointer-events", "none"), fn_home.ajaxForm({}, "POST", "/checkout/get-all-address").done(function (e) {
            var t = JSON.parse(e);
            200 === t.statusCode ? (localStorage.setItem("address-count", t.data.address.length), $(".addr-slot .address").html(), t.data.defaultaddress.length > 0 ? ($.map(t.data.address, function (e) {
                if (e.address_id === t.data.defaultaddress[0]) {
                    localStorage.setItem("default_addr_id", e.address_id), localStorage.setItem("default_addr_lat", e.lat), localStorage.setItem("default_addr_lng", e.lng);
                    var a = e.line2 + ", " + e.line1;
                    localStorage.setItem("address", a), $("#addressBody").html(a)
                }
            }), fn_home.getQuickCheckoutShipments()) : (localStorage.setItem("default_addr_id", ""), $("#addressAction").html("Add New"), $("#addressBody").html("No Default Address Found"), $(".loader-shipment").hide())) : 203 === t.statusCode && ($("#addressAction").html("Add New"), $("#addressBody").html("No Address Found"), $(".loader-shipment").hide()), $(".loader-address").hide()
        }).fail(function () {
            Materialize.toast("Something went wrong, please try reloading the page"), $(".loader-address").hide(), $(".loader-shipment").hide()
        })
    },
    getQuickCheckoutShipments: function () {
        fn_home.ajaxForm({
            type: "reorder"
        }, "POST", "/checkout/get-shipments").done(function (e) {
            var t = JSON.parse(e);
            200 === t.statusCode ? ! function () {
                $(".loader-shipment").hide(), $(".slot-row").css("pointer-events", "auto"), $(".all-slots").show(), $(".rm-oos-msg").hide(), slot_alert_msg_arr_length = t.data.shipment_alert_message ? t.data.shipment_alert_message.length : 0, t.data.shipment_alert_message.length > 0 && (slot_alert_message = t.data.shipment_alert_message[0].message), localStorage.setItem("split", t.data.shipment_summary.length), localStorage.setItem("shipment_split", t.data.shipment_summary.length);
                var e = t.data.messages.length > 0 ? t.data.messages[0].message : "";
                t.data.messages.length > 0 ? $.map(t.data.messages, function (e) {
                    "eggs" === e.condition ? fn_checkout.eggFlag = !0 : fn_checkout.eggFlag = !1
                }) : fn_checkout.eggFlag = !1;
                var a = 0;
                $.map(t.data.shipment_summary, function (e) {
                    e.products.map(function (e) {
                        return a += parseInt(e.quantity)
                    })
                });
                var o = t.data.order_charges;
                localStorage.setItem("count", a), $(".profile-cart").find(".new-cart-count").addClass("loaded"), $(".profile-cart").find(".new-cart-count").find("i").html(a), $(".background-div").find("#product_count").html('<img class="bag icon" src="/img/bag-icon.png">' + a + " Item" + (a > 1 ? "s " : " ") + "Selected"), $(".loader-shipment").hide(), localStorage.setItem("count", a);
                var s = {};
                $.map(o, function (e) {
                    "subtotal" == e.key && (s.subtotal = e.value), "deliverycharge" != e.key && "delivery_charge" != e.key || (s.delivery = e.value), "discount" == e.key && (s.discount = e.value), "liciouswallet" != e.key && "wallet" != e.key || (s.wallet = e.value), "total" == e.key.toLowerCase() && (s.total = e.value)
                }), fn_ll.loyalty_cart_value = s.total.toString(), fn_ll.loyalty_delivery_charges = s.delivery.toString(), localStorage.setItem("amount", JSON.stringify(s)), $(".qc-ll-item-placeholder").html(""), "loyalty_item" in t.data && null !== t.data.loyalty_item && 0 !== t.data.loyalty_item.length && fn_home.renderQuickCheckoutLoyaltyItem(t.data.loyalty_item[0]), t.data.dynamic_delivery_message.length > 0 && (t.data.dynamic_delivery_message[0].enable || "success" === t.data.dynamic_delivery_message[0].style) ? ($(".dd-charge-msg").html(t.data.dynamic_delivery_message[0].message), "success" === t.data.dynamic_delivery_message[0].style ? $(".dd-charge-msg").css("color", "#427605") : $(".dd-charge-msg").css("color", "#d47015")) : $(".dd-charge-msg").html(""), "loyalty_item" in t.data && null !== t.data.loyalty_item && 0 !== t.data.loyalty_item.length && (localStorage.setItem("loyalty_price", t.data.loyalty_item[0].price.toString()), localStorage.setItem("loyalty_discounted_price", t.data.loyalty_item[0].discounted_price.toString()), localStorage.setItem("loyalty_subprogram_name", t.data.loyalty_item[0].subprogram_name.toString()), localStorage.setItem("total_items", a.toString()), localStorage.setItem("saved_amount", t.data.loyalty_delivery_discount.toString())), $.map(t.data.order_charges, function (e) {
                    if ("total" === e.key.toLowerCase()) $(".total-payment-button .total").html("Total : &#8377;" + e.value);
                    else if ("deliverycharge" === e.key || "delivery_charge" === e.key)
                        if (e.value) {
                            var t = "*Delivery Charge: &#8377;" + e.value;
                            $("#slotBody .del-charge").css("color", "#d47015"), $("#slotBody .del-charge").html(t)
                        } else {
                            var t = "Free Delivery";
                            $("#slotBody .del-charge").css("color", "#427605"), $("#slotBody .del-charge").html(t)
                        }
                }), fn_home.renderQuickCheckoutShipments(t.data.shipment_summary, e, s);
                var r = $(".bill-breakup");
                r.html(""), $.map(t.data.order_charges, function (e) {
                    var t = e.attribute.toLowerCase().replace(/ /g, "-");
                    if ("liciouswallet" !== e.key && "wallet" !== e.key) {
                        var a = '<li class="' + t + '">' + e.attribute + "<span>" + e.value + '</span>\n            <div class="message">' + e.message + "</div></li>";
                        r.append(a)
                    }
                })
            }() : 202 !== t.statusCode || "oos_error" !== t.data.errorMessage && "cross_sell_modified" !== t.data.errorMessage && "empty_shipment" !== t.data.errorMessage ? 202 === t.statusCode && "empty_cart" == t.data.errorMessage && $(".quick-checkout").removeClass("fade-in") : ! function () {
                $(".rm-oos-msg").html(t.data.unav_msg), $(".rm-oos-msg").show(), $.map(t.data.order_charges, function (e) {
                    if ("total" === e.key.toLowerCase()) $(".total-payment-button .total").html("Total : &#8377;" + e.value);
                    else if ("deliverycharge" === e.key || "delivery_charge" === e.key)
                        if (e.value) {
                            var t = "*Delivery Charge: &#8377;" + e.value;
                            $("#slotBody .del-charge").css("color", "#d47015"), $("#slotBody .del-charge").html(t)
                        } else {
                            var t = "Free Delivery";
                            $("#slotBody .del-charge").css("color", "#427605"), $("#slotBody .del-charge").html(t)
                        }
                });
                var e = $(".bill-breakup");
                e.html(""), $.map(t.data.order_charges, function (t) {
                    var a = t.attribute.toLowerCase().replace(/ /g, "-");
                    if ("liciouswallet" !== t.key && "wallet" !== t.key) {
                        var o = '<li class="' + a + '">' + t.attribute + "<span>" + t.value + '</span>\n              <div class="message">' + t.message + "</div></li>";
                        e.append(o)
                    }
                });
                var a = t.data.shipment_summary[0];
                fn_home.renderQuickCheckoutShipmentProducts(a.products), $(".slot-row").trigger("click"), $(".slot-row").css("pointer-events", "none"), $(".all-slots").hide()
            }(), $(".loader-shipment").hide()
        }).fail(function () {
            $(".loader-shipment").hide()
        })
    },
    renderQuickCheckoutLoyaltyItem: function (e) {
        document.querySelector(".qc-ll-item-placeholder").innerHTML = '\n      <input id="program_id" type="number" value="' + e.program_id + '" hidden>\n      <input id="subprogram_id" type="number" value="' + e.subprogram_id + '" hidden>\n      <div class="qc-ll-item">\n        <img src="/img/loyalty_licious_logo.svg" class="qc-ll-item-licious-logo">\n        <div class="qc-ll-item-separator"></div>\n        <div class="right-section">\n          <div class="qc-ll-info">\n            <div class="qc-ll-sub-program">' + e.subprogram_name + '</div>\n            <div class="qc-ll-price">\n              ' + (e.discounted_price !== e.price ? '\n                <span class="qc-ll-selling-price" value="' + e.discounted_price + '">&#8377 ' + e.discounted_price + '</span>\n                <span class="qc-ll-marked-price" value="' + e.price + '">&#8377 ' + e.price + "</span>" : '<span class="qc-ll-selling-price" value="' + e.discounted_price + '">&#8377 ' + e.price + "</span>") + '\n            </div>\n          </div>\n          <div class="right">\n            <div class="remove-qc-ll-item"></div>\n          </div>\n        </div>\n      </div>\n    ', document.querySelector(".remove-qc-ll-item").addEventListener("click", function () {
            var e = {
                    name: "",
                    city: "",
                    hub_id: "",
                    total_plans: "",
                    list: "",
                    member_status: "",
                    selected_plan: "",
                    recommended_plan: "",
                    user_type: "",
                    logged_in: "",
                    total_orders: "",
                    oldcart_value: "",
                    total_items: "",
                    olddelivery_charge: "",
                    saved_amount: "",
                    newcart_value: "",
                    newdelivery_charge: "",
                    Checkout_Flow: quick_checkout,
                    incoming_source: qc_incoming_source
                },
                t = $(".qc-ll-sub-program").html() + ", " + $(".qc-ll-selling-price").attr("value").toString() + ", " + ($(".qc-ll-marked-price").length ? $(".qc-ll-marked-price").attr("value").toString() : "0");
            e.name = fn_ll.loyalty_plan_name, e.city = fn_ll.getCityFromLS(), e.hub_id = fn_ll.getHubFromLS(), e.total_plans = fn_ll.getterLS("loyalty_total_plans"), e.list = "slot", e.member_status = fn_ll.loyalty_banners_obj.member_status, e.selected_plan = t, e.recommended_plan = fn_ll.getterLS("loyalty_recommended"), e.user_type = fn_ll.getUserTypeFromLS(), e.logged_in = fn_ll.getLoginStatus(), e.total_orders = fn_ll.getTotalOrdersFromLS(), e.oldcart_value = fn_ll.loyalty_cart_value, e.total_items = fn_ll.getterLS("total_items"), e.olddelivery_charge = fn_ll.loyalty_delivery_charges, e.saved_amount = fn_ll.getterLS("saved_amount"), fn_home.ajaxForm({
                program_id: $("#program_id").val(),
                subprogram_id: $("#subprogram_id").val()
            }, "POST", "/loyalty/remove-loyalty").done(function (t) {
                t = JSON.parse(t), 200 === t.statusCode && (document.querySelector(".qc-ll-item-placeholder").innerHTML = "", e.newcart_value = fn_ll.loyalty_cart_value, e.newdelivery_charge = fn_ll.loyalty_delivery_charges, fn_ll.sendAnalyticsData("removeplan_loyaltyslot", _extends({}, e, {
                    source: "loyalty"
                })), localStorage.setItem("cartHasLoyalty", !1), $(".mc-ll-item-placeholder").html(""), $(".li-crossell-wrapper").css("box-shadow", "0 0 13px 0 rgba(0, 0, 0, 0.14)"), fn_home.getQuickCheckoutShipments())
            }).fail(function () {
                console.log("res")
            }).always(function () {})
        })
    },
    renderQuickCheckoutShipments: function (e, t, a) {
        $(".slot-row").css("pointer-events", "auto"), $(".total-payment-button .payment-button").removeClass("disabled"), e.length > 1 ? ($(".payment-button .button-text .sub-text").html("SELECT DELIVERY SLOT"), $("#slotBody .slot-info").css("color", "#e41d36").html("(Select a Delivery Slot)"), $("#slotBody .del-charge").html(""), fn_home.splitShipment = !0) : ! function () {
            fn_home.splitShipment = !1, localStorage.setItem("shipmentCount", e ? e.length : 0), branchData = [];
            var o = {
                    productId: " ",
                    productName: "",
                    quantity_avail: 0,
                    quantity_stock: 0,
                    category_id: "",
                    base_price: ""
                },
                s = {
                    expressProductName: "",
                    scheduledProductName: "",
                    expressType: "",
                    expressQuantity: "",
                    expressInventory: "",
                    expressDp: "",
                    expresRm: "",
                    schedule1Type: "",
                    schedule1Quantity: "",
                    schedule1Inventory: "",
                    schedule1Dp: "",
                    schedule1Rm: "",
                    shipmentType: "",
                    shipmentId: ""
                };
            $.map(e, function (r, n) {
                s.shipmentId = s.shipmentId.concat(r.id + ","), "SCHEDULED" !== e[0].slots[0].type && 0 === e[0].slots[0].slots.length && ($(".slots-layout").removeClass("fade-in"), $(".slot-detials").removeClass("fade-in"), $("#slotAction").html("View"), $(".background-div").removeClass("dull-background"), $(".quick-checkout").removeClass("fade-in"), $(".quick-checkout .payment").removeClass("hide-class"), fn_checkout.alertBox("No slots available", "", "no-slots-qc"), $(".slots-selector .scooter").hide()), "EXPRESS" == r.slots[0].type && (s.expresscount = r.products.length, s.shipmentType = s.shipmentType.concat("EXPRESS"), r.products.forEach(function (e) {
                    s.expressRm = s.expressRm + Number(e.rm_buffer_avail), s.expressDp = s.expressDp + Number(e.dispatched_quantity_avail) + ",", s.expressQuantity = s.expressQuantity + Number(e.quantity) + ",", s.expressInventory = s.expressInventory + Number(e.live_stock_avail) + ",", s.expressType = s.expressType.concat(e.type + ","), s.expressProductName = s.expressProductName.concat(e.product_name + ",")
                })), "SCHEDULED" == r.slots[0].type && (s.scheduledcount = r.products.length, s.shipmentType = s.shipmentType.concat("SCHEDULED"), r.products.forEach(function (e) {
                    s.schedule1Rm = s.schedule1Rm + Number(e.rm_buffer_avail), s.schedule1Dp = s.schedule1Dp + Number(e.dispatched_quantity_avail) + ",", s.schedule1Quantity = s.schedule1Quantity + Number(e.quantity) + ",", s.schedule1Inventory = s.schedule1Inventory + Number(e.live_stock_avail) + ",", s.schedule1Type = s.schedule1Type.concat(e.type + ","), s.scheduledProductName = s.scheduledProductName.concat(e.product_name + ",")
                })), 0 === slot_alert_msg_arr_length && $(".slots-alert-message").html(""), fn_home.renderQuickCheckoutShipmentProducts(r.products, r.id), fn_home.renderQuickCheckoutShipmentSlots(r.slots, ".slot-detials .all-slots", r.id), fn_home.selectQuickCheckoutSlot(s, e), $.map(r.products, function (e) {
                    o.productId = o.productId.concat(e.product_id + ","), o.productName = o.productName.concat(e.product_name + ","), o.category_id = o.category_id.concat(e.category_id + ","), o.base_price = o.base_price.concat(e.base_price + ","), o.quantity_avail = o.quantity_avail + (e.quantity + ","), o.quantity_stock = o.quantity_stock + Number(e.live_stock), branchData.push({
                        item_name: e.product_name,
                        item_id: e.product_id,
                        currency: "INR",
                        price: e.base_price.toString(),
                        quantity: e.quantity.toString(),
                        item_category: e.category_name
                    })
                }), localStorage.setItem("allitem", JSON.stringify(o)), localStorage.setItem("shipmentType", s.shipmentType);
                var i = {},
                    l = 1;
                $.map(e, function (e, t) {
                    var a = [],
                        o = [],
                        s = [],
                        r = [],
                        n = [],
                        d = [];
                    if ($.map(e.products, function (e, t) {
                            a.push(e.product_name), o.push(e.type), s.push(e.quantity), r.push(e.live_stock_avail), n.push(e.dispatched_quantity_avail), d.push(e.rm_buffer_avail)
                        }), "EXPRESS" == e.slots[0].type) Object.assign(i, {
                        "Express Item Count": e.products.length,
                        "Express Delivery Items": a.toString(),
                        "Express Item types": o.toString(),
                        "Express Item Quantity": s.toString(),
                        "Express Item Live Inventory": r.toString(),
                        "Express Item DP": n.toString(),
                        "Express Item RM": d.toString(),
                        Checkout_Flow: quick_checkout,
                        incoming_source: qc_incoming_source
                    });
                    else {
                        var c = {};
                        c["Slot " + l + " Item Count"] = e.products.length, c["Scheduled" + l + " delivery Items"] = a.toString(), c["Schedule" + l + " Item types"] = o.toString(), c["Scheduled" + l + " Item Quantity"] = s.toString(), c["Scheduled" + l + " Live Inventory"] = r.toString(), c["Scheduled" + l + " Item DP"] = n.toString(), c["Scheduled" + l + " Item RM"] = d.toString(), Object.assign(i, c), l++
                    }
                }), localStorage.setItem("shipmentid", s.shipmentId);
                var d = e[0].total_savings.split("₹")[1],
                    c = JSON.parse(localStorage.getItem("amount"));
                if ("false" != t && "remove" != t) data = {
                    "Cart Value": c.subtotal,
                    "City Name": localStorage.getItem("city_name"),
                    "Hub ID": Number(localStorage.getItem("hub_id")),
                    "Saved Value": d,
                    "Reason for Slot": "",
                    "Split Slot": Number(e.length) > 1,
                    "No of Split": Number(e.length),
                    "Default Slot": s.shipmentType,
                    Checkout_Flow: quick_checkout,
                    incoming_source: qc_incoming_source
                }, Object.assign(i, data), fn_cart.gaAddRemoveEvent("Checkout_defaultslot", "Checkout_Slot", JSON.stringify(i)), i.Source = "Checkout_Slot", clevertap.event.push("Checkout Slot Selection Load", i);
                else {
                    var u = {
                        "Cart Value": a.subtotal,
                        "City Name": localStorage.getItem("city_name"),
                        "Hub ID": Number(localStorage.getItem("hub_id")),
                        "Product ID": o.productId,
                        "Product Name": o.productName,
                        Quantity: localStorage.getItem("itemQuan"),
                        "Saved Value": d,
                        "City ID": Number(localStorage.getItem("city_id")),
                        Checkout_Flow: quick_checkout,
                        incoming_source: qc_incoming_source
                    };
                    fn_cart.gaAddRemoveEvent("Checkout_Selectshipment", "Checkout_Shipment", JSON.stringify(u)), u.Source = "Checkout_Shipment", clevertap.event.push("Checkout Shipment", u)
                }
            })
        }()
    },
    renderQuickCheckoutShipmentSlots: function (e, t, a) {
        var o = "",
            s = "",
            r = "1",
            n = "";
        default_delivery = "Select a Delivery Slot", slot_class = " error", shipment_continue = !1, $.map(e, function (e, i) {
            ship_slotId = i + 1, e.is_express && (default_delivery = e.slots[0].time), 0 != i || e.is_express ? 0 == i && e.is_express && (n = n.replace("{{time_slot}}", e.slots[0].time).replace("{{ship_id}}", a).replace("{{date}}", e.date).replace("{{slot_time}}", e.slots[0].time)) : n = "";
            var l = "",
                d = e.date;
            $.map(e.slots, function (e, t) {
                var o = 1 == e.status ? "" : "n-a",
                    s = e.selected ? " selected" : "",
                    r = "",
                    n = "";
                n = 1 === e.show_delivery_type || 0 === e.status ? "hide-dc" : 2 === e.show_delivery_type ? "free-delivery" : "show-dc", r += '<div class="dd-charge ' + n + '">' + e.message + "</div>", l += '<li>\n                          <button class = "' + (o + s) + '" data-ship_id="' + a + '" \n                                            data-date="' + d + '" data-time="' + e.time + '">\n                            ' + e.time + "\n                          </button>\n                          " + r + "\n                        </li>"
            }), $.map(e.slots, function (e, t) {
                if (e.selected) {
                    var a = e.time.toString().replace(/-/, "to");
                    return default_delivery = a.charAt(0) + a.toLowerCase().slice(1), slot_class = "", shipment_continue = !0, !1
                }
            }), shipment_continue && !fn_checkout.eggFlag ? $(".complete-shipments").removeClass("disabled") : $(".complete-shipments").addClass("disabled");
            var c = " ",
                u = new Date(e.timestamp).getDate(),
                p = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                m = ["January", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                h = (new Date).getDate(),
                f = new Date(e.timestamp).getDate() + " " + m[new Date(e.timestamp).getMonth()],
                v = "";
            u === h ? (v = "Today (" + f + ")", e.selected && "Select a Delivery Slot" !== default_delivery && "Today" !== default_delivery.split("")[0] && (default_delivery = "Today, " + default_delivery)) : u === h + 1 ? (v = "Tomorrow (" + f + ")", e.selected && "Select a Delivery Slot" !== default_delivery && (default_delivery = "Tomorrow, " + default_delivery)) : (v = p[new Date(e.timestamp).getDay()] + " (" + f + ")", e.selected && "Select a Delivery Slot" !== default_delivery && (default_delivery += ", " + f)), e.selected && "Select a Delivery Slot" !== default_delivery && (r = ship_slotId), s += '<div class="dates" ship-id="1" data-id="1' + ship_slotId + '" id="dates_1' + ship_slotId + '">' + v + "</div>";
            var g = '<div class = "slot-day-time" ship-id="1" id="slot-day-time_1' + ship_slotId + '">\n            <ul class = "slot-time">' + l + "</ul>\n          </div>";
            o += g;
            var _ = '<div class="slots-dropdown ' + slot_class + '" data-slotselected="' + ("Select a Delivery Slot" === default_delivery) + '">\n            <div class="slots-selector" ship-id="1">\n              <img class=\'scooter\' src=\'/img/express_delivery.svg\'>\n              ' + default_delivery + '\n            </div>\n          </div>\n          <div class="slots-layout">\n          <div class="slots_1">\n            <div class="slot-day-text" ship-id="1">' + s + "</div>\n            " + n + "\n            " + o + "\n          </div>\n        </div>";
            c = c.concat(default_delivery + ","), localStorage.setItem("slotTime", c), $(t).find(".li-slots-render").html(_), $(".slot-time").find(".hide-dc").length === $(".slot-time").find("li").length ? ($(".dd-charge").css("display", "none"), $(".slot-time li").css("margin-bottom", "15px")) : ($(".dd-charge").css("display", "block"), $(".slot-time li").css("margin-bottom", "0px")), $(".slot-day-time").hide(), $(".dates").on("click", function () {
                $(".dates").removeClass("active"), $(this).addClass("active"), $(".slot-day-time").hide(), slot_id = $(this).attr("data-id");
                for (var e = document.querySelectorAll(".slot-day-time"), t = 0; t < e.length; t++)
                    if ("slot-day-time_" + slot_id === e[t].id) {
                        $("#slot-day-time_" + slot_id).show();
                        break
                    }
            })
        }), "Select a Delivery Slot" !== default_delivery ? ($(".total-payment-button .payment-button").attr("slot-selected", "true"), $("#slotBody .slot-info").css("color", "#6d6d71").html("(" + default_delivery + ")"), $(".payment-button .button-text .sub-text").html("SELECT PAYMENT OPTION"), $(".slots-selector .scooter").show()) : ($(".total-payment-button .payment-button").attr("slot-selected", "false"), $("#slotBody .slot-info").css("color", "#e41d36").html("(" + default_delivery + ")"), $(".payment-button .button-text .sub-text").html("SELECT DELIVERY SLOT"), $("#slotBody .del-charge").html(""), $(".slots-selector .scooter").hide()), fn_home.showQuickCheckoutSlots(r)
    },
    showQuickCheckoutSlots: function (e) {
        $(".slots-selector").on("click", function () {
            var t = $(".slots-layout");
            if (t.hasClass("fade-in")) {
                t.removeClass("fade-in");
                var a = {
                    Source: "Checkout_Slot",
                    Checkout_Flow: quick_checkout,
                    incoming_source: qc_incoming_source
                };
                clevertap.event.push("Closed Slot Selection", a), fn_cart.gaAddRemoveEvent("Checkout_Slot_Closed", "Checkout_Slot")
            } else t.addClass("fade-in");
            $(this).toggleClass("up"), $(".pointer").toggleClass("fade");
            var o = $(this).attr("ship-id");
            $(".slot-day-time").hide(), $(".dates").removeClass("active"), $("#slot-day-time_" + (o + e)).show(), $("#dates_" + (o + e)).addClass("active")
        })
    },
    selectQuickCheckoutSlot: function (e, t) {
        $(".slot-time").find("li button").on("click", function (t) {
            $(".slot-time").find("li button").css("pointer-events", "none");
            var a = $(this),
                o = a.data("date"),
                s = a.data("ship_id"),
                r = a.data("time");
            a.css("background", "#ffffff"), a.hasClass("n-a") || (a.parents(".slots-layout").addClass("loader-div"), fn_home.ajaxForm({
                date: o,
                slot: r,
                ship_id: s
            }, "POST", "/checkout/select-slot").done(function (t) {
                var r = JSON.parse(t);
                200 === r.statusCode ? ! function () {
                    JSON.parse(localStorage.getItem("count"));
                    localStorage.setItem("shipment_len", r.data.shipment_summary.length);
                    var t = {};
                    $.map(r.data.order_charges, function (e) {
                        if ("subtotal" == e.key) t.subtotal = e.value;
                        else if ("deliverycharge" == e.key || "delivery_charge" == e.key)
                            if (t.delivery = e.value, e.value) {
                                var a = "*Delivery Charge: &#8377;" + e.value;
                                $("#slotBody .del-charge").css("color", "#d47015"), $("#slotBody .del-charge").html(a)
                            } else {
                                var a = "Free Delivery";
                                $("#slotBody .del-charge").css("color", "#427605"), $("#slotBody .del-charge").html(a)
                            }
                        else "discount" == e.key ? t.discount = e.value : "liciouswallet" == e.key || "wallet" == e.key ? t.wallet = e.value : "total" == e.key.toLowerCase() && ($(".total-payment-button .total").html("Total : &#8377;" + e.value), t.total = e.value)
                    }), fn_home.renderQuickCheckoutShipments(r.data.shipment_summary, "false", t);
                    var n = $(".bill-breakup");
                    n.html(""), $.map(r.data.order_charges, function (e) {
                        var t = e.attribute.toLowerCase().replace(/ /g, "-");
                        if ("liciouswallet" !== e.key && "wallet" !== e.key) {
                            var a = '<li class="' + t + '">' + e.attribute + "<span>" + e.value + '</span>\n                <div class="message">' + e.message + "</div></li>";
                            n.append(a)
                        }
                    }), a.parents(".slots-dropdown").attr("data-slotselected", "true");
                    var i = {
                        "Default Slot": e.shipmentType,
                        "Split Slot": r.data.shipment_summary.length > 1,
                        "No of Split": Number(r.data.shipment_summary.length),
                        "Express Delivery Items": e.expressProductName,
                        "Scheduled Delivery Items": e.scheduledProductName,
                        "Scheduled Date": o,
                        "Shipment ID": s,
                        Checkout_Flow: quick_checkout,
                        incoming_source: qc_incoming_source
                    };
                    fn_cart.gaAddRemoveEvent("Checkout_changeSlot", "Checkout_Slot", JSON.stringify(i)), i.Source = "Checkout_Slot", clevertap.event.push("Changed Slot", i)
                }() : 202 === r.statusCode && "empty_stock" == r.data.errorMessage ? (fn_home.getQuickCheckoutShipments(), Materialize.toast(r.data.message, 5e3)) : (a.parents(".slots-dropdown").attr("data-slotselected", "true"), Materialize.toast(r.data.message, 5e3)), $(".slot-time").find("li button").css("pointer-events", "auto")
            }).fail(function () {
                $(".slot-time").find("li button").css("pointer-events", "auto")
            }).always(function () {
                $(".slot-time").find("li button").css("pointer-events", "auto"), a.parents(".slots-layout").addClass("complete"), setTimeout(function () {
                    a.parents(".slots-layout").removeClass("loader-div complete")
                }, 1200)
            }))
        })
    },
    renderQuickCheckoutShipmentProducts: function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 1 : arguments[1],
            a = {
                product_id: "",
                product_name: "",
                quantity: ""
            };
        $(".qc-products ul").html(""), $.map(e, function (e) {
            var o = "",
                s = "",
                r = "",
                n = "qty";
            o = e.discount > 0 ? '<span class = "price discount"><b class = "rupee">' + e.base_price + '</b><b class = "rupee">' + e.actual_price + "</b></span>" : '<span class = "price"><b class = "rupee text-red">' + e.actual_price + "</b></span>", "" != e.shipment_info_message && (s = '<i class="info-hover" data-ship_id="' + t + '" data-category="' + e.category_name + '" data-prname="' + e.product_name + '">i <label>' + e.shipment_info_message + "</label></i>", n = "split-qty", r = e.shipment_quantity.replace(/of/g, "/")), a.product_id = a.product_id.concat(e.product_id + ","), a.product_name = a.product_name.concat(e.product_name + ","), a.quantity = a.quantity + (e.quantity + ","), r = e.quantity;
            var i = "",
                l = "";
            e.reorder_oos && (i = "oos", l = '<div class="oos-msg">' + e.reorder_unav_msg + "</div>");
            var d = '<li class="' + i + '" data-sprid="' + e.product_id + '" >' + l + '<img src="' + e.image + '" alt="' + e.product_name + '"><div class="li-prod-desc"><p class="pr-name">' + e.product_name + '</p><p><span class="weight">' + e.weight + "</span>|" + o + '|<span class="' + n + '">qty:<span>' + r + "</span>" + s + "</span></p>" + ('<span class="delete-prod" ' + fn_cart.getAttributesString(e) + ' data-shipid="') + t + '" data-prid="' + e.product_id + '" data-sprname="' + e.product_name + '" data-category="' + e.category_name + '" data-hubid=' + e.hub_id + " data-split=" + e.is_split + " ></span></div></li>";
            $(".qc-products ul").append(d)
        }), localStorage.setItem("product", JSON.stringify(a)), fn_home.deleteQuickCheckoutShipmentItem()
    },
    deleteQuickCheckoutShipmentItem: function () {
        $(".qc-products .delete-prod").on("click", function () {
            var e = $(this);
            if (e.data("is_combo_child")) return void fn_cart.showRemovePopup(e, "shipment");
            var t = e.attr("data-prid"),
                a = e.attr("data-shipid");
            category = e.attr("data-category"), hub_id = e.attr("data-hubid"), prname = e.attr("data-sprname"), split = e.attr("data-is_split"), schedule_slot = $(".slots-dropdown").find(".slots-selector").text(), slot = "EXPRESS", is_split = localStorage.getItem("split");
            var o = void 0;
            o = "False" != is_split;
            var s = "/checkout_oos/cart-item-delete/" + t;
            fn_home.ajaxForm({
                type: "reorder"
            }, "POST", s).done(function (s) {
                var r = JSON.parse(s);
                if ("success" == r.status) {
                    var n = {
                        "Product Name": prname,
                        "Category Name": category,
                        "Shipment ID": Number(a),
                        "Product ID": t,
                        "City Name": localStorage.getItem("city_name"),
                        "Hub ID": Number(hub_id),
                        Slot: slot,
                        "Is Split Order": o,
                        "Scheduled Slot Selected": schedule_slot,
                        Checkout_Flow: quick_checkout,
                        incoming_source: qc_incoming_source
                    };
                    1 == e.data("is_combo") && (n.is_combo = "1", e.removeData("is_combo")), fn_cart.gaAddRemoveEvent("Checkout_Slot_Remove", "Checkout_Slot", JSON.stringify(n)), n.Source = "Checkout_Slot", clevertap.event.push("Remove Items", n), fn_home.sendBranchEvent("remove_from_cart", r.product, !0), fn_cart.updatePrdPage(r, "update"), e.parents(".qc-products").find('[data-sprid="' + t + '"]').addClass("remove"), fn.checkout_oos.cartCount(), setTimeout(function () {
                        e.parents(".qc-products").find('[data-sprid="' + t + '"]').removeClass("remove"), e.parents(".qc-products").find('[data-sprid="' + t + '"]').remove()
                    }, 600)
                }
            })
        })
    },
    showCircularLoader: function (e) {
        $(e).html('<div class="circular-loader"></div>')
    },
    GaEventcart: function (e, t, a, o) {
        ga("send", "event", {
            eventCategory: e,
            eventAction: t,
            eventLabel: a,
            eventValue: o
        })
    },
    pushEEAddToCartNotOnCartView: function (e) {
        try {
            var t = e.product.product_id,
                a = e.product.product_name,
                o = e.product.category_id,
                s = e.product.base_price,
                r = e.product.quantity,
                n = "INR";
            e && window.dataLayer && dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    currencyCode: "INR",
                    add: {
                        products: [{
                            item_id: t,
                            item_category: o,
                            price: s,
                            quantity: r,
                            currency: n,
                            item_name: a
                        }]
                    }
                }
            })
        } catch (i) {}
    },
    pushEERemoveFromCartNotOnCartView: function (e) {
        try {
            var t = e.product.product_id,
                a = e.product.category_id,
                o = e.product.product_name,
                s = e.product.base_price,
                r = e.product.quantity,
                n = "INR";
            e && window.dataLayer && dataLayer.push({
                event: "remove_from_cart",
                ecommerce: {
                    currencyCode: "INR",
                    remove: {
                        products: [{
                            item_id: t,
                            item_category: a,
                            price: s,
                            quantity: r,
                            currency: n,
                            item_name: o
                        }]
                    }
                }
            })
        } catch (i) {}
    },
    addcart: function (e, t) {
        $(".addCartBtn-home").on("click", function (t) {
            if (t.preventDefault(), t.stopImmediatePropagation(), !$(this).hasClass("disabled")) {
                var a = $(this),
                    o = parseInt(a.parent().find(".item-qty").html()),
                    s = $(this).data("prid"),
                    r = $(this).data("qty"),
                    n = $(this).data("recommended"),
                    i = o + 1;
                if (!(i <= r)) return void Materialize.toast("Only " + r + " units left", 3e3);
                if (!a.hasClass("ub")) {
                    var l = '<div class = "load_elem loader-div"></div>';
                    a.closest('[data-prod="' + s + '"]').append(l), a.css("opacity", "0.7").prop("disabled", !0);
                    var d = "",
                        c = {};
                    "favourites" === e ? (d = "/reorder/update-cart-reorder", c = {
                        products: [{
                            product_id: s,
                            quantity: i
                        }],
                        flow_key: 1
                    }) : d = "/checkout_oos/cart-item-update/" + s + "/" + i, a.parent().find(".item-qty").val(i), a.addClass("ub"), fn.checkout_oos.ajaxForm(c, "POST", d).done(function (t) {
                        try {
                            var o = JSON.parse(t);
                            fn_home.pushEEAddToCartNotOnCartView(o), fn_home.checkForCombo(o, e);
                            var r = "",
                                i = "";
                            if (o.message && "" != o.message) {
                                $(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), $('[data-prod="' + s + '"]').addClass("complete");
                                var l = parseInt(a.data("index")) + 1;
                                "home" == e && (i = "homepage_widget", r = "Home Page - " + a.data("cat") + " - " + o.product.product_name, fn_home.GaEventcart("Cart", "HomePage" + a.data("cat") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "category" == e && (i = "category_browse", r = "Product Listing Page - " + a.data("cat") + " - " + o.product.product_name, fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPageProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "pdp" == e && (i = "product_page", r = "Product Detail Page - " + a.data("cat") + " - " + o.product.product_name, fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "search_result" == e && (i = "search_result", r = "Search Page")
                            } else if ($(".add_message").hide(), "success" == o.status)
                                if (fn_home.updateAvailabilityMsg(o, a), "favourites" == e) {
                                    fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.product[0].quantity), fn_home.findUpdate(s, o.product[0].quantity), a.parent().addClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                                    var d = parseInt(a.data("index")) + 1;
                                    i = "favorite_items", r = "Favourites Page - " + a.data("cat") + " - " + o.product[0].product_name, fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductAddedToCart", a.data("text") + " - Pos:" + d, a.data("amt")), fbq("track", "AddToCart", {
                                        content_type: "product",
                                        incoming_source: i,
                                        content_ids: o.product[0].product_id,
                                        content_name: o.product[0].product_name,
                                        content_category: a.data("cat"),
                                        value: a.data("amt"),
                                        currency: "INR"
                                    })
                                } else {
                                    fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.product.quantity), fn_home.findUpdate(s, o.product.quantity), a.parent().addClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                                    var l = parseInt(a.data("index")) + 1;
                                    "home" == e && (i = "homepage_widget", r = "Home Page - " + a.data("cat") + " - " + o.product.product_name, fn_home.GaEventcart("Cart", "HomePage" + a.data("cat") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "category" == e && (i = "category_browse", r = "Product Listing Page - " + a.data("cat") + " - " + o.product.product_name, fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPageProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "pdp" == e && (i = "product_page", r = "Product Detail Page - " + a.data("cat") + " - " + o.product.product_name, fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "search_result" == e && (i = "search_result", r = "Search Page"), fbq("track", "AddToCart", {
                                        content_type: "product",
                                        incoming_source: i,
                                        content_ids: o.product.product_id,
                                        content_name: o.product.product_name,
                                        content_category: a.data("cat"),
                                        value: a.data("amt"),
                                        currency: "INR"
                                    })
                                }
                            else Materialize.toast(o.message, 3e3);
                            var c = {
                                "Product ID": o.product.product_id ? o.product.product_id : o.product[0].product_id,
                                "Product Name": o.product.product_name ? o.product.product_name : o.product[0].product_name,
                                Price: o.product.base_price ? Number(o.product.base_price) : Number(o.product[0].base_price),
                                Quantity: o.product.quantity ? Number(o.product.quantity) : Number(o.product[0].quantity),
                                incoming_source: i,
                                Checkout_Flow: "favourites" === e ? quick_checkout : old_checkout,
                                "Category ID": o.product.category_id && null != o.product.category_id ? o.product.category_id : Array.isArray(o.product) && o.product[0].category_id && null != o.product[0].category_id ? o.product[0].category_id : "",
                                hub_id: fn_ll.getterLS("hub_id")
                            };
                            1 == n && (c.product_type = "recommended"), clevertap.event.push("Added to Cart", c), clevertap.event.push("Product added to cart", c), fn_home.sendBranchEvent("add_to_cart", o.product)
                        } catch (u) {
                            Materialize.toast("Something went wrong. Please try again", 5e3), a.removeClass("ub"), setTimeout(function () {
                                $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                            }, 600), setTimeout(function () {
                                $(".add_message").hide()
                            }, 5e3), console.log(u)
                        }
                    }).always(function () {
                        a.removeClass("ub"), setTimeout(function () {
                            $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                        }, 600), setTimeout(function () {
                            $(".add_message").hide()
                        }, 7e3)
                    })
                }
            }
        }), $(".add-one").on("click", function (t) {
            if (t.preventDefault(), t.stopImmediatePropagation(), !$(this).hasClass("disabled")) {
                var a = $(this),
                    o = parseInt(a.parent().find(".item-qty").html()),
                    s = $(this).data("prid"),
                    r = $(this).data("qty"),
                    n = $(this).data("recommended"),
                    i = o + 1;
                if (!(i <= r)) return void Materialize.toast("Only " + r + " units left", 3e3);
                if (!a.hasClass("ub")) {
                    var l = '<div class = "load_elem loader-div"></div>';
                    a.closest('[data-prod="' + s + '"]').append(l), a.css("opacity", "0.7").prop("disabled", !0);
                    var d = "",
                        c = {};
                    "favourites" === e ? (d = "/reorder/update-cart-reorder", c = {
                        products: [{
                            product_id: s,
                            quantity: i
                        }],
                        flow_key: 1
                    }) : d = "/checkout_oos/cart-item-update/" + s + "/" + i, a.parent().find(".item-qty").val(i), a.addClass("ub"), fn.checkout_oos.ajaxForm(c, "POST", d).done(function (t) {
                        try {
                            var o = JSON.parse(t);
                            fn_home.pushEEAddToCartNotOnCartView(o), fn_home.checkForCombo(o, e);
                            var r = "",
                                i = "";
                            if (o.message && "" != o.messag) $(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), a.parent().addClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                            else if ($(".add_message").hide(), "success" == o.status)
                                if (fn_home.updateAvailabilityMsg(o, a), "favourites" == e) {
                                    fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.product[0].quantity), a.parent().addClass("slide"), fn_home.findUpdate(s, o.product[0].quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                                    var l = parseInt(a.data("index")) + 1;
                                    i = "favorite_items", r = "Favourites Page", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))
                                } else {
                                    fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.product.quantity), a.parent().addClass("slide"), fn_home.findUpdate(s, o.product.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                                    var l = parseInt(a.data("index")) + 1;
                                    "home" == e && (i = "homepage_widget", r = "Home Page", fn_home.GaEventcart("Cart", "HomePage" + a.data("cat") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "category" == e && (i = "category_browse", r = "Product Listing Page", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPageProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "pdp" == e && (i = "product_page", r = "Product Detail Page", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductAddedToCart", a.data("text") + " - Pos:" + l, a.data("amt"))), "search_result" == e && (i = "search_result", r = "Search Page")
                                }
                            else Materialize.toast(o.message, 3e3);
                            var d = {
                                "Product ID": o.product.product_id ? o.product.product_id : o.product[0].product_id,
                                "Product Name": o.product.product_name ? o.product.product_name : o.product[0].product_name,
                                Price: o.product.base_price ? Number(o.product.base_price) : Number(o.product[0].base_price),
                                Quantity: o.product.quantity ? Number(o.product.quantity) : Number(o.product[0].quantity),
                                incoming_source: i,
                                hub_id: fn_ll.getterLS("hub_id"),
                                "Category ID": o.product.category_id && null != o.product.category_id ? o.product.category_id : Array.isArray(o.product) && o.product[0].category_id && null != o.product[0].category_id ? o.product[0].category_id : "",
                                Checkout_Flow: "favourites" === e ? quick_checkout : old_checkout
                            };
                            1 == n && (d.product_type = "recommended"), clevertap.event.push("Added to Cart", d), fn_home.sendBranchEvent("add_to_cart", o.product)
                        } catch (c) {
                            Materialize.toast("Something went wrong. Please try again", 5e3), a.removeClass("ub"), setTimeout(function () {
                                $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                            }, 600), setTimeout(function () {
                                $(".add_message").hide()
                            }, 5e3), console.log(c)
                        }
                    }).always(function () {
                        a.removeClass("ub"), setTimeout(function () {
                            $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                        }, 600), setTimeout(function () {
                            $(".add_message").hide()
                        }, 7e3)
                    })
                }
            }
        }), $(".item-title").on("click", function (e) {
            var t = $(this);
            t.find(".product-name").html().length >= char_limit && !t.hasClass("show-full") && (t.addClass("show-full"), t.find(".ellipsis-container").hide(), e.preventDefault(), e.stopImmediatePropagation())
        }), $(".htc-cta").on("click", function (e) {
            e.preventDefault(), e.stopImmediatePropagation();
            var t = $(this).data("video-embed-url");
            loadAndPlayVideo(t);
            var a = "";
            "category_page" === $(this).data("page") ? a = $(this).closest(".card").data("prod") : "product_page" === $(this).data("page") && (a = $(".product-detail-wrapper .product-desc-block").data("prod"));
            var o = {
                city_name: fn_ll.getCityFromLS(),
                hub_id: fn_ll.getHubFromLS(),
                "user_identifier ": $(".customer_key_value.master").val(),
                category_name: $(".cat-list .active").text().trim(),
                page: $(this).data("page"),
                product_id: a
            };
            clevertap.event.push("screencat_cookingvideo", o)
        })
    },
    removecart: function (e) {
        $(".remove-one").on("click", function (t) {
            t.preventDefault(), t.stopImmediatePropagation();
            var a = $(this),
                o = parseInt(a.parent().find(".item-qty").html()),
                s = $(this).data("prid"),
                r = ($(this).data("qty"), $(this).data("recommended")),
                n = o - 1;
            if (n > 0) {
                if (a.hasClass("ub")) return;
                var i = '<div class = "load_elem loader-div"></div>';
                a.closest('[data-prod="' + s + '"]').append(i), a.css("opacity", "0.7").prop("disabled", !0);
                var l = "",
                    d = {};
                "favourites" === e ? (l = "/reorder/update-cart-reorder", d = {
                    products: [{
                        product_id: s,
                        quantity: n
                    }],
                    flow_key: 1
                }) : l = "/checkout_oos/cart-item-update/" + s + "/" + n, a.parent().find(".item-qty").val(n), a.addClass("ub"), fn.checkout_oos.ajaxForm(d, "POST", l).done(function (t) {
                    try {
                        var o = JSON.parse(t),
                            n = "";
                        if (fn_home.pushEERemoveFromCartNotOnCartView(o), fn_home.checkForCombo(o, e), o.message && "" != o.message) {
                            $(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                            var i = parseInt(a.data("index")) + 1;
                            "home" == e && (n = "homepage_widget", fn_home.GaEventcart("cart", "HomePage" + a.data("cat") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))), "category" == e && (n = "category_browse", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPageProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))), "pdp" == e && (n = "product_page", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))), "search_result" == e && (n = "search_result")
                        } else if ($(".add_message").hide(), "success" == o.status) {
                            if (fn_home.updateAvailabilityMsg(o, a), "favourites" == e) {
                                n = "favorite_items", fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.product[0].quantity), fn_home.findUpdate(s, o.product[0].quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                                var i = parseInt(a.data("index")) + 1;
                                fn_home.GaEventcart("Cart", a.data("cat") + "Favourites" + a.data("title") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))
                            } else {
                                fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.product.quantity), fn_home.findUpdate(s, o.product.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                                var i = parseInt(a.data("index")) + 1;
                                "home" == e && (n = "homepage_widget", fn_home.GaEventcart("cart", "HomePage" + a.data("cat") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))), "category" == e && (n = "category_browse", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPageProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))), "pdp" == e && (n = "product_page", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt"))), "search_result" == e && (n = "search_result")
                            }
                            var l = {
                                "Product ID": o.product.product_id ? o.product.product_id : o.product[0].product_id,
                                "Product Name": o.product.product_name ? o.product.product_name : o.product[0].product_name,
                                incoming_source: n
                            };
                            1 == r && (l.product_type = "recommended"), clevertap.event.push("Product Removed from Cart", l), fn_home.sendBranchEvent("remove_from_cart", o.product)
                        } else Materialize.toast(o.message, 3e3)
                    } catch (d) {
                        Materialize.toast("Something went wrong. Please try again", 5e3), a.removeClass("ub"), setTimeout(function () {
                            $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                        }, 600), setTimeout(function () {
                            $(".add_message").hide()
                        }, 5e3), console.log(d)
                    }
                }).always(function () {
                    a.removeClass("ub"), setTimeout(function () {
                        $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                    }, 600), setTimeout(function () {
                        $(".add_message").hide()
                    }, 7e3)
                })
            } else {
                var i = '<div class = "load_elem loader-div"></div>';
                a.closest('[data-prod="' + s + '"]').append(i), a.css("opacity", "0.7").prop("disabled", !0);
                var c = "/checkout_oos/cart-item-delete/" + s,
                    d = {};
                "favourites" === e && (d = {
                    type: "reorder"
                }), fn.checkout_oos.ajaxForm(d, "POST", c).done(function (t) {
                    try {
                        var o = JSON.parse(t);
                        fn_home.pushEERemoveFromCartNotOnCartView(o), fn_home.checkForCombo(o, e);
                        var n = "";
                        if ("home" == e && (fn_home.GaEventcart("Cart", "HomePage" + a.data("cat") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt")), n = "Home Page", incoming_source = "homepage_widget"), "category" == e && (incoming_source = "category_browse", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPageProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt")), n = "Product Listing Page"), "pdp" == e && (incoming_source = "product_page", fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt")), n = "Product Detail Page"), "favourites" == e && (fn_home.GaEventcart("Cart", a.data("cat") + "CategoryPDP" + a.data("title") + "ProductRemovedFromCart", a.data("text") + " - Pos:" + i, a.data("amt")), n = "Favourites Page", incoming_source = "favorite_items"), "search_result" == e && (incoming_source = "search_result", n = "Search Page"), "" != o.message) $(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), a.parent().parent().removeClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                        else if ($(".add_message").hide(), "success" == o.status) {
                            fn_home.updateAvailabilityMsg(o, a), fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty").html(o.quantity), a.parent().parent().removeClass("slide"), fn_home.findUpdate(s, o.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                            var i = parseInt(a.data("index")) + 1,
                                l = {
                                    "Product ID": o.product.product_id ? o.product.product_id : o.product[0].product_id,
                                    "Product Name": o.product.product_name ? o.product.product_name : o.product[0].product_name,
                                    incoming_source: incoming_source
                                };
                            1 == r && (l.product_type = "recommended"), clevertap.event.push("Product Removed from Cart", l), fn_home.sendBranchEvent("remove_from_cart", o.product, !0)
                        } else Materialize.toast(o.message, 3e3)
                    } catch (d) {
                        Materialize.toast("Something went wrong. Please try again", 5e3), a.removeClass("ub"), setTimeout(function () {
                            $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                        }, 600), setTimeout(function () {
                            $(".add_message").hide()
                        }, 5e3), console.log(d)
                    }
                }).always(function () {
                    a.removeClass("ub"), setTimeout(function () {
                        $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                    }, 600), setTimeout(function () {
                        $(".add_message").hide()
                    }, 7e3)
                })
            }
        })
    },
    findUpdate: function (e, t) {
        var a = $('[data-prod="' + e + '"]');
        a.find(".item-qty").html(t), a.find(".item-qty-pdp").html(t), a.find(".item-qty-pdp").attr("data-qty", t), t > 0 ? (a.find(".action-slider").addClass("slide"), a.find(".action-slider1").addClass("slide")) : (a.find(".action-slider").removeClass("slide"), a.find(".action-slider1").removeClass("slide"))
    },
    checkForCombo: function (e, t) {
        var a = e.hasOwnProperty("combo") && null !== e.combo ? e.combo : [],
            o = e.hasOwnProperty("combo_products") && null !== e.combo_products ? e.combo_products : [],
            s = a.concat(o);
        s.length && s.map(function (e) {
            var t = $('[data-prod="' + e.product_id + '"]');
            t.find(".item-qty").html(e.quantity), void 0 != e.next_available_by && null != e.next_available_by && "" != e.next_available_by && t.find(".product-message").find(".message").html(e.next_available_by), Number(e.quantity) > 0 ? t.find(".action-slider").addClass("slide") : t.find(".action-slider").removeClass("slide"), Number(e.quantity) > 0 ? t.find(".action-slider1").addClass("slide") : t.find(".action-slider1").removeClass("slide")
        })
    },
    lazyLoad: function () {
        var e = $(".deals.todays-deal"),
            t = !0,
            a = $(".deals.also-like"),
            o = !0,
            s = $(".deals.explore-category"),
            r = !0,
            n = $(".banner"),
            i = !0,
            l = $(".deals.best-sellers"),
            d = !0,
            c = $(".deals.our-blog"),
            u = !0,
            p = $(".made-with-licious"),
            m = !0,
            h = $(".in-news"),
            f = !0,
            v = -50;
        parseInt(e.position().top) < window.innerHeight && e.addClass("reveal"), window.addEventListener("scroll", function () {
            parseInt(window.pageYOffset);
            t && $(window).scrollTop() >= parseInt(window.innerHeight - e.offset().top) && (fn_home.homeDeals(), e.addClass("reveal"), t = !1), o && $(window).scrollTop() >= parseInt(a.offset().top - window.innerHeight + v) && (fn_home.homeRecommendations(), a.addClass("reveal"), o = !1), r && $(window).scrollTop() >= parseInt(s.offset().top - window.innerHeight + v) && (fn_home.homeExplore(), s.addClass("reveal"), r = !1), i && $(window).scrollTop() >= parseInt(n.offset().top - window.innerHeight + v) && (fn_home.homeUspbanner(), n.addClass("reveal"), i = !1), d && $(window).scrollTop() >= parseInt(l.offset().top - window.innerHeight + v) && (fn_home.homeBestsellers(), l.addClass("reveal"), d = !1), u && $(window).scrollTop() >= parseInt(c.offset().top - window.innerHeight + v) && (fn_home.homeBlogs(), c.addClass("reveal"), u = !1), m && $(window).scrollTop() >= parseInt(p.offset().top - window.innerHeight + v) && (fn_home.homeTestimonials(), p.addClass("reveal"), m = !1), f && $(window).scrollTop() >= parseInt(h.offset().top - window.innerHeight + v) && (h.addClass("reveal"), f = !1)
        })
    },
    youAlsoLike: function () {
        var e = $(".pr_id").val(),
            t = $(".pr_name").val(),
            a = $(".slug").val();
        fn_home.ajaxForm({
            prId: e,
            prName: t,
            slug: a
        }, "POST", "/home_page/you-also-like").done(function (e) {})
    },
    savedAddresses: function (e) {
        $(".sublocation-popup-wrapper").addClass("clicked"), fn_home.ajaxForm({}, "GET", "/checkout_oos/get-addr").done(function (e) {
            var t = JSON.parse(e),
                a = t.address,
                o = "",
                s = localStorage.getItem("default_addr_id");
            localStorage.getItem("hub_id");
            if (0 == a.length || null == a) $(".sublocation-popup-wrapper").addClass("hide"), $(".sublocation-old-popup").addClass("hide"), $(".location-search-pop-wrapper").removeClass("hide"), $(".location-search-pop-wrapper").addClass("show");
            else {
                $(".sublocation-popup-wrapper").addClass("show"), $(".sublocation-old-popup").addClass("show"), $(".location-search-pop-wrapper").addClass("hide"), $(".location-search-pop-wrapper").removeClass("show");
                var r = "";
                1 == a.length && (r = "fullwidth"), 2 == a.length && (r = "halfwidth"), a.length > 2 && (r = "onethird"), $.map(a, function (e, t) {
                    o = s == e.address_id ? "selected" : "";
                    var a = '<div class="address ' + r + " " + o + '" data-addrid="' + e.address_id + '" data-lat="' + e.lat + '" data-lng="' + e.lng + '" data-location="' + e.line2 + '" data-index="' + t + '" data-city="' + e.city + '"><span title = "' + e.line2 + '">' + e.line1 + "</span></div>";
                    $(".addresses-block .addresses-list").append(a)
                })
            }
        }).always(function () {
            $(".addresses-list").find(".address").on("click", function (e) {
                var t = $(this).attr("data-addrid"),
                    a = $(this).data("lat"),
                    o = $(this).data("lng"),
                    s = $(this).data("location"),
                    r = $(this).data("index"),
                    n = ($(this).data("city"), $(".pageName").val()),
                    i = "";
                void 0 != n && ("homepage" == n ? i = "SL-Homepage - SavedAddress" : "plp" == n ? i = "SL-Product listing page - SavedAddress" : "pdp" == n && (i = "SL-Product detail page - SavedAddress"), fn_sublocation.gaSublocation(i, "Click", r + 1)), $.ajax({
                    url: placesFormLanding.getAttribute("data-url"),
                    type: "POST",
                    data: {
                        lat: $(this).data("lat"),
                        lng: $(this).data("lng"),
                        location: $(this).data("location"),
                        clearcart: "true"
                    },
                    timeout: 2e4,
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
                    }
                }).done(function (e) {
                    if ("success" == e.result) {
                        var r = "Loc:" + s + " Lat:" + a + " Lon:" + o;
                        localStorage.setItem("showLocation", "hide"), localStorage.setItem("default_addr_id", t), localStorage.setItem("hub_id", e.hub_id), localStorage.setItem("city_name", e.city_name), void 0 != n && ("homepage" == n ? i = "SL-Homepage - Change Address" : "plp" == n ? i = "SL-Product listing page - Change Address" : "pdp" == n && (i = "SL-Product detail page - Change Address"), fn_sublocation.gaSublocation(i, "Click", r));
                        var l = e.hub_id,
                            d = e.city_name,
                            c = $(".customer_key_value.master").val();
                        void 0 != c ? window.dataLayer.push({
                            user_logged_in: !0,
                            user_current_hub: l,
                            user_current_location: a + ", " + o,
                            user_current_city: d
                        }) : window.dataLayer.push({
                            user_logged_in: !1,
                            user_current_hub: l,
                            user_current_location: a + ", " + o,
                            user_current_city: d
                        }), window.location.reload()
                    } else {
                        localStorage.setItem("showLocation", "show");
                        var u = '<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/loc-err.png" alt="">We are working hard to bring safe, fresh meats and seafood to you soon. We will inform you as soon as we are up and running.';
                        $(".sublocation-popup-wrapper").find(".loc-error-addr").html(u).addClass("abs").show(), $(".use-my-loc").show(), $(".loader-img").hide(), ga("send", {
                            hitType: "event",
                            eventCategory: "LocationError",
                            eventAction: "Error",
                            eventLabel: "Loc:" + s + " Lat:" + a + " Lon:" + o + " - NoService"
                        })
                    }
                }).always(function () {
                    document.addEventListener("click", function (e) {
                        "loc-screen show" == e.target.className && ($(".main-sublocation-wrapper").removeClass("show"), $(".loc-screen").removeClass("show"), $(".location-search-pop-wrapper").removeClass("show"), $(".sublocation-old-popup").show(), $(".loc-error, .loc-error-addr").hide())
                    })
                }).fail(function (e) {
                    $(".use-my-loc").show(), $(".loader-img").hide()
                })
            })
        })
    },
    bindNotifyMeButton: function (e) {
        $(e).click(function (t) {
            var a = $(this);
            if (t.stopPropagation(), t.preventDefault(), !a.hasClass("notified"))
                if ("true" === $(".req-mob-no-popup").attr("data-logged-in")) {
                    var o = {
                        product_id: a.attr("data-pr-id")
                    };
                    fn_home.setNotification(e, o, a)
                } else $(".req-mob-no-popup").addClass("show"), $(".loc-screen").addClass("show"), $(".mob-no").keyup(function () {
                    10 === $(this).val().length ? fn_checkout.mobile_regex.test($(this).val()) ? $(".proceed").prop("disabled", !1) : ($(".proceed").prop("disabled", !0), $(".mob-no-error").addClass("show"), setTimeout(function () {
                        $(".mob-no-error").removeClass("show")
                    }, 3e3)) : $(".proceed").prop("disabled", !0)
                }), $(".proceed").click(function (t) {
                    t.preventDefault();
                    var o = {
                        product_id: a.attr("data-pr-id"),
                        phone_no: $(".mob-no").val()
                    };
                    fn_home.setNotification(e, o, a), $(".req-mob-no-popup").removeClass("show"), $(".loc-screen").removeClass("show")
                }), $(".close").click(function () {
                    $(".req-mob-no-popup").removeClass("show"), $(".loc-screen").removeClass("show")
                })
        })
    },
    setNotification: function (e, t, a) {
        var o = arguments.length <= 3 || void 0 === arguments[3] || arguments[3];
        fn_main.showloader();
        var s = "/loyalty/notify-me",
            r = "";
        o || (r = a.getAttribute("data-ship-id")), fn_home.ajaxForm(t, "POST", s).done(function (s) {
            var n = JSON.parse(s);
            if (fn_main.hideloader(), 200 === n.statusCode) {
                var i = "";
                null !== fn_home.getCookie("notify_products") && "" !== fn_home.getCookie("notify_products") && (i += fn_home.getCookie("notify_products")), i += o ? "" !== i ? "," + t.product_id : t.product_id : "" !== i ? "," + r : r;
                var l = new Date,
                    d = new Date;
                d.setFullYear(l.getFullYear()), d.setMonth(l.getMonth()), d.setDate(l.getDate() + 1), d.setHours(0), d.setMinutes(0), d.setSeconds(0);
                var c = "expires=" + d.toString();
                if (fn_home.setCookie("notify_products", i, c), o) {
                    var u = $('[data-prod="' + t.product_id + '"]');
                    a = u.find(".notify-me"), a.addClass("notified"), a.children(".alarm").attr("src", "/img/tick_symbol.svg"), a.children(".alarm").attr("data-lazy", "/img/tick_symbol.svg"), ".search-notify-me" === e ? (a.closest(".search-item").find(".product-message").removeClass("oos").addClass("notified"), a.closest(".search-item").find(".product-message").html(n.message)) : (u.find(".icon-message .message").html(n.message), u.find(".icon-message .message").removeClass("oos").addClass("notified"))
                } else {
                    a.classList.add("notified"), a.innerHTML = '<img src="/img/tick_symbol.svg" class="alarm" > NOTIFY ME';
                    var p = a.previousElementSibling;
                    p.innerHTML = n.message, p.classList.add("notified")
                }
                if (localStorage.setItem("notified-msg", n.message), o) {
                    var m = {
                        incoming_source: "",
                        category_name: "",
                        product_name: "",
                        product_id: "",
                        price: "",
                        discount: "",
                        product_url: "",
                        product_image_url: ""
                    };
                    ".notify-me-pdp" === e ? (m.product_name = $(".title .heading").html(), m.product_image_url = a.attr("data-pr-img-url"), m.product_url = window.location.href) : ".search-notify-me" === e ? (m.product_image_url = a.closest(".product-card").find("img.product-img").attr("src"), m.product_url = a.closest(".product-click-container").data("url"), m.product_name = a.closest(".product-click-container").attr("data-text")) : (m.product_image_url = a.closest(".item-img").find("img:first").attr("src"), m.product_url = a.closest("a").attr("href"), m.product_name = a.closest("a").attr("data-text")), m.price = a.attr("data-price"), m.product_id = t.product_id, m.category_name = a.attr("data-cat"), m.incoming_source = ".search-notify-me" === e ? "search_result" : a.attr("data-cat"), m.discount = a.attr("data-discount"), fn_ll.populateNotifyMeData(m), fn_ll.sendAnalyticsData("notify_productOOS", _extends({}, fn_ll.notify_me_ana_obj, {
                        source: "availability"
                    }))
                } else
                    for (var h = a.parentElement.parentElement, f = h.children, v = 0; v < Number(h.childElementCount) - 1; v++) {
                        var m = {
                            incoming_source: "past_order",
                            source: "availability",
                            category_name: f[v].querySelector(".product-name").getAttribute("data-cat-name"),
                            product_name: f[v].querySelector(".product-name").innerHTML,
                            product_id: f[v].lastElementChild.getAttribute("data-product-id"),
                            price: f[v].querySelector(".product-disc-price").getAttribute("data-base-price"),
                            discount: f[v].querySelector(".product-disc-price").getAttribute("data-discount"),
                            product_image_url: f[v].querySelector(".product-image").getAttribute("src"),
                            product_url: f[v].querySelector(".product-image").getAttribute("data-prod-url")
                        };
                        fn_ll.sendAnalyticsData("notify_productOOS", _extends({}, m, fn_ll.qc_obj))
                    }
            }
        }).always(function () {
            fn_main.hideloader()
        })
    },
    getCookie: function (e) {
        for (var t = e + "=", a = document.cookie.split(";"), o = 0; o < a.length; o++) {
            for (var s = a[o];
                " " == s.charAt(0);) s = s.substring(1);
            if (0 == s.indexOf(t)) return s.substring(t.length, s.length)
        }
        return ""
    },
    setCookie: function (e, t, a) {
        document.cookie = e + "=" + t + ";" + a + ";path=/"
    },
    validateCookieForProduct: function (e) {
        var t = fn_home.getCookie("notify_products");
        return !!t.includes(e)
    }
};
var productView = {};
fn_product_page = {
    getUsp: function (e, t) {
        fn_home.ajaxForm({
            cat_id: e
        }, "POST", "/home_page/get-usp").done(function (e) {
            var a = JSON.parse(e);
            $(".usp-container .usp").append('<h1 class="name">' + t + "</h1>"), $.each(a.data, function (e, t) {
                var a = '<div class="images"><p><img data-lazy="' + t.img + '" alt=""><span>' + t.text + '<span class = "tool-tip">' + t.tooltip + "</span></span></p></div></div>";
                $(".usp-container .usp").append(a)
            }), fn_home.getAllDOMImages()
        })
    },
    getCatDetails: function () {
        var e = $(".cat-list .active").data("id");
        e && fn_home.ajaxForm({
            cat_id: e
        }, "POST", "/home_page/get-category-details").done(function (e) {
            var t = JSON.parse(e);
            clevertap.event.push("Category Viewed", {
                "Category Name": t.data.cat_name,
                "Category ID": Number(t.data.id),
                "Hub ID": localStorage.getItem("hub_id"),
                "City Name": localStorage.getItem("city_name")
            })
        })
    },
    productListing: function () {
        var e = $(".cat-list .active").data("id"),
            t = $(".cat-list .active").text();
        $(".cat-list .active").data("slug");
        e && fn_home.ajaxForm({
            cat_id: e
        }, "POST", "/home_page/get-product-listing").done(function (a) {
            var o = JSON.parse(a);
            if (fn_home.pushEEProductImpressionCategoryPage(o), fn_product_page.getUsp(e, t), "success" == o.status && o.data.length > 0) {
                var s = [];
                $.each(o.data, function (e, a) {
                    var r = (a.product_pricing.base_discount + " %OFF", a.product_pricing.base_discount > 0 ? "show" : "hide"),
                        n = $(".cat-list .active").data("slug");
                    s.push(a.product_master.product_id);
                    var i = fn_home.renderActionButtonandClusterMessage(a, t, "category-notify-me", e),
                        l = i.actionButton,
                        d = i.productMessageDiv,
                        c = '<div class="card" data-prod="' + a.product_master.product_id + '"> \n                  <a  href="/' + n + "/" + a.product_master.slug + '"  data-text="' + a.product_merchantdising.merchandise_name + '" data-index="' + e + '">\n                    <div class="item-img">\n                      <img class="product-image" data-lazy="' + a.product_merchantdising.pr_image + '" alt="' + a.product_merchantdising.product_shortname + '" title="' + a.product_merchantdising.product_shortname + '">\n                      ' + (a.product_videos.length && a.product_videos[0].video_link ? '\n                        <div class="htc-placeholder">\n                          <div class="htc-cta" data-video-embed-url="' + a.product_videos[0].video_link + '" data-page="category_page">\n                            <img class="htc-play-symbol" src="/img/play_icon.svg" alt="playbutton"/>\n                            <span class="cta-text">How to cook</span>\n                          </div>\n                        </div>' : "") + '\n                      <div class="item-details">\n                        ' + fn_home.getItemName(a.product_merchantdising.merchandise_name) + "\n                        " + fn_home.getItemDescription(a.product_merchantdising.usp_desc) + "\n                        " + fn_home.getProductWeightDetails(a, n) + '\n                        <div class="item-action">\n                          <div class="rate">\n                            ' + fn_home.getMrpText(r, a) + '\n                          </div>\n                          <div class="action">\n                            <div class="action-slider">\n                              ' + l + "\n                              <p>" + fn_home.getPlusandMinusButtons(a, t, e) + "</p>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    " + d + "\n                  </a>\n                </div>";
                    $(".deals.product-list .item-slider").append(c), 2 !== e && o.data.length - 1 != e || $(".deals.product-list .item-slider").append('<p class="cat-ll-top-banner-placeholder"></p>'), 5 !== e && o.data.length - 1 != e || $(".deals.product-list .item-slider").append('<p class="cat-ll-bottom-banner-placeholder"></p>')
                }), fn_home.bindNotifyMeButton(".category-notify-me");
                var r = new LoyaltyBanners,
                    n = "cat";
                r.getLoyaltyBanner(n), fbq("track", "ViewCategory", {
                    content_category: t,
                    content_ids: s,
                    content_type: "product"
                }), fn_home.dealsCarousel(), fn_home.addcart("category", "Product Listing Page - " + t), fn_home.removecart("category")
            } else $(".deals.product-list").hide();
            var i = !1;
            $(document).on("scroll", function () {
                var e = document.querySelector(".cat-ll-top-banner-placeholder");
                !i && null !== e && fn_ll.checkElementInViewPort(e) && (i = !0, fn_ll.sendAnalyticsData("Banner", _extends({}, fn_ll.loyalty_banners_obj, {
                    source: "impression",
                    list: "" + t
                })))
            }), fn_home.getAllDOMImages()
        }).always(function () {
            fn_home.getCart()
        })
    },
    getRecipeDetails: function () {
        fn_home.ajaxForm({
            recipe_id: $(".recipe_id").val()
        }, "POST", "/get-recipe-details").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status) {
                var t = '<img data-lazy="' + e.recipe.Images[0] + '" class="responsive-img">';
                $(".whole-wrapper .img-wrap").html(t), $(".recipe-title .title-name").html(e.recipe.title);
                var a = "";
                "Breakfast" == e.recipe.category && (a = "https://s3-ap-southeast-1.amazonaws.com/liciousdev/Banner/Breakfast-1.png"), "Lunch" == e.recipe.category && (a = "https://s3-ap-southeast-1.amazonaws.com/liciousdev/Banner/Lunch-1.png"), "snacks" == e.recipe.category && (a = "https://s3-ap-southeast-1.amazonaws.com/liciousdev/Banner/Snack-1.png"), "Dinner" == e.recipe.category && (a = "https://s3-ap-southeast-1.amazonaws.com/liciousdev/Banner/Dinner-1.png"), $(".recipe-way .food1 img").attr("data-lazy", a), $(".recipe-name").html(e.recipe.title), $(".recipe-detail").html(e.recipe.description), $(".food").html(e.recipe.category);
                var o = "Cooking time " + e.recipe.prepTime;
                $(".time").html(o);
                var s = "Serves:" + e.recipe.serves;
                $(".serves1").html(s);
                var r = e.recipe.recipe_method.replace(/\n/g, "<br />");
                $(".recipe_title").html("Licious | " + e.recipe.title), $(".recipe-method p").html(r);
                var n = "";
                $.map(e.recipe.ingredients, function (e, t) {
                    n = n + '<li><div class="item-detail"><span class="count">' + (t + 1) + '</span><span class="item">' + e.ingredients_name + '</span><span class=""></span></div><div class="item-quantity"><span>' + e.ingredients_qty + " " + e.ingredients_measurement + "</span></div></li>"
                }), $(".recipe-list ul").html(n), fn_product_page.getRecipePrevNext(e.recipe.id)
            }
            fn_home.getAllDOMImages()
        })
    },
    getRecipePrevNext: function (e) {
        var t = $(".cat_id").val();
        fn_home.ajaxForm({
            cat_id: t
        }, "POST", "/get-prev-next-recipe").done(function (a) {
            var o, s = JSON.parse(a),
                r = s.data,
                n = r.length;
            n <= 1 && ($(".prev-click").hide(), $(".next-click").hide()), $.map(s.data, function (t, a) {
                t.id == e && (o = a)
            });
            var i = $(".whole-wrapper"),
                l = i.find(".prev-click"),
                d = i.find(".next-click");
            l.removeAttr("href"), d.removeAttr("href"), l.addClass("disabled"), d.addClass("disabled"), o > 0 && (prevSlug = "/recipes/" + r[o - 1].id + "/" + t, l.attr("href", prevSlug), $(".scroll-item-left .scroll-item-img img").attr("src", r[o - 1].Images[0]), $(".scroll-item-left .scroll-item-title span").text(r[o - 1].title), l.removeClass("disabled")), o < n - 1 && (nextSlug = "/recipes/" + r[o + 1].id + "/" + t, d.attr("href", nextSlug), $(".scroll-item-right .scroll-item-img img").attr("src", r[o + 1].Images[0]), $(".scroll-item-right .scroll-item-title span").text(r[o + 1].title), d.removeClass("disabled")), l.hover(function (e) {
                $(".scroll-item-left .scroll-item-img img").attr("src") ? ($(".scroll-item-left").css("display", "block"), $(".left").addClass("arrow-border-left"), $(".left-arrow .prev").addClass("active show")) : ($(".left").removeClass("arrow-border-left"), $(".left-arrow .prev").removeClass("active show"))
            }, function (e) {
                $(".left").removeClass("arrow-border-left"), $(".left-arrow .prev").removeClass("active show"), $(".scroll-item-left").css("display", "none")
            }), d.hover(function (e) {
                $(".scroll-item-right .scroll-item-img img").attr("src") && ($(".scroll-item-right").css("display", "block"), $(".right-arrow .next").addClass("active show"), $(".right").addClass("arrow-border-right"))
            }, function (e) {
                $(".right-arrow .next").removeClass("active show"), $(".right").removeClass("arrow-border-right"), $(".scroll-item-right").css("display", "none")
            })
        })
    },
    productDetailsFetch: function (e, t, a) {
        $(".product-breadcrumb .breadcrumb.second").attr("href", "/" + a);
        var o = a.charAt(0).toUpperCase() + a.slice(1);
        $(".product-breadcrumb .breadcrumb.second").text(o), fn_product_page.getProductDetails(e), fn_product_page.getOfferData(e), fn_product_page.getPrevNextData(e, t, a)
    },
    reverseTiming: function (e) {
        e = e.replace(" ", "T");
        var t = e.split(/[^0-9]/),
            a = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]).getTime(),
            o = setInterval(function () {
                var t = (new Date).getTime(),
                    s = a - t;
                if (Date.parse(e) < t) $(".discount").hide(), $(".timer").html("00:00:00"), $(".timer").fadeOut(), $(".timer-block").hide();
                else {
                    var r = Math.floor(s / 864e5),
                        n = Math.floor(s % 864e5 / 36e5) + 24 * r,
                        i = Math.floor(s % 36e5 / 6e4),
                        l = Math.floor(s % 6e4 / 1e3);
                    $(".timer").html(("0" + n).slice(-2) + ":" + ("0" + i).slice(-2) + ":" + ("0" + l).slice(-2)), 0 == r && 0 == n && 0 == i && 0 == l && ($(".timer").fadeOut(), $(".deals.todays-deal").fadeOut(), setTimeout(function () {
                        $(".deals.todays-deal").remove()
                    }, 500), clearInterval(o))
                }
            }, 1e3)
    },
    getProdId: function (e, t) {
        var a = localStorage.getItem("cat_id");
        fn_product_page.homeRecommendationsNew(t, e, a), fn_product_page.productDetailsFetch(t, a, e), setTimeout(function () {
            var e = $(".item-qty-pdp").data("qty");
            void 0 != e && Object.assign(productView, {
                Quantity: parseInt(e)
            })
        }, 5e3)
    },
    homeRecommendationsNew: function (e, t, a) {
        fn_home.ajaxForm({
            product_id: e,
            cat_id: a
        }, "POST", "/get-recomendtaion-home-new").done(function (e) {
            if (e = JSON.parse(e), localStorage.setItem("youMayAlsoLikePDP", null), "success" == e.status && e.data.length > 0) {
                localStorage.setItem("youMayAlsoLikePDP", JSON.stringify(e.data));
                var a = '<span class = "heading">' + e.title + "</span>";
                $(".also-like .header").html(a), $(".also-like .item-slider .viewport").html(""), $.each(e.data, function (e, a) {
                    var o = (a.product_pricing.base_discount + " %OFF", a.product_pricing.base_discount > 0 ? "show" : "hide"),
                        s = fn_home.renderActionButtonandClusterMessage(a, t, "pdprecommendation-notify-me", e),
                        r = s.actionButton,
                        n = s.productMessageDiv,
                        i = '<a  href="/' + t + "/" + a.product_master.slug + '" data-text="' + a.product_master.pr_name + '" data-index="' + e + '"><div class="card" data-prod="' + a.product_master.product_id + '"><div class="item-img"><img class="product-image" data-lazy="' + a.product_merchantdising.pr_image + '" alt="' + a.product_merchantdising.product_shortname + '" title="' + a.product_merchantdising.product_shortname + '"><div class="item-details">' + fn_home.getItemName(a.product_merchantdising.merchandise_name) + fn_home.getItemDescription(a.product_merchantdising.usp_desc) + fn_home.getProductWeightDetails(a, t) + '<div class="item-action"><div class="rate">' + fn_home.getMrpText(o, a) + '</div><div class="action"><div class="action-slider">' + r + "<p>" + fn_home.getPlusandMinusButtons(a, t, e) + ("</p></p></div></div></div></div></div>" + n + "</a>");
                    $(".also-like .item-slider .viewport").append(i)
                }), fn_home.bindNotifyMeButton(".pdprecommendation-notify-me"), fn_product_page.likeCarouselPDP(), fn_home.addcart("pdp", e.title), fn_home.removecart("pdp"), fn_home.gaClicks($(".also-like .item-slider .viewport").find("a"), e.title), fn_home.getAllDOMImages()
            } else $(".deals.also-like").hide(), $(".also-like .this_car_nav").hide()
        }).always(function (e) {
            JSON.parse(e);
            $(".also-like .this_car_nav").fadeIn(), fn_home.carNav("also-like"), fn_home.getCart()
        })
    },
    getPdpRecipeDetails: function (e, t) {
        var a = "";
        $.map(e, function (e, t) {
            a = 0 == t ? a + "?recipe_ids=" + e : a + "&recipe_ids=" + e
        });
        var o = !1;
        fn_home.ajaxForm({
            recipe: a
        }, "POST", "/get-pdp-recipe").done(function (e) {
            var t = JSON.parse(e),
                a = t.data;
            if (a.sort(fn_product_page.compareData), localStorage.setItem("RecipesData", JSON.stringify(a)), localStorage.setItem("pdp-recipe", JSON.stringify(t.data)), a.length > 0) {
                $(".prod-rec-button").show(), $(".prod-right-title").html("Recipes for your " + localStorage.getItem("cat_slug"));
                var s = a.length,
                    r = Math.floor(s / 6),
                    n = 1;
                if ($(".prod-others").empty(), s <= 6) {
                    $(".nav_arrow").hide();
                    var i = '<li class="cycle"></li>';
                    $(".prod-others").append(i), $.map(a, function (e, t) {
                        var a = '<div class="block-recipe1" data-gaaction="Clicks" data-pdplabel="' + e.title + '" data-index="' + t + '"><div class="product-image"><img data-lazy="' + e.Images != void 0 && Array.isArray(e.Images) && e.Images[0] ? e.Images[0] : '"></div><div class="image-title"><span data-id="' + e.id + '">' + e.title + "</span></div></div>";
                        $(".prod-others .cycle").append(a)
                    })
                } else {
                    o = !0;
                    for (var l, d = 0; d <= r; d++) {
                        var c = '<li class="cycle' + d + '"></li>';
                        $(".prod-others").append(c), l = n == r + 1 ? 6 * n - 6 + s % 6 : 6 * n;
                        for (var u = 6 * d; u < l; u++) {
                            var p = '<div class="block-recipe1" data-gaaction="Clicks" data-pdplabel="' + a[u].title + '" data-index="' + u + '"><div class="product-image">' + ('<img data-lazy="' + (a[u].Images && a[u].Images[0] ? a[u].Images[0] : "") + '"></div>') + '<div class="image-title"><span data-id="' + a[u].id + '">' + a[u].title + "</span></div></div>";
                            $(".prod-others").find(".cycle" + d).append(p)
                        }
                        n++
                    }
                }
                var m = $(".prod-others li:first-child .block-recipe1:first-child");
                m.find(".image-title").addClass("nav-active1"), m.find(".product-image").addClass("img-border");
                var h = m.find(".product-image img").attr("src") ? m.find(".product-image img").attr("src") : m.find(".product-image img").attr("data-lazy"),
                    f = m.find(".image-title span").text(),
                    v = m.find(".image-title span").data("id"),
                    g = "";
                $.map(a, function (e, t) {
                    e.id == v && (g = e.description)
                });
                var _ = m.data("index");
                $(".prod_left .prod-image img").attr("data-lazy", h), $(".prod-img-title p").html(f), $(".prod-img-desc p").html(g);
                var y = localStorage.getItem("cat_id");
                v = "/recipes/" + v + "/" + y, $(".prod-rec-button").attr("href", v), $(".prod-rec-button").attr("data-pdplabel", "View Recipe - " + f + " - Pos:" + (_ + 1));
                var b = localStorage.getItem("cat_slug") + "PDP - Recipe";
                fn_product_page.gaClicksPDP($(".prod-rec-button"), b), $(".prod-others li .block-recipe1").on("click", function () {
                    $(".image-title").removeClass("nav-active1"), $(".product-image").removeClass("img-border"), $(this).find(".product-image").addClass("img-border"), $(this).find(".image-title").addClass("nav-active1");
                    var e = $(this).find(".product-image img").attr("src") ? $(this).find(".product-image img").attr("src") : $(this).find(".product-image img").attr("dat-lazy"),
                        t = $(this).find(".image-title span").text(),
                        o = ($(this).find(".image-title span").data("id"), $(this).find(".image-title span").data("id")),
                        s = "";
                    $.map(a, function (e, t) {
                        e.id == o && (s = e.description)
                    });
                    var r = $(this).data("index");
                    $(".prod-rec-button").attr("data-pdplabel", "View Recipe - " + t + " - Pos:" + (r + 1));
                    var n = localStorage.getItem("cat_slug") + "PDP - Recipe";
                    fn_product_page.gaClicksPDP($(".prod-others li .block-recipe1").find(".prod-rec-button"), n), o = "/recipes/" + o + "/" + y, $(".prod_left .prod-image img").attr("src", e), $(".prod-img-title p").html(t), $(".prod-img-desc p").html(s), $(".prod-rec-button").attr("href", o), ga("send", {
                        hitType: "event",
                        eventCategory: localStorage.getItem("cat_slug") + "PDP - Recipe",
                        eventAction: "Click",
                        eventLabel: $(this).data("pdplabel") + " - Pos:" + ($(this).data("index") + 1),
                        transport: "beacon"
                    })
                })
            } else $(".bottom-container").hide();
            fn_home.getAllDOMImages()
        }).always(function () {
            if (1 == o) {
                $(".prod-others").cycle({
                    fx: "scrollHorz",
                    timeout: 0
                });
                var e = 0;
                $(".prod-others").on("cycle-prev", function (t, a) {
                    var o = JSON.parse(localStorage.getItem("pdp-recipe"));
                    e -= 6;
                    var s = o.splice(e, 6);
                    $.map(s, function (e, t) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: localStorage.getItem("cat_slug") + "PDP - Recipe",
                            eventAction: "Impression",
                            eventLabel: e.title + " - Pos:" + (t + 1)
                        })
                    })
                }), $(".prod-others").on("cycle-next", function (t, a) {
                    var o = JSON.parse(localStorage.getItem("pdp-recipe"));
                    e += 6;
                    var s = o.splice(e, 6);
                    $.map(s, function (t, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: localStorage.getItem("cat_slug") + "PDP - Recipe",
                            eventAction: "Impression",
                            eventLabel: t.title + " - Pos:" + (a + e + 1)
                        })
                    })
                })
            }
        })
    },
    get_how_to_eat: function (e) {
        if (e.data.length > 0 && void 0 != e.data && null != e.data) {
            $(".prod-rec-button").hide(), $(".prod-right-title").append(e.title), $(".prod-others").append("<li></li>"), $(".nav_arrow").hide(), e.data.sort(fn_product_page.compareData), localStorage.setItem("waysEnjoyData", JSON.stringify(e.data)), $.map(e.data, function (e, t) {
                if (t < 6) {
                    var a = '<div class="block-recipe1" data-gaaction="Click" data-pdplabel="' + e.title + '" data-index="' + t + '"><div class="product-image"><img src="' + e.image_url + '"></div><div class="image-title"><span data-id="' + e.id + '">' + e.title + "</span></div></div>";
                    $(".prod-others li").append(a)
                }
            }), $(".prod-others li .block-recipe1").on("click", function () {
                $(".image-title").removeClass("nav-active1"), $(".product-image").removeClass("img-border"), $(this).find(".product-image").addClass("img-border"), $(this).find(".image-title").addClass("nav-active1");
                var t = $(this).find(".product-image img").attr("src") ? $(this).find(".product-image img").attr("src") : $(this).find(".product-image img").attr("data-lazy"),
                    a = $(this).find(".image-title span").text(),
                    o = $(this).find(".image-title span").data("id"),
                    s = "";
                $.map(e.data, function (e, t) {
                    e.id == o && (s = e.content)
                }), $(".prod_left .prod-image img").attr("src", t), $(".prod-img-title p").html(a), $(".prod-img-desc p").html(s), ga("send", {
                    hitType: "event",
                    eventCategory: localStorage.getItem("cat_slug") + "PDP - Recipe",
                    eventAction: "Click",
                    eventLabel: $(this).data("pdplabel") + " - Pos:" + ($(this).data("index") + 1),
                    transport: "beacon"
                })
            });
            var t = $(".prod-others li .block-recipe1:first-child");
            $(".nav_arrow").hide(), t.find(".image-title").addClass("nav-active1"), t.find(".product-image").addClass("img-border");
            var a = t.find(".product-image img").attr("src") ? t.find(".product-image img").attr("src") : t.find(".product-image img").attr("data-lazy"),
                o = t.find(".image-title span").text(),
                s = t.find(".image-title span").data("id"),
                r = "";
            $.map(e.data, function (e, t) {
                e.id == s && (r = e.content)
            }), $(".prod_left .prod-image img").attr("src", a), $(".prod-img-title p").html(o), $(".prod-img-desc p").html(r)
        } else $(".bottom-container").hide()
    },
    getPrevNextData: function (e, t, a) {
        fn_home.ajaxForm({
            cat_id: t
        }, "POST", "/home_page/get-prev-next-data").done(function (t) {
            var o = JSON.parse(t),
                s = o.data,
                r = s.length,
                n = -1,
                i = "/",
                l = "/";
            $.map(o.data, function (t, a) {
                t.product_id == e && (n = a)
            });
            var d = $(".product-page-header"),
                c = d.find(".prev-click"),
                u = d.find(".next-click");
            c.removeAttr("href"), u.removeAttr("href"), c.addClass("disabled"), u.addClass("disabled"), n > 0 && (i = i + a + "/" + s[n - 1].slug, c.attr("href", i), $(".scroll-item-left .scroll-item-img img").attr("src", s[n - 1].pr_image), $(".scroll-item-left .scroll-item-title span").text(s[n - 1].merchandise_name), c.removeClass("disabled"), ga("send", {
                hitType: "event",
                eventCategory: "ProductDetailPage",
                eventAction: "Impression",
                eventLabel: "ProductDetailPageScroll - Left Arrow",
                transport: "beacon"
            })), n < r - 1 && (l = l + a + "/" + s[n + 1].slug, u.attr("href", l), $(".scroll-item-right .scroll-item-img img").attr("src", s[n + 1].pr_image), $(".scroll-item-right .scroll-item-title span").text(s[n + 1].merchandise_name), u.removeClass("disabled"), ga("send", {
                hitType: "event",
                eventCategory: "ProductDetailPage",
                eventAction: "Impression",
                eventLabel: "ProductDetailPageScroll - Right Arrow",
                transport: "beacon"
            })), c.hover(function (e) {
                $(".scroll-item-left .scroll-item-img img").attr("src") ? ($(".scroll-item-left").css("display", "block"), $(".left").addClass("arrow-border-left"), $(".left-arrow .prev").addClass("active show")) : ($(".left").removeClass("arrow-border-left"), $(".left-arrow .prev").removeClass("active show"))
            }, function (e) {
                $(".left").removeClass("arrow-border-left"), $(".left-arrow .prev").removeClass("active show"), $(".scroll-item-left").css("display", "none")
            }), u.hover(function (e) {
                $(".scroll-item-right .scroll-item-img img").attr("src") && ($(".scroll-item-right").css("display", "block"), $(".right-arrow .next").addClass("active show"), $(".right").addClass("arrow-border-right"))
            }, function (e) {
                $(".right-arrow .next").removeClass("active show"), $(".right").removeClass("arrow-border-right"), $(".scroll-item-right").css("display", "none")
            });
            var p = "ProductDetailPage";
            fn_product_page.gaClicksPDP($(".prev-click"), p), fn_product_page.gaClicksPDP($(".next-click"), p)
        })
    },
    getOfferData: function (e) {
        fn_home.ajaxForm({
            productId: e
        }, "POST", "/home_page/get-offer-data").done(function (e) {
            e = JSON.parse(e);
            e.data;
            if (1 == e.data.todays_deal.status) {
                fn_product_page.reverseTiming(e.data.todays_deal.end_time), $(".product-detail-wrapper .discount .timer-block").show();
                var t = '<span class = "timer"></span>';
                $(".product-detail-wrapper .discount .timer-block .todays-deal .header").append(t)
            } else $(".discount .timer-block").hide();
            var a = $(".product-detail-wrapper").find(".product-desc-block .title .sub-heading1");
            1 == e.data.bestseller.status && "New" != a.html() && (a.html("BestSeller"), a.show())
        })
    },
    getPdpData: function (e) {
        fn_main.showloader(), fn_home.ajaxForm({
            productId: e
        }, "POST", "/home_page/get-pdp-data").done(function (e) {
            res = JSON.parse(e), localStorage.setItem("waysEnjoyData", null), localStorage.setItem("RecipesData", null);
            var t = $(".middle-container"),
                a = $(".bottom-container"),
                o = '<div class="prod-right-title"></div>\n                          <div class="nav_arrow">\n                            <span><i class="left"></i></span>\n                            <span><i class="right"></i></span>\n                          </div>\n                          <ul class="prod-others"\n                            data-cycle-fx="scrollHorz"\n                            data-cycle-carousel-visible=1\n                            data-allow-wrap=false\n                            data-cycle-timeout="2000"\n                            data-cycle-slides="> li"\n                            data-cycle-prev=".nav_arrow .left"\n                            data-cycle-next=".nav_arrow .right">\n                          </ul>';
            if (a.find(".prod-right").html(o), "success" == res.status && void 0 != res.data && null != res.data) {
                var s = res.data.branding,
                    r = res.data.how_to_eat,
                    n = res.data.recipes,
                    i = !1;
                if (s.sort(fn_product_page.compareData), null != s && 0 != s.length) {
                    var l = !1;
                    $(".product-page-info .info-title").html(""), $(".middle-container-image").html(""), $(".history-block .info-title-left p").html(""), $(".info-title-desc .left-half").html(""), $(".source-desc p").html(""), $(".Ingredient-desc .Ingredient-content").html(""), $(".nutrition-desc").html(""), $(".info-title-desc .right-half").html(""), $.map(s, function (e, t) {
                        if (1 == e.status) {
                            i = !0, l++;
                            var a = '<div class="desc1" data-pdplabel="ProductDetailPage - ' + e.title + '" data-gaaction="Click - Impression"><span data-id="' + e.id + '" data-imgurl="' + e.image_url + '">' + e.title + "</span></div>";
                            $(".product-page-info .info-title").append(a);
                            var o = '<img data-lazy="' + e.image_url + '" class="containerImage' + e.id + '">';
                            $(".middle-container-image").append(o)
                        }
                        1 == e.id && 1 == e.status && ($(".history-block .info-title-left p").append(e.subtitle), $.map(e.proscons, function (e, t) {
                            if (1 == e.type) {
                                var a = '<li><span class="right-wrong"><img data-lazy="https://s3-ap-southeast-1.amazonaws.com/liciousdev/Banner/yes.png" style="width:18px;"></span><span class="list-text">' + e.key + "</span></li>";
                                $(".info-title-desc .left-half").append(a)
                            }
                            if (0 == e.type) {
                                var a = '<li><span class="right-wrong"><img data-lazy="https://s3-ap-southeast-1.amazonaws.com/liciousdev/Banner/no.png" style="width:18px;"></span><span class="list-text">' + e.key + "</span></li>";
                                $(".info-title-desc .right-half").append(a)
                            }
                        })), 2 == e.id && 1 == e.status && $(".source-desc p").append(e.content), 3 == e.id && 1 == e.status && $.map(e.content, function (e, t) {
                            var a = '<li><div class="serial">' + (t + 1) + '</div><div class="ingred">' + e + "</div></li>";
                            $(".Ingredient-desc .Ingredient-content").append(a)
                        }), 4 == e.id && 1 == e.status && $.map(e.content, function (e, t) {
                            var a = '<div class="data-row"><div class="data-col1"><span>' + e.key + '</span></div><div class="data-col2"><p></p></div><div class="data-col3"><span>' + e.value + "</span></div></div>";
                            $(".nutrition-desc").append(a)
                        })
                    }), fn_product_page.gaClicksPDP($(".product-page-info .info-title .desc1"), "ProductDetailPage"), i || (t.hide(), t.html(""))
                } else t.hide(), t.html("");
                $(".product-page-info .info-title .desc1:first-child").find("span").addClass("nav-active");
                var d = $(".product-page-info .info-title .desc1:first-child").find(".nav-active").data("id");
                $(".product-page-info .info-title .desc1:first-child").find(".nav-active").data("imgurl");
                $(".containerImage" + d).addClass("fading"), $(".dataId" + d).show();
                var c = "";
                $(".product-page-info .info-title .desc1").on("click", function () {
                    $(".product-page-info .info-title .desc1 span").removeClass("nav-active"), $(this).find("span").addClass("nav-active");
                    var e = $(this).find(".nav-active").data("id");
                    c = $(this).find(".nav-active").data("imgurl"), $(".middle-container-image").find("img").removeClass("fading"), $(".containerImage" + e).addClass("fading"), $(".method").hide(), $(".dataId" + e).show()
                }), 1 == r.status && void 0 != r.status && fn_product_page.get_how_to_eat(r), 1 == n.status && void 0 != n.status && res.data.recipes.recipe_id && res.data.recipes.recipe_id.length && (fn_product_page.getPdpRecipeDetails(res.data.recipes.recipe_id, res.data.recipes.status), a.show()), void 0 == r.data && void 0 == n.recipe_id && a.hide(), $(".info-Blocks").children().hide(), $(".info-Blocks").children(":first").show()
            } else t.hide(), t.html(""), a.hide(), a.html("");
            fn_home.getAllDOMImages(), fn_main.hideloader()
        }).fail(function () {
            elem.hide(), elem2.hide(), fn_main.hideloader()
        })
    },
    pushEEProductClick: function (e) {
        if (e && e.data) {
            var t = e.data,
                a = t.product_master.pr_name,
                o = t.product_master.product_id,
                s = t.product_pricing.base_price,
                r = t.product_master.gross,
                n = localStorage.getItem("cat_id");
            if (window.dataLayer) {
                var i = window.dataLayer;
                i.push({
                    event: "view_item",
                    ecommerce: {
                        click: {
                            products: [{
                                item_name: a,
                                item_id: o,
                                price: s,
                                quantity: r,
                                currency: "INR",
                                index: 0,
                                item_category: n
                            }]
                        }
                    }
                })
            }
        }
    },
    populatePDPInventoryUI: function (e, t) {
        var a = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
            o = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
        if (!o) {
            var s = function (e, t) {
                    return Math.round(e - e * t / 100, 10)
                },
                r = e.product_inventory,
                n = r.slot_available,
                i = r.stock_units,
                l = r.next_available_by,
                d = r.slot_custom_message,
                c = e.product_pricing,
                u = c.base_price,
                p = c.base_discount,
                m = c.rounded_base_discount,
                h = e.product_merchantdising,
                f = h.merchandise_name,
                v = h.product_id,
                g = h.pr_image,
                _ = h.product_shortname,
                y = (h.is_combo, $(".product-details-footer"));
            y.attr("data-prod", v), y.find(".pdp-prod-image").attr("data-lazy", g), y.find(".pdp-prod-details .pdp-prod-shortname").html(_ || f), y.find(".pdp-prod-details .pdp-prod-fullname").html(_ === f ? "" : f);
            var b = a ? $(".combo-parent-wrapper") : $(".product-detail-wrapper"),
                k = b.find(".product-desc-block"),
                C = l || "";
            if (i > 0) {
                var w = 2 == n,
                    S = w ? d : C,
                    I = '<div class="action-slider1">' + ('<button class="add-to-cart addCartBtn-pdp' + (w ? " disabled" : "") + '" data-cat = "') + t + '" data-amt="' + s(u, p) + '" data-text="' + f + '" data-prid="' + v + '" data-qty="' + i + '">Add To Cart</button><p><span class = "cart-btns remove-one" data-cat = "' + t + '" data-amt="' + s(u, p) + '" data-text="' + f + '" data-prid="' + v + '" data-qty="' + i + '"></span><span class = "item-qty-pdp">0</span>' + ('<span class = "cart-btns' + (w ? " disabled" : "") + ' add-one"  data-cat = "') + t + '" data-amt="' + s(u, p) + '" data-prid="' + v + '" data-text="' + f + '" data-qty="' + i + '"></span></p></div>';
                b.find(".rate-block .action").html(I), w && (k.find(".product-message .message").addClass("oos"), k.find(".product-message").find("img").remove()), k.find(".product-message .message").html(S)
            } else {
                var P = b.find(".notify-me-pdp");
                P.show(), fn_home.validateCookieForProduct(v) ? (P.children(".alarm").attr("data-lazy", "/img/tick_symbol.svg"), P.addClass("notified"), k.find(".product-message .message").html(fn_home.getNotifiedMsg()), k.find(".product-message .message").removeClass("oos").addClass("notified"), k.find(".product-message .icon-message img").remove()) : (k.find(".product-message .message").html(C), k.find(".product-message .message").addClass("oos"), k.find(".product-message .icon-message img").remove(), P.attr("data-pr-id", v), P.attr("data-cat", t), P.attr("data-discount", u * p / 100), P.attr("data-price", u), P.attr("data-pr-img-url", g))
            }
            e.product_pricing.base_discount > 0 && (b.find(".rate .rate1").html("<span>MRP: </span><span class='price'>&#8377; " + u + "</span>/-"), b.find(".rate .offer-percent").html((m || Math.floor(p)) + "% OFF")), b.find(".rate .rate2").html((e.product_pricing.base_discount > 0 ? "₹" : '<span style="font-size:15px">MRP: </span>₹') + s(u, p)), e.product_videos.length && e.product_videos[0].video_link ? b.find(".htc-cta").attr("data-video-embed-url", e.product_videos[0].video_link) : b.find(".htc-product-message").addClass("no-htc"), y.find(".pdp-prod-inventory-section").html('\n        <div class="rate-block">\n          ' + b.find(".rate-block").html() + '\n        </div>\n        <div class="htc-product-message no-htc">\n          ' + b.find(".htc-product-message").html() + "\n        </div>"), "" !== C && (k.find(".product-message").show(), y.find(".product-message").show()), fn_home.bindNotifyMeButton(".notify-me-pdp")
        }
    },
    renderProductDetails: function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] || arguments[1],
            a = e.data.product_master.product_id,
            o = e.data.product_merchantdising.merchandise_name,
            s = $(".fullSlug").val(),
            r = s.split("/")[1];
        Object.assign(productView, {
            "Product Name": e.data.product_merchantdising.product_shortname,
            "Hub ID": Number($(".hubId_main").val()),
            Currency: "INR",
            "Category Name": $(".enabled.active").data("text"),
            "City Name": localStorage.getItem("city_name"),
            "Product ID": e.data.product_master.product_id,
            "Category ID": Number($(".enabled.active").data("id")),
            "Product Page Image URL Web": e.data.product_merchantdising.pr_image,
            "Delivery Type": e.data.product_merchantdising.product_delivery_type
        }), t && fn_product_page.productViwedCache(a, o, s);
        var n = $(".main-product-details");
        if ("success" == e.status && void 0 != e.data && null != e.data) {
            var i = function (e, t) {
                    return Math.round(e - e * t / 100, 10)
                },
                l = e.data.product_merchantdising,
                d = e.data.product_master,
                c = e.data.product_pricing;
            is_combo_child || $(".product-breadcrumb").find(".third").text(d.pr_name), $(".pdp_title").append("Licious | " + d.pr_name);
            var u = l.created_at.replace(" ", "T"),
                p = u.split(/[^0-9]/),
                m = new Date(p[0], p[1] - 1, p[2], p[3], p[4], p[5]).getTime(),
                h = (new Date).getTime(),
                f = h - m,
                v = f / 1e3,
                g = v / 60,
                _ = g / 1440,
                y = $(".product-desc-block .title .sub-heading1");
            _ < 10 && (y.html("New"), y.show()), fn_product_page.populatePDPInventoryUI(e.data, r, "", is_combo_child), Object.assign(productView, {
                "Product Page Availability Status": "OOS"
            }), $(".product-detail-wrapper").find(".product-desc-block").attr("data-prod", d.product_id), $(".product-detail-wrapper").find(".product-desc-block").find(".heading").html(l.product_shortname), $(".product-detail-wrapper").find(".product-desc p").html(l.description), $(".sub-title").html("");
            var b = l.product_header_tags.split("|");
            "" != l.product_header_tags ? $.map(b, function (e, t) {
                var a = '<span class="sub-title-list">' + e + "</span>";
                $(".sub-title").append(a)
            }) : $(".sub-title").hide(), c.base_discount > 0 ? ($(".discount").show(), $(".discount-per").html(c.base_discount + "% Off"), Object.assign(productView, {
                "Before Discount Price": Number(c.base_price),
                "After Discount Price": Number(i(c.base_price, c.base_discount)),
                "Discount Percentage": Number(c.base_discount),
                "Discount Amount": Number(c.base_price - i(c.base_price, c.base_discount))
            })) : ($(".discount").hide(), Object.assign(productView, {
                Price: Number(c.base_price)
            }));
            var k = i(c.base_price, c.base_discount);
            if (l.cooking_time) {
                var C = '<div class="qty-block"><div class="block-container"> <div class="block1"><div class="icon-image"> <img data-lazy="' + l.pdp_pieces_img_url + '"> </div><div class="block-text UL">No. of Pieces ' + l.no_of_piceces + '</div></div><div class="block2"><div class="icon-image"><img data-lazy="' + l.pdp_serves_img_url + '"></div><div class="block-text UR">Serves ' + l.serves + '</div></div></div><div class="block-container"><div class="block1"><div class="icon-image"> <img data-lazy="' + l.pdp_cooktime_img_url + '"> </div><div class="block-text LL">Cooking time ' + l.cooking_time + '</div></div> <div class="block2"> <div class="icon-image"><img data-lazy="' + l.net_wt_img_pdp + '"></div><div class="block-text LR">Net wt. ' + l.pdp_net_wt + "</div> </div> </div> </div>";
                $(".quantity-block").html(C)
            } else if (l.pdp_gross_wt) {
                var C = '<div class="qty-block"><div class="block-container"> <div class="block1"><div class="icon-image"> <img src="' + l.pdp_pieces_img_url + '" > </div><div class="block-text UL">No. of Pieces ' + l.no_of_piceces + '</div></div><div class="block2"><div class="icon-image"><img src="' + l.pdp_serves_img_url + '" ></div><div class="block-text UR">Serves ' + l.serves + '</div></div></div><div class="block-container"><div class="block1"><div class="icon-image"> <img data-lazy="' + l.gross_wt_img_pdp + '" > </div><div class="block-text LL">Gross Wt. ' + l.pdp_gross_wt + '</div></div><div class="seafood-block"> <span class="image1"> <img data-lazy="https://d2407na1z3fc0t.cloudfront.net/Banner/dotline.png"  style="width: 100px;"> </span><span class="image2" > <img src="https://d2407na1z3fc0t.cloudfront.net/Banner/knife.png" style="width: 20px;"> </span> </div> <div class="block2"> <div class="icon-image"><img src="' + l.net_wt_img_pdp + '"></div><div class="block-text LR">Net wt. ' + l.pdp_net_wt + "</div> </div> </div> </div>";
                $(".quantity-block").html(C)
            } else if (l.best_before && l.no_of_piceces) {
                var C = '<div class="qty-block"> <div class="block-container"> <div class="block1"> <div class="icon-image"><img data-lazy="' + l.pdp_bestbefore_img_url + '" > </div> <div class="block-text UL">Best before ' + l.best_before + '</div> </div><div class="block2"> <div class="icon-image"> <img data-lazy="' + l.pdp_pieces_img_url + '" > </div><div class="block-text UR">No. of Pieces ' + l.no_of_piceces + "</div> </div> </div> </div>";
                $(".quantity-block").html(C)
            } else if (l.best_before && l.pdp_net_wt) {
                var C = '<div class="qty-block"> <div class="block-container"> <div class="block1"> <div class="icon-image"><img data-lazy="' + l.pdp_bestbefore_img_url + '" > </div> <div class="block-text UL">Best before ' + l.best_before + '</div> </div><div class="block2"> <div class="icon-image"> <img data-lazy="' + l.net_wt_img_pdp + '" > </div><div class="block-text UR">Net wt. ' + l.pdp_net_wt + "</div> </div> </div> </div>";
                $(".quantity-block").html(C)
            } else if (!l.pdp_gross_wt && !l.best_before && !l.cooking_time) {
                var C = '<div class="qty-block"> <div class="block-container"> <div class="block1"> <div class="icon-image"><img data-lazy="' + l.pdp_pieces_img_url + '"> </div> <div class="block-text UL">No. of Pieces ' + l.no_of_piceces + '</div> </div><div class="block2"> <div class="icon-image"> <img src="' + l.net_wt_img_pdp + '" > </div><div class="block-text UR">Net wt. ' + l.pdp_net_wt + "</div> </div> </div> </div>";
                $(".quantity-block").html(C)
            }
            var w = '<div class="prod_slider"\n                                data-cycle-fx=scrollHorz\n                                data-cycle-pager=".prod-pager"\n                                data-cycle-pause-on-hover="true">\n                              </div>\n                              <div class="prod-pager"></div>';
            if ($(".product-image-block").html(w), 0 != l.images.length || void 0 != l.images) $.map(l.images, function (e, t) {
                var a = '<img data-lazy="' + e + '" data-index = "' + t + '" style = "opacity: 1" alt="">';
                $(".prod_slider").append(a)
            });
            else {
                var C = '<img data-lazy="/img/user_avatar.png" style = "opacity: 1" alt="">';
                $(".prod_slider").append(C)
            }
            1 == l.images.length ? $(".prod-pager").hide() : $(".prod-pager").show(), null != l.pdp_gross_wt && "" != l.pdp_gross_wt && Object.assign(productView, {
                "Gross Weight": l.pdp_gross_wt
            }), null != l.pdp_net_wt && "" != l.pdp_net_wt && Object.assign(productView, {
                "Net Weight": l.pdp_net_wt
            }), null != l.serves && "" != l.serves && Object.assign(productView, {
                Serves: l.serves
            }), null != l.no_of_piceces && "" != l.no_of_piceces && Object.assign(productView, {
                Pieces: l.no_of_piceces
            }), t && branch.logEvent("view_item", {
                price: k,
                currency: "INR",
                item_name: l.product_shortname,
                event_name: "view_item"
            })
        } else n.hide();
        fn_home.getAllDOMImages(), fn_product_page.assignCarouselClickEvents(), fn_product_page.getPdpData(l.product_id)
    },
    getProductDetails: function (e) {
        var t = void 0;
        fn_home.ajaxForm({
            productId: e
        }, "POST", "/home_page/get-prod-details").done(function (e) {
            res = JSON.parse(e), fn_product_page.pushEEProductClick(res), t = res.data.product_merchantdising.product_id, res.data.hasOwnProperty("child_products") && Array.isArray(res.data.child_products) && res.data.child_products.length && ! function () {
                var e = res.data.child_products,
                    t = res.data.product_videos.length && res.data.product_videos[0].video_link,
                    a = res.data.product_merchantdising,
                    o = a.product_shortname,
                    s = a.merchandise_name,
                    r = a.product_id,
                    n = a.pr_image,
                    i = a.description;
                $(".product-breadcrumb").find(".third").text(s);
                var l = '<img class="combo-image-block" src="' + n + '" />\n                                      <div class="product-desc-block" data-prod=' + r + '>\n                                        <h1 class="heading">' + (o || s) + '</h1>\n                                        <p class="heading-full">' + s + '</p>\n                                        <div class="product-desc"><p>' + i + '</p></div>\n                                        <div class="rate-block">\n                                          <div class="rate">\n                                            <span class="rate2"></span>\n                                            <span class="rate1"></span>\n                                            <span class="offer-percent"></span>\n                                          </div>\n                                          <div class="out-of-stock">Out of Stock</div>\n                                          <div class="action">\n                                            <button type="button" class="notify-me notify-me-pdp"><img data-lazy="/img/alarm.svg" class="alarm" /><span class="notify-me-text">NOTIFY ME</span></button>\n                                          </div>\n                                        </div>\n                                        <div class="htc-product-message ' + (t ? "" : "no-htc") + '">\n                                          <div class="htc-cta" data-video-embed-url="' + (t ? res.data.product_videos[0].video_link : "") + '" data-page="product_page">\n                                            <img class="htc-play-symbol" src="/img/play_icon.svg" alt="playbutton"/>\n                                            <span class="cta-text">How to cook</span>\n                                          </div>\n                                          <div class="product-message">\n                                            <div class="icon-message">\n                                              <img src="/img/express_delivery.svg" class="scooter" />\n                                              <span class="message"></span>\n                                            </div>\n                                          </div>\n                                        </div>\n                                      </div>';
                $(".combo-parent-wrapper").html(l), fn_product_page.populatePDPInventoryUI(res.data, "combos", !0, !1);
                var d = '<div class="product-switch-bar">';
                e.map(function (e, t) {
                    d += '<div class="product' + (0 == t ? " active-prod" : "") + '" product_id=' + e.product_master.product_id + " index=" + t + "> " + (e.product_master.item_display_name ? e.product_master.item_display_name : "ITEM " + (t + 1)) + " </div>"
                }), d += "</div>", $(".product-detail-wrapper").before(d), $(".product-detail-wrapper").find(".discount").css("top", "70px"), res.data = e[0], $(".product-switch-bar").find(".product").click(function (t) {
                    t.preventDefault(), t.stopImmediatePropagation();
                    var a = $(this).attr("index");
                    res.data = e[a], fn_product_page.renderProductDetails(res, !1), $(".product-switch-bar").find(".product").removeClass("active-prod"), $(this).addClass("active-prod")
                }), is_combo_child = !0
            }(), fn_product_page.renderProductDetails(res)
        }).always(function () {
            fn_product_page.addcartPdpPage("pdp", "Product Detail page - " + $(".enabled.active").data("text") + " - " + res.data.product_merchantdising.product_shortname), fn_product_page.removecart("pdp"), fn_product_page.pdpScroll(t)
        }).fail(function () {
            elem.hide()
        })
    },
    assignCarouselClickEvents: function () {
        $(".prod_slider").cycle({
            fx: "scrollHorz",
            timeout: 5e3,
            "pause-on-hover": !0
        }), $(".prod_slider").on("cycle-after", function (e, t) {
            ga("send", {
                hitType: "event",
                eventCategory: $(".enabled.active").data("text") + "ProductView",
                eventAction: "Impression",
                eventLabel: parseInt(t.index + 1) + "Picture"
            })
        }), $(".prod_slider").on("cycle-prev", function (e, t) {
            var a = t.slides[t.currSlide].dataset;
            Number(a.index);
            ga("send", {
                hitType: "event",
                eventCategory: $(".enabled.active").data("text") + "ProductView",
                eventAction: "Impression",
                eventLabel: parseInt(t.index + 1) + "Picture"
            })
        }), $(".prod_slider").on("cycle-next", function (e, t) {
            var a = t.slides[t.currSlide].dataset;
            Number(a.index);
            ga("send", {
                hitType: "event",
                eventCategory: $(".enabled.active").data("text") + "ProductView",
                eventAction: "Impression",
                eventLabel: parseInt(t.index + 1) + "Picture"
            })
        })
    },
    GaEventPdpcart: function (e, t, a, o) {
        ga("send", "event", {
            eventCategory: e,
            eventAction: t,
            eventLabel: a,
            eventValue: o
        })
    },
    addcartPdpPage: function (e, t) {
        $(".addCartBtn-pdp").on("click", function (t) {
            t.preventDefault();
            var a = $(this),
                o = parseInt(a.parent().find(".item-qty-pdp").html()),
                s = $(this).data("prid"),
                r = $(this).data("qty"),
                n = o + 1;
            if (!(n <= r)) return void Materialize.toast("Only " + r + " units left", 3e3);
            if (!a.hasClass("ub")) {
                a.css("opacity", "0.7").prop("disabled", !0);
                var i = "/checkout_oos/cart-item-update/" + s + "/" + n;
                a.parent().find(".item-qty-pdp").val(n), a.parent().find(".item-qty-pdp").attr("data-qty", n), a.addClass("ub"), fn.checkout_oos.ajaxForm({}, "POST", i).done(function (t) {
                    var o = JSON.parse(t);
                    fn_home.pushEEAddToCartNotOnCartView(o), fn_home.checkForCombo(o, e), "" != o.message ? ($(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), a.parent().find(".item-qty-pdp").attr("data-qty", o.product.quantity), $('[data-prod="' + s + '"]').addClass("complete")) : ($(".add_message").hide(), "success" == o.status ? (fn_home.updateAvailabilityMsg(o, a), fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty-pdp").html(o.product.quantity), a.parent().find(".item-qty-pdp").attr("data-qty", o.product.quantity), fn_product_page.findUpdate(s, o.product.quantity), a.parent().addClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete"), "pdp" == e && (fn_product_page.GaEventPdpcart("Cart", localStorage.getItem("cat_slug") + "CategoryPDPProductAddedToCart", a.data("text"), a.data("amt")), clevertap.event.push("Product added to cart", {
                        "Product ID": o.product.product_id,
                        "Product Name": o.product.product_name,
                        Price: Number(o.product.base_price),
                        Quantity: Number(o.product.quantity),
                        "Category ID": o.product.category_id ? o.product.category_id : "",
                        Checkout_Flow: old_checkout,
                        incoming_source: "pdp",
                        hub_id: fn_ll.getterLS("hub_id")
                    })), fbq("track", "AddToCart", {
                        content_type: "product",
                        content_ids: o.product.product_id,
                        content_name: o.product.product_name,
                        content_category: a.data("cat"),
                        value: a.data("amt"),
                        currency: "INR"
                    })) : Materialize.toast(o.message, 3e3)), clevertap.event.push("Added to Cart", {
                        "Product ID": o.product.product_id,
                        "Product Name": o.product.product_name,
                        Price: o.product.base_price,
                        Quantity: o.product.quantity,
                        Checkout_Flow: old_checkout,
                        "Category ID": o.product.category_id ? o.product.category_id : "",
                        incoming_source: "pdp",
                        hub_id: fn_ll.getterLS("hub_id")
                    }), fn_home.sendBranchEvent("add_to_cart", o.product)
                }).always(function () {
                    a.removeClass("ub"), setTimeout(function () {
                        $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                    }, 600), setTimeout(function () {
                        $(".add_message").hide()
                    }, 7e3)
                })
            }
        }), $(".add-one").on("click", function (t) {
            if (t.preventDefault(), t.stopImmediatePropagation(), !$(this).hasClass("disabled")) {
                var a = $(this),
                    o = parseInt(a.parent().find(".item-qty-pdp").html()),
                    s = $(this).data("prid"),
                    r = $(this).data("qty"),
                    n = o + 1;
                if (!(n <= r)) return void Materialize.toast("Only " + r + " units left", 3e3);
                if (!a.hasClass("ub")) {
                    a.css("opacity", "0.7").prop("disabled", !0);
                    var i = "/checkout_oos/cart-item-update/" + s + "/" + n;
                    a.parent().find(".item-qty-pdp").val(n), a.parent().find(".item-qty-pdp").attr("data-qty", n), a.addClass("ub"), fn.checkout_oos.ajaxForm({}, "POST", i).done(function (t) {
                        var o = JSON.parse(t);
                        fn_home.pushEEAddToCartNotOnCartView(o), fn_home.checkForCombo(o, e), "" != o.message ? ($(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), a.parent().find(".item-qty-pdp").attr("data-qty", o.product.quantity), a.parent().addClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete")) : ($(".add_message").hide(), "success" == o.status ? (fn_home.updateAvailabilityMsg(o, a), fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty-pdp").html(o.product.quantity), a.parent().find(".item-qty-pdp").attr("data-qty", o.product.quantity), a.parent().addClass("slide"), fn_product_page.findUpdate(s, o.product.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete"), "pdp" == e && fn_product_page.GaEventPdpcart("Cart", localStorage.getItem("cat_slug") + "CategoryPDPProductAddedToCart", a.data("text"), a.data("amt"))) : Materialize.toast(o.message, 3e3)), clevertap.event.push("Added to Cart", {
                            "Product ID": o.product.product_id,
                            "Product Name": o.product.product_name,
                            Price: o.product.base_price,
                            Quantity: o.product.quantity,
                            "Category ID": o.product.category_id ? o.product.category_id : "",
                            Checkout_Flow: old_checkout,
                            incoming_source: "pdp",
                            hub_id: fn_ll.getterLS("hub_id")
                        }), fn_home.sendBranchEvent("add_to_cart", o.product), clevertap.event.push("Product added to cart", {
                            "Product ID": o.product.product_id,
                            "Product Name": o.product.product_name,
                            Price: Number(o.product.base_price),
                            Quantity: Number(o.product.quantity),
                            "Category ID": o.product.category_id ? o.product.category_id : "",
                            Checkout_Flow: old_checkout,
                            incoming_source: "pdp",
                            hub_id: fn_ll.getterLS("hub_id")
                        })
                    }).always(function () {
                        a.removeClass("ub"), setTimeout(function () {
                            $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                        }, 600), setTimeout(function () {
                            $(".add_message").hide()
                        }, 7e3)
                    })
                }
            }
        })
    },
    findUpdate: function (e, t) {
        var a = $('[data-prod="' + e + '"]');
        a.find(".item-qty").html(t), a.find(".item-qty-pdp").html(t), a.find(".item-qty-pdp").attr("data-qty", t), t > 0 ? (a.find(".action-slider").addClass("slide"), a.find(".action-slider1").addClass("slide")) : (a.find(".action-slider").removeClass("slide"), a.find(".action-slider1").removeClass("slide"))
    },
    removecart: function (e) {
        $(".remove-one").on("click", function (t) {
            t.preventDefault(), t.stopImmediatePropagation();
            var a = $(this),
                o = parseInt(a.parent().find(".item-qty-pdp").html()),
                s = $(this).data("prid"),
                r = ($(this).data("qty"), o - 1);
            if (r > 0) {
                if (a.hasClass("ub")) return;
                a.css("opacity", "0.7").prop("disabled", !0);
                var n = "/checkout_oos/cart-item-update/" + s + "/" + r;
                a.parent().find(".item-qty-pdp").val(r), a.parent().find(".item-qty-pdp").attr("data-qty", r), a.addClass("ub"), fn.checkout_oos.ajaxForm({}, "POST", n).done(function (t) {
                    var o = JSON.parse(t);
                    fn_home.pushEERemoveFromCartNotOnCartView(o), fn_home.checkForCombo(o, e), "" != o.message ? ($(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), a.parent().find(".item-qty-pdp").attr("data-qty", o.product.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete")) : ($(".add_message").hide(), "success" == o.status ? (fn_home.updateAvailabilityMsg(o, a), fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty-pdp").html(o.product.quantity), a.parent().find(".item-qty-pdp").attr("data-qty", o.product.quantity), fn_product_page.findUpdate(s, o.product.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete"), "pdp" == e && fn_product_page.GaEventPdpcart("Cart", localStorage.getItem("cat_slug") + "CategoryPDPProductRemovedFromCart", a.data("text"), a.data("amt")), clevertap.event.push("Product Removed from Cart", {
                        "Product ID": o.product.product_id,
                        "Product Name": o.product.product_name,
                        "Product Price": o.product.base_price,
                        incoming_source: "pdp"
                    }), fn_home.sendBranchEvent("remove_from_cart", o.product)) : Materialize.toast(o.message, 3e3))
                }).always(function () {
                    a.removeClass("ub"), setTimeout(function () {
                        $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                    }, 600), setTimeout(function () {
                        $(".add_message").hide()
                    }, 7e3)
                })
            } else {
                a.css("opacity", "0.7").prop("disabled", !0);
                var n = "/checkout_oos/cart-item-delete/" + s;
                fn.checkout_oos.ajaxForm({}, "POST", n).done(function (t) {
                    var o = JSON.parse(t);
                    if (fn_home.pushEERemoveFromCartNotOnCartView(o), "" != o.message) $(".add_message").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), a.parent().find(".item-qty-pdp").attr("data-qty", o.quantity), a.parent().parent().removeClass("slide"), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                    else if ($(".add_message").hide(), "success" == o.status) {
                        fn_home.updateAvailabilityMsg(o, a), fn.checkout_oos.updateCartBtn(o.item_count), a.parent().find(".item-qty-pdp").html(o.quantity), a.parent().find(".item-qty-pdp").attr("data-qty", o.quantity), a.parent().parent().removeClass("slide"), fn_product_page.findUpdate(s, o.quantity), $('[data-prod="' + s + '"]').find(".load_elem").addClass("complete");
                        "pdp" == e && fn_product_page.GaEventPdpcart("Cart", localStorage.getItem("cat_slug") + "CategoryPDPProductRemovedFromCart", a.data("text"), a.data("amt")), clevertap.event.push("Product Removed from Cart", {
                            "Product ID": o.product.product_id,
                            "Product Name": o.product.product_name,
                            "Product Price": o.product.base_price,
                            incoming_source: "pdp"
                        }), fn_home.sendBranchEvent("remove_from_cart", o.product, !0)
                    } else Materialize.toast(o.message, 3e3)
                }).always(function () {
                    a.removeClass("ub"), setTimeout(function () {
                        $('[data-prod="' + s + '"]').find(".load_elem").remove(), a.css("opacity", "1").prop("disabled", !1)
                    }, 600), setTimeout(function () {
                        $(".add_message").hide()
                    }, 7e3)
                })
            }
        })
    },
    getCartPDP: function () {
        var e = "/checkout_oos/order-summary";
        fn_home.ajaxForm({}, "get", e).done(function (e) {
            var t = JSON.parse(e);
            t.items_count > 0 && $.map(t.products, function (e) {
                if (e.quantity > 0) {
                    var t = $('[data-prod="' + e.product_id + '"]');
                    t.find(".item-qty-pdp").html(e.quantity), t.find(".item-qty-pdp").attr("data-qty", e.quantity), t.find(".action-slider1").addClass("slide")
                }
            })
        })
    },
    likeCarouselPDP: function () {
        $(".deals.also-like");
        $(".prev-also-like").addClass("disabled");
        var e = 0,
            t = 0,
            a = !1;
        $(".next-also-like").on("click", function () {
            if (a) a = !1;
            else {
                a = !0;
                var o = localStorage.getItem("youMayAlsoLikePDP"),
                    s = JSON.parse(o),
                    r = s.length,
                    n = Math.ceil(r / 3);
                if (t < 3 * n) {
                    t += 3;
                    var i = s.splice(t, 3);
                    $.map(i, function (e, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: localStorage.getItem("cat_slug") + "PDP - Consumers Also Viewed",
                            eventAction: "Impression",
                            eventLabel: e.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + (a + 1))
                        })
                    })
                }
                var l = $(".also-like").find(".card").length,
                    d = $(".also-like .item-slider").innerWidth();
                e < Math.ceil(l / 3) - 1 && e++;
                var c = l % 3,
                    u = c > 0 ? l - c : l - 3;
                l > 3 && l < 7 && $(".prev-also-like").removeClass("disabled"), 3 * e + 1 < u ? $(".prev-also-like").removeClass("disabled") : $(".next-also-like").addClass("disabled"), $(".item-slider.also-like").scrollTo(d * e - .4, 750), a = !1
            }
        }), $(".prev-also-like").on("click", function () {
            if (a) a = !1;
            else {
                a = !0;
                var o = localStorage.getItem("youMayAlsoLikePDP"),
                    s = JSON.parse(o),
                    r = s.length;
                Math.ceil(r / 3);
                if (t > 0) {
                    t -= 3;
                    var n = s.splice(t, 3);
                    $.map(n, function (e, a) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: localStorage.getItem("cat_slug") + "PDP - Consumers Also Viewed",
                            eventAction: "Impression",
                            eventLabel: e.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + (a + 1))
                        })
                    })
                }
                var i = $(".also-like").find(".card").length;
                e > 0 && e--, i > 3 && i < 7 && ($(".prev-also-like").addClass("disabled"), $(".next-also-like").removeClass("disabled")), e > 0 ? $(".next-also-like").removeClass("disabled") : $(".prev-also-like").addClass("disabled");
                var l = $(".also-like .item-slider").innerWidth();
                $(".item-slider.also-like").scrollTo(l * e, 750), setTimeout(function () {
                    a = !1
                }, 350)
            }
        })
    },
    compareData: function (e, t) {
        return e.order < t.order ? -1 : e.order > t.order ? 1 : 0
    },
    gaClicksPDP: function (e, t) {
        $(e).click(function (e) {
            e.preventDefault();
            var a, o = parseInt(e.currentTarget.dataset.index) + 1,
                s = e.currentTarget.getAttribute("target");
            a = e.currentTarget.dataset.scname ? e.currentTarget.dataset.scname + " - " + e.currentTarget.dataset.text + "- Pos:" + o : e.currentTarget.dataset.text + "- Pos:" + o, "addCartBtn-home" !== e.target.classList[1] && (ga("send", {
                hitType: "event",
                eventCategory: t,
                eventAction: e.currentTarget.dataset.gaaction,
                eventLabel: e.currentTarget.dataset.pdplabel,
                transport: "beacon"
            }), "A" == e.target.tagName && s ? window.open(e.target.href, "_blank") : "A" == e.target.tagName && (window.location.href = e.target.href), e.currentTarget.href && s ? window.open(e.currentTarget.href, "_blank") : e.currentTarget.href && (window.location.href = e.currentTarget.href))
        })
    },
    pdpScroll: function (e) {
        var t = $(".pdp-info"),
            a = !0,
            o = $(".deals.also-like"),
            s = !0,
            r = $(".prod-right"),
            n = !0,
            i = $(".made-with-licious"),
            l = !0,
            d = $(".prod_slider"),
            c = document.querySelector("[data-prod=" + e + "]").querySelector(".rate-block");
        parseInt(t.position().top) < window.innerHeight && t.addClass("reveal"), window.addEventListener("scroll", function () {
            fn_ll.checkElementInViewPort(c, !0) ? ($(".product-details-footer").removeClass("fade-in"), $(".track-order-container").css("bottom", "0px")) : ($(".product-details-footer").addClass("fade-in"), $(".track-order-container").css("bottom", $(".product-details-footer").height() + 20), $(".track-order-container").css("transform", "translateY(0)"));
            parseInt(window.pageYOffset);
            if (void 0 != t.find(".desc1").eq(0).data("pdplabel") && a && $(window).scrollTop() >= parseInt(t.offset().top) - window.innerHeight && (ga("send", {
                    hitType: "event",
                    eventCategory: "ProductDetailPage",
                    eventAction: "Click - Impression",
                    eventLabel: t.find(".desc1").eq(0).data("pdplabel")
                }), a = !1), s && $(window).scrollTop() >= parseInt(o.offset().top - window.innerHeight)) {
                var e = JSON.parse(localStorage.getItem("youMayAlsoLikePDP"));
                $.map(e, function (e, t) {
                    t < 3 && ga("send", {
                        hitType: "event",
                        eventCategory: localStorage.getItem("cat_slug") + "PDP - Consumers Also Viewed",
                        eventAction: "Impression",
                        eventLabel: e.product_merchantdising.merchandise_name + " - Pos:" + parseInt(t + 1)
                    })
                }), s = !1
            }
            if (l && $(window).scrollTop() >= parseInt(i.offset().top) - window.innerHeight && (fn_home.homeTestimonials("pdp"), l = !1), d.length && $(window).scrollTop() >= parseInt(window.innerHeight - d.offset().top + 110) ? $(".prod_slider").cycle("pause") : $(".prod_slider").cycle("resume"), n && $(window).scrollTop() >= parseInt(r.offset().top) - window.innerHeight) {
                var u = JSON.parse(localStorage.getItem("waysEnjoyData")),
                    p = JSON.parse(localStorage.getItem("RecipesData"));
                null != u && $.map(u, function (e, t) {
                    t < 6 && ga("send", {
                        hitType: "event",
                        eventCategory: localStorage.getItem("cat_slug") + "PDP - Recipe",
                        eventAction: "Impression",
                        eventLabel: e.title + " - Pos:" + (t + 1)
                    })
                }), null != p && $.map(p, function (e, t) {
                    t < 6 && ga("send", {
                        hitType: "event",
                        eventCategory: localStorage.getItem("cat_slug") + "PDP - Recipe",
                        eventAction: "Impression",
                        eventLabel: e.title + " - Pos:" + (t + 1)
                    })
                }), n = !1
            }
        })
    },
    productViwedCache: function (e, t, a) {
        var o = e,
            s = t,
            r = a;
        fn_home.ajaxForm({
            prId: o,
            prName: s,
            slug: r
        }, "POST", "/prod-viewed-cache").done(function (e) {})
    }
}, fn_sublocation = {
    gaSublocation: function (e, t, a) {
        ga("send", {
            hitType: "event",
            eventCategory: e,
            eventAction: t,
            eventLabel: a,
            transport: "beacon"
        })
    }
};
var CCValdiation = function () {
        var e = function (e) {
                if (e) {
                    var t = /^\d{12,16}$/;
                    return t.test(e)
                }
                return !1
            },
            t = function (e) {
                if (e) {
                    var t = /^[0-9]{3,4}$/;
                    return t.test(e)
                }
                return !1
            },
            a = function (e) {
                return !!e && (e >= 1 && e <= 12)
            },
            o = function (e) {
                if (e) {
                    var t = (new Date).getFullYear();
                    return e >= t && e <= t + 100
                }
                return !1
            };
        return {
            validateCreditCardNumber: e,
            validateCreditCardCvv: t,
            validateCreditCardMon: a,
            validateCreditCardYear: o
        }
    }(),
    resetWalletPaymentDetails = function () {
        var e = $(".li-card-details"),
            t = $(".netbanking"),
            a = $('input[name="walletAmount"]'),
            o = $("#licioius-wallet"),
            s = function () {
                e.trigger("reset")
            },
            r = function () {
                t.trigger("reset")
            },
            n = function () {
                a.prop("checked", !1)
            },
            i = function () {
                o.val("")
            },
            l = function () {
                s(), r(), n(), i()
            };
        return {
            resetCreditCardForm: s,
            resestNetbankingForm: r,
            resetRadioButton: n,
            resetLiciousWallet: i,
            clearLiContainer: l
        }
    }(),
    product_delId = 0,
    shipId = 0,
    prname = "",
    amt = "",
    quantity = "",
    checkoutStart = {};
$(document).ready(function () {
    function e() {
        $(".bxslider").bxSlider({
            auto: !0,
            onSliderLoad: function () {
                $(".lic-banner").css("visibility", "visible"), $(".bx-controls-direction").hide()
            }
        })
    }

    function t() {
        var e, t = $(".customAddressId").val(),
            a = $(".customDeliveryType").val(),
            o = $(".customDeliverySlot").val(),
            r = $(".customCpn").val();
        $(".wallet-select").hasClass("check-img") && (e = "unset", $(".checkout-payment-btn").attr("disabled", "disabled").addClass("disabled-btn"), $(".lc-wallet-div").addClass("wallet-div"), s({
            type: e,
            addressId: t,
            deliveryType: a,
            deliverySlot: o,
            cpn: r
        }, "POST", $(".wallet-sw-ur").attr("data-url")).done(function (e) {
            "error" != e.result ? ($(".wallet-select").hasClass("check-img") ? ($(".wallet-select").attr("src", "http://www.licious.in/img/elements/uncheck.png").removeClass("check-img").addClass("uncheck-img").fadeIn(800), $("#lc-wallet-div").attr("data-wuse", "lc-wallet-n")) : ($(".wallet-select").attr("src", "http://www.licious.in/img/elements/check.png").removeClass("uncheck-img").addClass("check-img").fadeIn(800), $("#lc-wallet-div").attr("data-wuse", "lc-wallet-y")), $(".checkout-payment-btn").val("Pay Now Rs. " + e.amount), $(".citrusAmount").val(e.paisa), $("#lc-wallet-div").attr("data-lcpay", e.paisa), "0" == e.paisa ? ($("#payBtn").attr("type", "button"), $("#payBtn").addClass("onlyhogbucks")) : ($("#payBtn").attr("type", "submit"), $("#payBtn").removeClass("onlyhogbucks"))) : Materialize.toast(e.msg, 3e3), $(".lc-wallet-div").removeClass("wallet-div"), $(".checkout-payment-btn").removeAttr("disabled").removeClass("disabled-btn"), "zero" == e.type && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled")
        }).fail(function (e, t, a) {
            Materialize.toast("Request failed, Please refersh the page and try again", 3e3)
        }))
    }

    function a(e, t) {
        e.attr("type", "button"), "loading-text-pop" != t ? (e.addClass(t), e.html("<span>.</span><span>.</span><span>.</span>")) : (e.addClass(t + " animated flipInY"), e.html(""))
    }

    function o(e, t) {
        e.attr("type", "submit"), "loading-text-pop" != t ? e.removeClass(t) : e.removeClass(t + " animated flipInY").addClass("animated flipInY").removeClass("animated flipInY"), e.html(e.attr("data-name"))
    }

    function s(e, t, a) {
        return $.ajax({
            url: a,
            type: t,
            data: e,
            timeout: 2e4,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
            }
        })
    }

    function r(e, t, a) {
        return $.ajax({
            url: a,
            type: t,
            data: e,
            timeout: 2e4
        })
    }

    function n(e) {
        if ("NA" != e) {
            var t = '<div class="row mini-cart-product-row row-margin-bottom-minus-2 animated flipInX"><div class="col s3 pr-img"><img src="' + e.prImage + '" class=""></div><div class="col s9"><h3>' + e.prName + ' <i class="material-icons deleteProductCart" data-uri="' + e.deleteURI + '">cancel</i></h3><h5 class="lec-red-text add-cart-btn ' + e.prId + '" data-section="mini-cart" data-pr="' + e.prId + '">&#8377; ' + e.prBasePrice + " / " + e.prWeight + '<div class="right mini-cart-btns cart-btns"><img src="' + e.reduceCartBtn + '" class="redueBtn" data-uri="' + e.reduceURI + '"><span class="lec-product-qty qty-count">' + e.prQty + '</span><img src="' + e.addCartBtn + '" data-qty="' + e.prStock + '" class="addCartBtn increase" data-uri="' + e.addURI + '"></div></h5></div></div>';
            if ($(".mini-cart").hasClass("mini-empty")) {
                var t = '<div class="col s12 mini-cart-product-scroll"><div class="row mini-cart-product-row row-margin-bottom-minus-2 animated flipInX"><div class="col s3 pr-img"><img src="' + e.prImage + '" class=""></div><div class="col s9"><h3>' + e.prName + ' <i class="material-icons deleteProductCart" data-uri="' + e.deleteURI + '">cancel</i></h3><h5 class="lec-red-text add-cart-btn ' + e.prId + '" data-section="mini-cart" data-pr="' + e.prId + '">&#8377; ' + e.prBasePrice + " / " + e.prWeight + '<div class="right mini-cart-btns cart-btns"><img src="' + e.reduceCartBtn + '" class="redueBtn" data-uri="' + e.reduceURI + '"><span class="lec-product-qty qty-count">' + e.prQty + '</span><img src="' + e.addCartBtn + '" data-qty="' + e.prStock + '" class="addCartBtn increase" data-uri="' + e.addURI + '"></div></h5></div></div></div>',
                    a = t + '<div class="col s12 mini-cart-sub-cart"><div class="row"><div class="col s6">Sub Total</div><div class="col s6 mini-sub-total">&#8377; ' + e.cart_total + '</div></div></div><div class="col s12 center mini-checkout"><a href="' + e.checkoutURI + '" type="button" class="btn lec-red-bg">' + e.checkoutMSG + "</a></div>";
                $(".min-cart-header").after(a), $(".min-cart-header h6").before('<span class="mini-cart-clear lec-red-text right" data-url="' + e.clearCartURI + '">Clear Cart</span>'), $(".mini-cart").removeClass("mini-empty").addClass("mini-ex"), $(".mini-cart-empty-msg").remove()
            } else $(".mini-cart-product-row:last-child").after(t);
            clevertap.event.push("Added to Cart", {
                "Product ID": e.product_id,
                "Product name": e.product_name,
                Price: e.base_price,
                Quantity: e.quantity
            })
        }
    }

    function i(e) {
        s({
            pin: $(e).val()
        }, "POST", $(e).attr("data-url")).done(function (t) {
            "error" == t.result ? ($(e).val(""), $(".pincode-error").html(t.msg), $(".cust-new-addr-btn").addClass("btn-default").attr("type", "button")) : ($(".pincode-error").html(""), $(".cust-new-addr-btn").addClass("address-validated"), $(".cust-new-addr-btn").addClass("address-validated"), $(".cust-new-addr-btn").removeClass("btn-default").attr("type", "submit"))
        })
    }

    function l() {
        s("", "GET", "/cart/fetchbalance").done(function (e) {
            "success" == e.result ? $(".lc-wallet-amount.balance").html("&#8377;" + e.newbalance) : $(".lc-wallet-amount.balance").html("&#8377;" + e.newbalance)
        })
    }
    window.location.href.indexOf("type=login") > -1 && document.getElementsByClassName("login-user")[0].click();
    var d = new Profile;
    d.init();
    var c = function (e) {
            e.addClass("no-border no-background"), e.closest("li").addClass("color-green"), e.html('<img src="/img/Check-Option.png">')
        },
        u = function (e) {
            var t = $(this),
                a = t.attr("data-type");
            return "summary" == a && ($(".ossitemshead").remove(), $(".ossitems").remove(), $(".check-step-1").addClass("lock"), $(".check-step-1 > .checkout-number").removeClass("no-border no-background"), $(".check-step-1").removeClass("color-green"), $(".check-step-1 > .checkout-number").html("1"), $(".check-step-2 > .checkout-number").removeClass("no-border no-background"), $(".check-step-2").removeClass("color-green"), $(".check-step-2").addClass("inactive-checkout"), $(".check-step-2 > .checkout-number").html("2"), $(".check-step-3 > .checkout-number").removeClass("no-border no-background"), $(".check-step-3").removeClass("color-green"), $(".check-step-3").addClass("inactive-checkout"), $(".check-step-3 > .checkout-number").html("3")), ("summary" == a || !$(".check-step-1").hasClass("lock")) && ("payment" == a && "" == $(".customAddressId").val() ? (Materialize.toast("Please select delivery address", 3e3), !1) : ($(".check-step-2 > .checkout-number").removeClass("no-border no-background"), $(".check-step-2").removeClass("color-green"), $(".check-step-2 > .checkout-number").html("2"), $(".check-step-3 > .checkout-number").removeClass("no-border no-background"), $(".check-step-3").removeClass("color-green"), $(".check-step-3 > .checkout-number").html("3"), "later" == $(".customDeliveryType").val() && "" == $(".customAddressId").val() ? (Materialize.toast("Please select delivery Slot", 3e3), !1) : ($(".checkout-tab").removeClass("active animated fadeIn"), $(".checkout-tab." + a).addClass("active animated fadeIn"), $(".lec-btn-prodeed-pay-tab").hasClass("exotic") && ("" == $("#exoticdate").val() ? Materialize.toast("Please select Exotic delivery Slot", 3e3) : s({
                slotEx: $("#exoticslot").val(),
                dateEx: $("#exoticdate").val()
            }, "POST", $(".delivery-slot-row-exotic").attr("data-url")).done(function (e) {})), void 0)))
        };
    e(), $(".button-collapse").sideNav(), $(".modal-trigger").leanModal({
        ready: function () {}
    }), $("select").material_select(), $(document.body).on("click", ".order-summary-close", function () {
        var e = ($(this).closest("tr").attr("data-productdetails"), $(this).closest("tr").attr("data-hubid")),
            t = "/checkoutproduct/remove/" + $(this).closest("tr").attr("data-productdetails") + "/" + e;
        s($(this).serialize(), "POST", t).done(function (e) {
            var t = JSON.parse(e),
                a = JSON.parse(t.response),
                o = t.pr_count,
                s = $(".checkout-divs").find('[data-productdetails="' + a.product_id + '"]');
            "error" == a.status ? $(".cart-item-total").removeClass("loading-text-pop") : ("" != a.message ? ($(".add_message").hasClass("hide") ? ($(".add_message").removeClass("hide"), $(".add_message").show()) : $(".add_message").show(), $(".aux-checkout-btn").removeClass("lec-btn-prodeed-payment"), $(".aux-checkout-btn").addClass("disabled"), $(".aux-checkout-btn").prop("disabled", !0)) : ($(".add_message").addClass("hide"), $(".aux-checkout-btn").addClass("lec-btn-prodeed-payment"), $(".aux-checkout-btn").removeClass("disabled"), $(".aux-checkout-btn").prop("disabled", !1)), s.addClass("animated fadeOut"), $(".cart").find("i").html(o), o < 1 && $(".cart").removeClass("loaded"), setTimeout(function () {
                if (s.remove(), $("#couponSubmit > .cpn-apply-btn").hasClass("remove-cpn") && $("#couponSubmit, .couponSubmit").submit(), $(".productlists > tbody > tr[data-type='products']").length < 1 && $(".express-cont").remove(), $(".productlists > tbody > tr[data-type='exotic']").length < 1 && $(".exotic-cont").remove(), $(".productlists > tbody > tr").length > 0) 0 == parseFloat(a.grand_total) && ($(".checkout-delivery").html("&#8377; 0"), $(".checkout-vatValue").html("&#8377; 0")), $(".checkout-gtotal").html("&#8377; " + a.grand_total), $(".citrusAmount").val(100 * e.cartTotal), $("#lc-wallet-div").attr("data-lcpay", a.grand_total), $(".customCpn").val(e.coupon), $(".checkout-payment-btn.cod").html("Place Order &#8377; " + a.grand_total), parseFloat(a.grand_total) < parseFloat($("#lc-wallet-div").attr("data-wbal")) && $(".lc-wallet-deduct-info").html("&#8377; " + a.grand_total + " will be deducted from the payable amount"), $(".checkout-payment-btn").val("Pay Now Rs. " + a.grand_total), 0 == parseFloat(a.grand_total) && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled"), $(".checkout-gtotal").html("&#8377; " + a.grand_total);
                else {
                    $(".check-step").addClass("inactive-checkout");
                    var t = '<div class="col s12 mini-cart-empty-msg"><span class="lec-red-text"><center>Don\'t Be shy! Go ahead. Add a few items to your cart.</span><br/><a href="/" class="btn lec-red-bg">Continue Shopping</a></div><center></div>';
                    $(".cart-summary-edit").html(t)
                }
            }, 800))
        })
    }), $(document).delegate(".update-cart-products", "change", function (e) {
        e.stopImmediatePropagation();
        var a = $(this).closest("tr").find(".cart-item-total").html(),
            o = $(this);
        $(this).closest("tr").find(".cart-item-total").html(""), $(this).closest("tr").find(".cart-item-total").addClass("loading-text-pop"), $(this).closest("tr").find(".cart-item-total").addClass("t-" + $(this).attr("data-id"));
        var r = "t-" + $(this).attr("data-id"),
            n = "q-" + $(this).attr("data-id"),
            i = "tc-" + $(this).attr("data-id"),
            d = $(".hub_id").data("hubid"),
            c = $(this).val(),
            u = "/product/update/" + $(this).attr("data-id") + "/" + $(this).attr("data-type") + "/" + $(this).val() + "/" + d;
        s($(this).serialize(), "POST", u).done(function (e) {
            var s = JSON.parse(e),
                d = JSON.parse(s.response);
            s.pr_count;
            "error" == d.status ? (Materialize.toast("Not Enough Stock Available", 3e3), $(".cart-item-total").removeClass("loading-text-pop"), o.closest("tr").find(".cart-item-total").html(a)) : ("" != d.message ? ($(".add_message").show(), $(".add_message").removeClass("hide"), $(".aux-checkout-btn").removeClass("lec-btn-prodeed-payment"), $(".aux-checkout-btn").addClass("disabled"), $(".aux-checkout-btn").prop("disabled", !0)) : ($(".add_message").hide(), $(".aux-checkout-btn").addClass("lec-btn-prodeed-payment"), $(".aux-checkout-btn").removeClass("disabled"), $(".aux-checkout-btn").prop("disabled", !1)), $("." + r).removeClass("loading-text-pop"), $("." + r).html("&#8377; " + parseFloat(d.product.total).toFixed(2) + '<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/close-button.png" class="order-summary-close">'), $("." + n).html(c), $("." + i).html("&#8377; " + parseFloat(d.product.total).toFixed(2)), fn.checkout["continue"](), 0 == parseFloat(d.grand_total) && ($(".checkout-delivery").html("&#8377; 0"), $(".checkout-vatValue").html("&#8377; 0")), $(".checkout-gtotal").html("&#8377; " + d.grand_total), $(".citrusAmount").val(100 * d.grand_total), $("#lc-wallet-div").attr("data-lcpay", parseFloat(d.grand_total).toFixed(2)), $(".customCpn").val(e.coupon), $(".checkout-payment-btn.cod").html("Place Order &#8377; " + parseFloat(d.grand_total).toFixed(2)), parseFloat(d.grand_total) < parseFloat($("#lc-wallet-div").attr("data-wbal")) && $(".lc-wallet-deduct-info").html("&#8377; " + parseFloat(d.grand_total).toFixed(2) + " will be deducted from the payable amount"), $(".checkout-payment-btn").val("Pay Now Rs. " + parseFloat(d.grand_total).toFixed(2)), 0 == parseFloat(d.grand_total) && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled"),
                $(".checkout-gtotal").html("&#8377; " + parseFloat(d.grand_total).toFixed(2)), $("#couponSubmit > .cpn-apply-btn").hasClass("remove-cpn") && $("#couponSubmit, .couponSubmit").submit(), Materialize.toast("Cart updated", 3e3), l(), t())
        })
    }), $("#siginform").submit(function (e) {
        e.preventDefault(), ga("send", "event", "Authentication", "click", "Sign In");
        var t = $(this).find(".full-width-button");
        a(t), s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
            o(t), "error" == e.result ? "otp" == e.action ? ($('<span class="otp-number"> OTP has sent to ' + e.mobile + "</span>").insertAfter(".otp-label"), $("#signin").closeModal(), $("#otpmodal").openModal()) : Materialize.toast(e.msg, 3e3) : (Materialize.toast(e.msg, 3e3), setTimeout(function () {
                location.reload(!0)
            }, 500))
        })
    }), $("#signupform").submit(function (e) {
        e.preventDefault(), ga("send", "event", "Authentication", "click", "Sign up");
        var t = $(this).find(".full-width-button");
        a(t), s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
            "ok" == e.result ? (o(t), 1 == e.verified ? Materialize.toast("Email/Mobile already exists", 4e3) : ($("#signupform")[0].reset(), $('<span class="otp-number"> OTP has sent to ' + e.mobile + "</span>").insertAfter(".otp-label"), $("#signin").closeModal(), $("#otpmodal").openModal())) : (o(t), t.html("Try Again"))
        })
    }), $("#optform").submit(function (e) {
        e.preventDefault(), ga("send", "event", "Authentication", "click", "OTP");
        var t = $(this).find(".full-width-button"),
            r = $(this).find('input[type="number"]'),
            n = $(this).find(".otp-label");
        a(t), s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
            "ok" == e.result ? (o(t), Materialize.toast("OTP Verified", 2e3), setTimeout(function () {
                location.reload(!0)
            }, 1500)) : (o(t), r.removeClass("valid").addClass("invalid"), n.text("INVALID OTP!!"), t.html("Try Again"), setTimeout(function () {
                n.text("ENTER YOUR OTP")
            }, 3e3))
        })
    }), $("#sc-otp").submit(function (e) {
        e.preventDefault();
        var t = $(this).find(".full-width-button"),
            r = $(this).find('input[type="number"]'),
            n = $(this).find('input[type="number"]').val();
        return a(t), r.hasClass("sc-otp-varify") || 10 == n.length ? void s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
            "error" == e.result ? (o(t), Materialize.toast(e.msg, 3e3)) : location.reload(!0)
        }) : (o(t), Materialize.toast("Mobile number must be 10 digit length", 3e3), !1)
    });
    var p = !1;
    if ($(document).delegate(".addCartBtn", "click", function (e) {
            var t, a = $(this),
                o = a.closest(".add-cart-btn").find(".cart-btns .qty-count"),
                r = a.attr("data-qty"),
                i = a.closest(".add-cart-btn").attr("data-section"),
                l = a.closest(".add-cart-btn").attr("data-pr"),
                d = a.html();
            parseInt(o.text()) >= parseInt(r) ? (ga("send", "event", "Cart", "Action", "Max Units Reached"), Materialize.toast("Only " + r + " units left!!", 3e3)) : o.text() >= parseInt(r) ? Materialize.toast("Max limit is 10 qty per order", 3e3) : p || (p = !0, a.html("Processing..."), a.hasClass("increase") && a.parent().find(".wait_txt").addClass("show"), s("", "POST", a.attr("data-uri")).done(function (e) {
                var s = JSON.parse(e),
                    r = JSON.parse(s.response),
                    c = s.pr_count;
                if ("success" == r.status) {
                    if (clevertap.event.push("Added to Cart", {
                            "Product ID": r.product.product_id,
                            "Product name": r.product.product_name,
                            Price: r.product.base_price,
                            Quantity: r.quantity
                        }), Materialize.toast("Added Item to the Cart", 3e3), a.parent().find(".wait_txt").removeClass("show"), a.html(d), "" != r.message) {
                        var u = '<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info.png" alt="Info">',
                            m = "<span>&times;</span>";
                        $(".add_message").show().html(u + r.message + m).addClass("fadeInUp"), $(".add_message").removeClass("fadeInUp"), t = setTimeout(function () {
                            $(".add_message").html(r.message).removeClass("fadeOutDown").hide()
                        }, 5e3), fn.add_message.close()
                    } else $(".add_message").html(r.message).removeClass("fadeOutDown").hide(), clearTimeout(t);
                    if ("cart" == i) a.closest(".card-content").find(".js-product-total").text(r.total), 1 == r.quantity && a.closest(".add-cart-btn").find(".redueBtn").show();
                    else if ("mini-cart" == i) {
                        if ($(".mini-sub-total").html("&#8377 " + r.grand_total), 1 == r.quantity) {
                            a.closest(".add-cart-btn").find(".redueBtn").show();
                            $('.add-cart-btn[data-section="product-details"][data-pr="' + l + '"]').find("button.addCartBtn").addClass("display-none");
                            $('.add-cart-btn[data-section="product-details"][data-pr="' + l + '"]').closest(".add-cart-btn").find(".cart-btns").addClass("display-inline")
                        }
                        $('.add-cart-btn[data-section="product-details"][data-pr="' + l + '"]').find(".qty-count").text(r.quantity)
                    } else a.hasClass("increase") || a.addClass("display-none"), a.closest(".add-cart-btn").find(".cart-btns").addClass("display-inline"), $(".mini-sub-total").html("&#8377 " + r.grandTotal), 1 == r.quantity && ($('.add-cart-btn[data-section="mini-cart"]').hasClass(l) || n(r.product), $('.add-cart-btn[data-section="mini-cart"][data-pr="' + l + '"]').find(".redueBtn").show()), $('.add-cart-btn[data-section="mini-cart"][data-pr="' + l + '"]').find(".qty-count").text(r.quantity);
                    c > 0 ? ($(".cart").addClass("loaded"), $(".cart").find("i").html(r.item_count)) : $(".cart").removeClass("loaded"), o.text(r.quantity)
                } else Materialize.toast(e.msg, 25e3);
                p = !1
            }).fail(function (e, t, a) {
                Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3), p = !1
            }))
        }), $(document).delegate(".redueBtn", "click", function (e) {
            e.preventDefault();
            var t, a = $(this),
                o = a.closest(".add-cart-btn").attr("data-section"),
                r = a.closest(".add-cart-btn").attr("data-pr");
            p || (p = !0, a.parent().find(".wait_txt").addClass("show"), s("", "POST", a.attr("data-uri")).done(function (e) {
                var s = JSON.parse(e),
                    n = JSON.parse(s.response),
                    i = s.pr_count;
                if ("success" == n.status) {
                    if (a.parent().find(".wait_txt").removeClass("show"), "" != n.message) {
                        var l = '<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info.png" alt="Info">',
                            d = "<span>&times;</span>";
                        $(".add_message").show().html(l + n.message + d).addClass("fadeInUp"), $(".add_message").removeClass("fadeInUp"), t = setTimeout(function () {
                            $(".add_message").html(n.message).removeClass("fadeOutDown").hide()
                        }, 5e3), fn.add_message.close()
                    } else $(".add_message").html(n.message).removeClass("fadeOutDown").hide(), clearTimeout(t);
                    if ("cart" == o) a.closest(".card-content").find(".js-product-total").text(n.total), "0" == n.quantity && a.hide();
                    else if ("mini-cart" == o) {
                        if ($(".mini-sub-total").html("&#8377 " + n.grandTotal), "0" == n.quantity) {
                            a.hide(), $('.add-cart-btn[data-section="product-details"][data-pr="' + r + '"]').find(".cart-btns").removeClass("display-inline").addClass("display-none"), $('.add-cart-btn[data-section="product-details"][data-pr="' + r + '"]').find(".addCartBtn").removeClass("display-none");
                            var c = $('.add-cart-btn[data-section="mini-cart"][data-pr="' + r + '"]').closest(".mini-cart-product-row");
                            c.addClass("animated flipOutY"), setTimeout(function () {
                                if (c.remove(), $(".mini-cart-product-row").length > 0);
                                else {
                                    $(".mini-cart-sub-cart").remove(), $(".mini-checkout").remove(), $(".mini-cart").removeClass("mini-ex").addClass("mini-empty"), $(".mini-cart-clear").remove();
                                    var e = '<div class="col s12 mini-cart-empty-msg"><span class="lec-red-text">Don\'t Be shy! Go ahead. Add a few items to your cart.</span></div>';
                                    $(".min-cart-header").after(e)
                                }
                            }, 800)
                        }
                        $('.add-cart-btn[data-section="product-details"][data-pr="' + r + '"]').find(".qty-count").text(n.quantity)
                    } else {
                        if ("0" == n.quantity) {
                            a.closest(".add-cart-btn").find(".cart-btns").removeClass("display-inline").addClass("display-none"), a.closest(".add-cart-btn").find(".addCartBtn").removeClass("display-none"), $('.add-cart-btn[data-section="mini-cart"][data-pr="' + r + '"]').find(".redueBtn").hide();
                            var c = $('.add-cart-btn[data-section="mini-cart"][data-pr="' + r + '"]').closest(".mini-cart-product-row");
                            c.addClass("animated flipOutY"), setTimeout(function () {
                                if (c.remove(), $(".mini-cart-product-row").length > 0);
                                else {
                                    $(".mini-cart-sub-cart").remove(), $(".mini-checkout").remove(), $(".mini-cart").removeClass("mini-ex").addClass("mini-empty"), $(".mini-cart-clear").remove();
                                    var e = '<div class="col s12 mini-cart-empty-msg"><span class="lec-red-text">Don\'t Be shy! Go ahead. Add a few items to your cart.</span></div>';
                                    $(".min-cart-header").after(e)
                                }
                            }, 800)
                        }
                        $(".mini-sub-total").html("&#8377 " + n.grand_total), $('.add-cart-btn[data-section="mini-cart"][data-pr="' + r + '"]').find(".qty-count").text(n.quantity)
                    }
                    a.closest(".add-cart-btn").find(".cart-btns .qty-count").text(n.quantity), i > 0 ? ($(".cart").addClass("loaded"), $(".cart").find("i").html(n.item_count)) : $(".cart").removeClass("loaded"), "NA" != e.productDetails && clevertap.event.push("Product Removed from Cart", {
                        "Product ID": n.product_id,
                        "Product Name": n.product.product_name,
                        "Product Price": n.product.base_price
                    })
                }
                p = !1
            }).fail(function (e, t, a) {
                Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3), p = !1
            }))
        }), $(document).delegate(".deleteProductCart", "click", function (e) {
            e.preventDefault();
            var t = $(this),
                a = t.closest(".mini-cart-product-row").find(".add-cart-btn").attr("data-section"),
                o = t.closest(".mini-cart-product-row"),
                r = t.closest(".mini-cart-product-row").find(".add-cart-btn").attr("data-pr");
            p || (p = !0, s("", "POST", t.attr("data-uri")).done(function (e) {
                "success" == e.result && ("mini-cart" == a && ($(".mini-sub-total").html("&#8377 " + e.cartTotal), o.addClass("animated flipOutY"), $('.add-cart-btn[data-section="product-details"][data-pr="' + r + '"]').find(".cart-btns").removeClass("display-inline").addClass("display-none"), $('.add-cart-btn[data-section="product-details"][data-pr="' + r + '"]').find(".addCartBtn").removeClass("display-none"), $('.add-cart-btn[data-section="product-details"][data-pr="' + r + '"]').find(".lec-product-qty.qty-count").html("0"), setTimeout(function () {
                    if (o.remove(), $(".mini-cart-product-row").length > 0);
                    else {
                        $(".mini-cart-sub-cart").remove(), $(".mini-checkout").remove(), $(".mini-cart").removeClass("mini-ex").addClass("mini-empty"), $(".mini-cart-clear").remove();
                        var e = '<div class="col s12 mini-cart-empty-msg"><span class="lec-red-text">Don\'t Be shy! Go ahead. Add a few items to your cart.</span></div>';
                        $(".min-cart-header").after(e)
                    }
                }, 800), e.productCount > 0 ? ($(".cart").addClass("loaded"), $(".cart").find("i").html(e.productCount)) : ($(".cart").removeClass("loaded"), $(".cart").find("i").html(e.productCount))), "NA" != e.productDetails && clevertap.event.push("Product Removed from Cart", {
                    "Product ID": e.productDetails.pr_id,
                    "Product Name": e.productDetails.pr_name,
                    "Product Price": e.productDetails.pr_base_price
                })), p = !1
            }).fail(function (e, t, a) {
                Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3), p = !1
            }))
        }), $("#placesForm, #placesFormPop").bind("keypress", function (e) {
            if (13 == e.keyCode) return !1
        }), $("#placesFormLanding,#slugFormLanding").submit(function (e) {
            $(".location-error,.landing-error").addClass("hide"), $(".landing-location span").removeClass("hide"), $(this).find('input[type="submit"]').val(""), $(this).find("img").removeClass("hide"), e.preventDefault();
            var t, a, o, r = $(this);
            if ("" == a || "" == o) $(".li-main-container").removeClass("body-bg-loader2"), Materialize.toast("Please select the location from autosuggest list.", 3e3);
            else {
                var n = this;
                s(r.serialize(), "POST", r.attr("data-url")).done(function (e) {
                    "error" == e.result ? ($(n).find("img").addClass("hide"), $(n).find('input[type="submit"]').val("GO"), $(".loc-error").addClass("show"), setTimeout(function () {
                        $(".loc-error").removeClass("show")
                    }, 2500), clevertap.event.push("Location Search", {
                        Location: e.location,
                        Status: "Failed"
                    })) : (clevertap.event.push("Location Search", {
                        Location: e.location,
                        Status: "Found"
                    }), "main" == t ? window.location.href = e.url : r.hasClass("explore") ? window.location.href = r.attr("after") : location.reload(!0))
                }).fail(function (e, t, a) {
                    $(".li-main-container").removeClass("body-bg-loader2"), Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3), btn.attr("type", "submit"), btn.removeClass("search-location-main"), btn.html(btn.attr("data-name"))
                })
            }
        }), $("#placesForm, #placesFormPop").submit(function (e) {
            $(".li-main-container").addClass("body-bg-loader2"), e.preventDefault();
            var t, a, o, r = $(this);
            if ($(this).hasClass("placesFormPop")) {
                var n = $(this).find(".full-width-button");
                t = "pop", a = r.find("#latpop").val(), o = r.find("#lngpop").val()
            } else {
                var n = $(this).find(".lec-select-btn");
                t = "main", a = r.find("#lat").val(), o = r.find("#lng").val()
            }
            "" == a || "" == o ? ($(".li-main-container").removeClass("body-bg-loader2"), Materialize.toast("Please select the location from autosuggest list.", 3e3)) : (n.attr("type", "button"), n.addClass("search-location-main"), n.html("<span>.</span><span>.</span><span>.</span>"), s(r.serialize(), "POST", r.attr("data-url")).done(function (e) {
                "error" == e.result ? ($(".li-main-container").removeClass("body-bg-loader2"), Materialize.toast(e.msg, 3e3), n.attr("type", "submit"), n.removeClass("search-location-main"), n.html(n.attr("data-name")), clevertap.event.push("Location Search", {
                    Location: e.location,
                    Status: "Failed"
                })) : (clevertap.event.push("Location Search", {
                    Location: e.location,
                    Status: "Found"
                }), "main" == t ? window.location.href = e.url : r.hasClass("explore") ? window.location.href = r.attr("after") : location.reload(!0))
            }).fail(function (e, t, a) {
                $(".li-main-container").removeClass("body-bg-loader2"), Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3), n.attr("type", "submit"), n.removeClass("search-location-main"), n.html(n.attr("data-name"))
            }))
        }), $(".signup-toggle").click(function () {
            $(".lec-signup-div-js").removeClass("display-none").addClass("display-block animated fadeIn"), $(".lec-signin-div-js").removeClass("display-block").addClass("display-none animated fadeIn"), $(".lec-easy-div-js").removeClass("display-block").addClass("display-none animated fadeIn")
        }), $(".error_msg").find("i").on("click", function () {
            $(".error_msg").removeClass("animated fadeOutUp"), $(".error_msg").addClass("animated fadeOutUp"), setTimeout(function () {
                $(".error_msg").hide()
            }, 1500)
        }), $(".easy-toggle").click(function (e) {
            return $(".lec-easy-div-js").hasClass("empty") ? (Materialize.toast("Don't Be shy! Go ahead. Add a few items to your cart.", 3e3), e.preventDefault(), !1) : ($(".lec-easy-div-js").removeClass("display-none").addClass("display-block animated fadeIn"), $(".lec-signup-div-js").removeClass("display-block").addClass("display-none animated fadeIn"), $(".lec-signin-div-js").removeClass("display-block").addClass("display-none animated fadeIn"), void 0)
        }), $(".signin-toggle").click(function () {
            $(".lec-signup-div-js").removeClass("display-block").addClass("display-none animated fadeIn"), $(".lec-signin-div-js").removeClass("display-none").addClass("display-block animated fadeIn"), $(".lec-easy-div-js").removeClass("display-block").addClass("display-none animated fadeIn")
        }), $("#couponSubmit, .couponSubmit").submit(function (e) {
            e.preventDefault();
            var t = $(this).find(".cpn-apply-btn"),
                a = $(this).find('input[type="text"]');
            if (t.hasClass("remove-cpn")) ga("send", "event", "Coupon", "click", "Remove Coupon Code", a), t.removeClass("remove-cpn"), t.html("Apply"), a.removeClass("coupon-disabled"), a.prop("disabled", !1), $(".promo-error").html(""), a.val(""), s($(this).serialize(), "POST", $(this).attr("data-remove-url")).done(function (e) {
                a.removeClass("coupon-disabled"), t.removeClass("remove-cpn"), 0 == parseFloat(e.cart.subtotal) ? ($(".checkout-delivery").html("&#8377; 0"), $(".checkout-vatValue").html("&#8377; 0")) : ($(".checkout-delivery").html("&#8377; " + e.cart.shipping), $(".checkout-vatValue").html("&#8377; " + e.cart.vat)), $(".checkout-discount").html("&#8377; " + e.cart.discount), $(".checkout-gtotal").html("&#8377; " + e.cart.subtotal), $(".citrusSignature").val(e.cart.hash), $(".citrusMerchantTxnId").val(e.cart.txnId), $(".citrusAmount").val(100 * e.cart.subtotal), $("#lc-wallet-div").attr("data-lcpay", e.cart.paisa), $(".customCpn").val(e.coupon), $(".checkout-payment-btn.cod").html("Place Order &#8377; " + e.cart.subtotal), parseFloat(e.cart.subtotal) < parseFloat($("#lc-wallet-div").attr("data-wbal")) && $(".lc-wallet-deduct-info").html("&#8377; " + e.cart.subtotal + " will be deducted from the payable amount"), $(".checkout-payment-btn").val("Pay Now Rs. " + e.cart.subtotal), 0 == parseFloat(e.cart.subtotal) && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled"), l()
            }).fail(function (e, t, a) {
                Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3)
            });
            else {
                ga("send", "event", "Coupon", "click", "Apply Coupon Code", a);
                var o = $(this).find(".cpn-apply-btn");
                $(".promo-error");
                o.attr("type", "button"), o.addClass("loading-text-pop animated flipInY"), o.html(""), $(".promo-error").html(""), s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
                    "error" == e.result ? ($(".promo-error").html(e.status), Materialize.toast(e.message, 3e3), clevertap.event.push("Coupon Not Applied", {
                        Reason: e.message,
                        "Coupon Code": e.coupon
                    }), setTimeout(function () {
                        $(".promo-error").html("")
                    }, 2500), o.html(o.attr("data-name"))) : (l(), a.addClass("coupon-disabled"), t.addClass("remove-cpn"), 0 == parseFloat(e.cart.subtotal) ? ($(".checkout-delivery").html("&#8377; 0"), $(".checkout-vatValue").html("&#8377; 0")) : ($(".checkout-delivery").html("&#8377; " + e.cart.shipping), $(".checkout-vatValue").html("&#8377; " + e.cart.vat)), $(".checkout-discount").html("&#8377; " + e.cart.discount), $(".coupontotal").html("&#8377; " + e.cart.subtotal), $(".citrusSignature").val(e.cart.hash), $(".citrusMerchantTxnId").val(e.cart.txnId), $(".citrusAmount").val(100 * e.cart.subtotal), $("#lc-wallet-div").attr("data-lcpay", e.cart.paisa), $(".customCpn").val(e.coupon), $(".checkout-payment-btn.cod").html("Place Order &#8377; " + e.cart.subtotal), parseFloat(e.cart.subtotal) < parseFloat($("#lc-wallet-div").attr("data-wbal")) && $(".lc-wallet-deduct-info").html("&#8377; " + e.cart.subtotal + " will be deducted from the payable amount"), $(".checkout-payment-btn").val("Pay Now Rs. " + e.cart.subtotal), 0 == parseFloat(e.cart.subtotal) && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled"), clevertap.event.push("Coupon Applied", {
                        "Total Amount": e.cart.carttotal,
                        "Coupon Code": e.coupon,
                        Discount: e.cart.discount,
                        "Payable Amount": e.cart.subtotal
                    }), $(".promo-error").html(e.message), t.html("Remove"), a.prop("disabled", !0)), t.attr("type", "submit"), t.removeClass("loading-text-pop animated flipInY").addClass("animated flipInY").removeClass("animated flipInY")
                }).fail(function (e, t, a) {
                    Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3)
                })
            }
        }), $("#lecCrMonth").keyup(function (e) {
            e.preventDefault();
            var t = $(this).val(),
                a = $("#citrusExpiry").val(),
                o = a.split("/");
            $("#citrusExpiry").val(t + "/" + o[1])
        }), $("#lecCrYear").keyup(function (e) {
            e.preventDefault();
            var t = $(this).val(),
                a = $("#citrusExpiry").val(),
                o = a.split("/");
            $("#citrusExpiry").val(o[0] + "/" + t)
        }), $(".tab-verticle").click(function (e) {
            $(".set-finalPay").data("val");
            if ($(".checkout-payment-btn").removeAttr("disabled").removeClass("disabled-btn"), $(this).hasClass("CODTAB")) {
                if (1 == fn.codEligible) return;
                var t = $(this).find("a").attr("href");
                $(".tab-verticle").removeClass("active"), $(".profile-section").removeClass("current"), $(".payment-section").removeClass("current"), $(this).addClass("active"), $(t).addClass("current");
                var a = t.substring(1);
                $(".payment-section." + a).addClass("current"), localStorage.setItem("COD_EL", "true")
            } else {
                var t = $(this).find("a").attr("href");
                $(".tab-verticle").removeClass("active"), $(".profile-section").removeClass("current"), $(".payment-section").removeClass("current"), $(this).addClass("active"), $(t).addClass("current");
                var a = t.substring(1);
                $(".payment-section." + a).addClass("current"), localStorage.setItem("COD_EL", "false")
            }
        }), $(".checkout-payments-tab").click(function (e) {
            if ("" == $("input[name='line1']").val() || "" == $("input[name='line2']").val() || "" == $("input[name='pincode']").val()) {
                var t = $(".checkout-payments-tab").find(".collapsible-header");
                if (!t.hasClass("active")) return Materialize.toast("Please fill in delivery address details", 3e3), !1;
                $(".lec-gst-btn-prodeed-pay-tab").hasClass("exotic") && s({
                    slotEx: $('input:radio[name="deliveryTimeExotic"]:checked').val(),
                    dateEx: $('input:radio[name="deliveryTypeExotic"]:checked').val()
                }, "POST", $(".delivery-slot-row-exotic").attr("data-url")).done(function (e) {}), s({
                    line1: $('input[name="line1"]').val(),
                    line2: $('input[name="line2"]').val(),
                    pincode: $('input[name="pincode"]').val(),
                    lat: $('input[name="lat"]').val(),
                    lng: $('input[name="lng"]').val()
                }, "POST", $(".guest-pay").attr("data-url")).done(function (e) {}), t.trigger("click")
            }
        }), $(".delivery-div").click(function () {
            var e = $(this);
            e.hasClass("disabled") || (e.find('input[name="deliveryType"]').prop("checked", !0), $(".delivery-div").removeClass("active"), e.addClass("active"), $(".customDeliveryType").val(e.find('input[name="deliveryType"]').val()), $(".delivery-day-ul").removeClass("show animated fadeIn"), "later" == e.find('input[name="deliveryType"]').val() ? ($(".deliver-slots").show(), $(".deliver-slots").addClass("show animated fadeIn")) : ($(".deliver-slots").removeClass("show animated fadeIn"), $(".deliver-slots").hide()))
        }), $(".delivery-div-exo").click(function () {
            var e = $(this);
            e.hasClass("disabled") || (e.find('input[name="deliveryTypeExotic"]').prop("checked", !0), $(".delivery-div-exo").removeClass("active"), e.addClass("active"))
        }), $(".delivery-time-ul.tommrow li:first-child").find('input[name="deliveryTime"]').attr("checked", !0), $(".delivery-time-ul.today li:not(.disabled):first").find('input[name="deliveryTime"]').attr("checked", !0), $('input[name="deliveryTime"]:checked').closest("li").addClass("active"), $(".delivery-time-ul li").click(function () {
            ga("send", "event", "Delivery", "click", "Delivery type");
            var e = $(this);
            if (!e.hasClass("disabled")) {
                e.find('input[name="deliveryTime"]').prop("checked", !0), $(".delivery-time-ul li").removeClass("active"), e.addClass("active");
                var t = $(".customDeliverySlot").val(),
                    a = t.split("//");
                $(".customDeliverySlot").val(a[0] + "//" + e.find('input[name="deliveryTime"]').val())
            }
        }), $(".delivery-time-ul-exo li").click(function () {
            var e = $(this);
            ga("send", "event", "Delivery", "click", "Delivery type"), e.hasClass("disabled") || (e.find('input[name="deliveryTimeExotic"]').prop("checked", !0), $(".delivery-time-ul-exo li").removeClass("active"), e.addClass("active"))
        }), $('input[type="radio"][name="deliveryDay"]').click(function (e) {
            ga("send", "event", "Delivery", "click", "Delivery Day");
            var t = $(this);
            if (t.closest("li").hasClass("disabled")) e.preventDefault();
            else {
                t.prop("checked", !0), $(".delivery-time-ul li").removeClass("active"), t.closest("li").addClass("active");
                var a = $(".customDeliverySlot").val(),
                    o = a.split("//");
                $(".customDeliverySlot").val(t.val() + "//" + o[1]), $(".delivery-time-ul").removeClass("show animated fadeIn"), "Today" == t.text() ? $(".delivery-time-ul.today").addClass("show animated fadeIn") : $(".delivery-time-ul.tommrow").addClass("show animated fadeIn")
            }
        }), $('input[type="radio"][name="deliveryType"]').click(function (e) {
            ga("send", "event", "Delivery", "click", "Delivery type");
            var t = $(this);
            if (t.closest("div").hasClass("disabled")) e.preventDefault();
            else {
                t.prop("checked", !0), $(".delivery-div").removeClass("active"), t.closest("div").addClass("active");
                $(".customDeliveryType").val();
                $(".customDeliveryType").val(t.val())
            }
        }), $(".customDeliveryType").val($('.delivery-div input[name="deliveryType"]').val()), $(".customDeliverySlot").val($("#deliveryslot").val()), $("#custoemrAddress").submit(function (e) {
            e.preventDefault(), ga("send", "event", "Address", "click", "Select Address");
            var t = $(this).find(".full-width-button");
            t.attr("type", "button"), t.addClass("loading-text-pop animated flipInY"), t.html(""), s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
                if ("error" == e.result) Materialize.toast(e.msg, 3e3);
                else {
                    var a = '<div class="addresses" data-url="/check/city?addressId=' + e.addressPk + '"><img class="checkout-address-uncheck" src = "/img/elements/uncheck.png"><img class="checkout-address-check hide" src = "/img/elements/check.png"><input type="radio" name="address" checked="checked" class="radio-box hide" value="' + e.addressPk + '""/><div class="address-details"><div class="address-name"> ' + e.userName + '</div><div class="address-line1">' + e.address.line1 + '<span class="address-truncate">.....</span></div><div class="address-line2">' + e.address.line2 + '</div><div class="address-MobNo"><span>Mobile Number:</span> ' + e.address.mobile + '</div><div class="edit-options"><span class="edit-address"><img class="address-edit" src="/img/Edit.png" data-url="/user/edit-address/' + e.addressPk + '" data-id="' + e.addressPk + '"></span><span><img class="address-delete" src="/img/delete.png" data-url="/user/delete-address?addressid=' + e.addressPk + '"></span></div></div></div>';
                    $(".addresses-container").append(a), $(".paytmaddress").val(e.addressPk), $(".customAddressId").val(e.addressPk), $("#custAddress").closeModal(), $(".customer-no-address").remove(), fn.address.editAddr(), $("#custoemrAddress").trigger("reset")
                }
                t.removeClass("loading-text-pop animated flipInY"), t.html(t.attr("data-name"))
            })
        }), $(".pincode").on("paste keyup change", function (e) {
            e.preventDefault();
            var t = $(this),
                a = $(this).val();
            6 == a.length ? isNaN(a) ? (t.val(""), t.attr("placeholder", "Only Numbers allowed")) : i($(this)) : $(".cust-new-addr-btn").addClass("btn-default").removeClass("lec-red-bg white-text").attr("type", "button")
        }), $(".lec-testimonial-user li").click(function (e) {
            var t = $(this),
                a = t.attr("data-id");
            $(".lec-testimonial-div").removeClass("active animated fadeIn"), $(".lec-testimonial-user li").removeClass("active"), t.addClass("active"), $(".lec-testimonial-div." + a).addClass("active animated fadeIn")
        }), $("#subscribeNews").submit(function (e) {
            e.preventDefault(), $(".news-msg-container").html("");
            var t = $(this).find("button");
            t.attr("type", "button"), t.addClass("loading-text-pop"), t.html(""), setTimeout(function () {
                $(".news-msg-container").html("Successfully subscribed!!"), setTimeout(function () {
                    $(".news-msg-container").html("")
                }, 2e3), t.attr("type", "submit"), t.removeClass("loading-text-pop"), t.html(t.attr("data-name"))
            }, 1e3)
        }), $(".lec-profile-view-order-details").click(function (e) {
            e.preventDefault(), ga("send", "event", "Profile", "click", "View Order Details");
            var t = $(this),
                a = t.closest(".timeline-panel").find(".time-line-order-details");
            a.toggleClass("display-none display-block animated fadeIn"), "VIEW DETAILS" == t.text() ? t.text("HIDE DETAILS") : t.text("VIEW DETAILS")
        }), $(".scrollToTop").click(function () {
            return $("html, body").animate({
                scrollTop: 0
            }, 800), !1
        }), $(document).delegate(".mini-cart-clear", "click", function (e) {
            e.preventDefault();
            var t = $(this);
            p || (p = !0, s("", "POST", $(this).attr("data-url")).done(function (e) {
                "success" == e.result && ($(".mini-cart-product-row").addClass("animated flipOutX"), $(".mini-cart-sub-cart").addClass("animated flipOutX"), $(".mini-checkout").addClass("animated flipOutX"), t.addClass("animated slideUp"), $(".mini-cart").removeClass("mini-ex").addClass("mini-empty"), setTimeout(function () {
                    $(".mini-cart-product-scroll").remove(), $(".mini-cart-sub-cart").remove(), $(".mini-checkout").remove(), t.remove();
                    var e = '<div class="col s12 mini-cart-empty-msg"><span class="lec-red-text">Don\'t Be shy! Go ahead. Add a few items to your cart.</span></div>';
                    $(".min-cart-header").after(e)
                }, 800), $(".mini-cart-qty-num").html("0"), $('.add-cart-btn[data-section="product-details"]').find(".cart-btns").removeClass("display-inline").addClass("display-none"), $('.add-cart-btn[data-section="product-details"]').find(".addCartBtn").removeClass("display-none"), $(".lec-product-qty.qty-count").html("0")), p = !1
            }).fail(function (e, t, a) {
                Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3), p = !1
            }))
        }), $(".citrusNumber").keyup(function (e) {
            e.preventDefault();
            var t = $(this);
            t.val().length > 0 && isNaN(t.val()) ? (t.val(""), $(".citrusNumberLabel").text("Only numbers allowed")) : $(".citrusNumberLabel").text($(".citrusNumberLabel").attr("data-value"))
        }), $(".citrusCardHolder").keyup(function (e) {
            e.preventDefault();
            var t = $(this);
            isNaN(t.val()) ? $(".citrusCardHolderLabel").text($(".citrusCardHolderLabel").attr("data-value")) : (t.val(""), $(".citrusCardHolderLabel").text("Only alphabets allowed"))
        }), $(".lecCrMonth").keyup(function (e) {
            e.preventDefault();
            var t = $(this);
            isNaN(t.val()) ? (t.val(""), $(".lecCrMonthLabel").text("Only numbers allowed")) : $(".lecCrMonthLabel").text($(".lecCrMonthLabel").attr("data-value"))
        }), $(".lecCrMonth").keyup(function (e) {
            e.preventDefault();
            var t = $(this);
            isNaN(t.val()) ? (t.val(""), $(".lecCrMonthLabel").text("Only numbers allowed")) : $(".lecCrMonthLabel").text($(".lecCrMonthLabel").attr("data-value"))
        }), $(".lecCrYear").keyup(function (e) {
            e.preventDefault();
            var t = $(this);
            isNaN(t.val()) ? (t.val(""), $(".lecCrYearLabel").text("Only numbers allowed")) : $(".lecCrYearLabel").text($(".lecCrYearLabel").attr("data-value"))
        }), $(".lec-explore-range a").click(function (e) {
            if ($(this).hasClass("non-located")) return $(this).find("span").hasClass("explore") && ($("#placesFormPop").addClass("explore"), $("#placesFormPop").attr("after", $(this).attr("href"))), $("#places").openModal(), !1
        }), $(".lec-btn-prodeed-pay-tab").hasClass("exotic")) {
        var m = $("#exoticdeliveryslot").val(),
            h = m.split("~"),
            f = h[0],
            v = h[1];
        $("#exoticdate").val(f), $("#exoticslot").val(v)
    }
    if ($(".lec-gst-btn-prodeed-pay-tab").hasClass("exotic")) {
        var m = $("#exoticdeliveryslot").val(),
            h = m.split("~"),
            f = h[0],
            v = h[1];
        $("#exoticdate").val(f), $("#exoticslot").val(v)
    }
    $(".capture").click(function (e) {
        e.preventDefault();
        var t, a = $(this);
        t = a.hasClass("c") ? "notify" : "form", s("", "POST", a.attr("data-uri")).done(function (e) {}), $(this).removeAttr("data-uri"), $(this).removeClass("capture lec-red-bg _c _g").addClass("sold-out-btn " + t).html("<span>Sold Out</span>"), e.stopPropagation()
    }), $("#notifyMe").submit(function (e) {
        e.preventDefault();
        var t = $(this),
            a = $(this).find(".full-width-button");
        a.attr("type", "button"), a.addClass("search-location-main"), a.html("<span>.</span><span>.</span><span>.</span>"), s(t.serialize(), "POST", t.attr("data-url")).done(function (e) {
            Materialize.toast(e.msg, 3e3), a.attr("type", "submit"), a.removeClass("search-location-main"), a.html(a.attr("data-name")), $("#notify").closeModal()
        })
    }), $("#tour-form").submit(function (e) {
        e.preventDefault();
        var t = $(this),
            a = $(this).find(".lec-red-bg");
        a.attr("type", "button"), a.addClass("search-location-main"), a.html("<span>.</span><span>.</span><span>.</span>"), s(t.serialize(), "POST", t.attr("data-url")).done(function (e) {
            "success" == e.status ? (Materialize.toast(e.message, 3e3), setTimeout(function () {
                window.location = "/"
            }, 1e3)) : (a.attr("type", "submit"), Materialize.toast(e.message, 3e3)), a.removeClass("search-location-main"), a.html(a.attr("data-name"))
        })
    }), $(".checkout-payment-btn.cod").click(function (e) {
        ga("send", "event", "Payment", "click", "COD");
        var t = $(this);
        t.addClass("search-location-main"), t.html("<span>.</span><span>.</span><span>.</span>"), localStorage.setItem("default_pin", "")
    }), $(".useEmailCheck").focusout(function (e) {
        e.preventDefault();
        var t = $(this),
            a = $(this).val();
        s({
            email: a
        }, "POST", $(this).attr("data-uri")).done(function (e) {
            "error" == e.result ? (t.val(""), t.attr("placeholder", e.msg), Materialize.toast(e.msg, 3e3), $(".user-update-profile-btn").addClass("btn-default").removeClass("lec-red-bg white-text").attr("type", "button")) : $(".user-update-profile-btn").removeClass("btn-default").addClass("lec-red-bg white-text").attr("type", "submit")
        })
    }), $(".editUserProfile").on("click", function (e) {
        e.preventDefault(), ga("send", "event", "Profile", "click", "Edit Profile"), s("", "POST", $(this).attr("data-url")).done(function (e) {
            if ("error" == e.result) Materialize.toast("The diagnosis results are in. <br/>Slow Internet Connection detected!<br/> Wait till it heals or check with your network operator.", 3e3);
            else {
                var t = $("#userProfileEdit");
                t.find('input[name="name"]').val(e.data.name), t.find('input[name="email"]').val(e.data.email), t.find('select[name="gender"]').val(e.data.gender), $(".profile-modal").openModal()
            }
        })
    }), $("#userSettingForm").submit(function (e) {
        e.preventDefault(), ga("send", "event", "Profile", "click", "Change Password"), btn = $(this).find(".full-width-button"), btn.attr("type", "button"), btn.addClass("search-location-main"), btn.html("<span>.</span><span>.</span><span>.</span>"), s($(this).serialize(), "POST", $(this).attr("data-url")).done(function (e) {
            "error" == e.result ? Materialize.toast(e.msg, 3e3) : (Materialize.toast(e.msg, 3e3), setTimeout(function () {
                location.reload(!0)
            }, 1500)), btn.attr("type", "submit"), btn.removeClass("search-location-main"), btn.html(btn.attr("data-name"))
        })
    }), $(".request-exotic").on("click", function (e) {
        e.preventDefault(), $('#exotic input[type="text"]').val(""), $('#exotic input[type="email"]').val(""), $('#exotic input[type="number"]').val(""), $('#exotic input[type="hidden"]').remove(), $("#exotic-request").openModal(), $("#exotic-request").find(".exoPrice").attr("data-price", $(this).attr("data-value")), $("#exotic-request").find(".exoPrice").val($(this).attr("data-value")), $("#exotic-request").find(".exoQty").val("1"), $("#exotic-request").find(".full-width-button").before('<input type="hidden" name="pr" value="' + $(this).attr("data-pr") + '" /> ')
    }), $(document).delegate("#exotic", "submit", function (e) {
        e.preventDefault();
        var t = $(this),
            a = $(this).find(".full-width-button");
        a.attr("type", "button"), a.addClass("search-location-main"), a.html("<span>.</span><span>.</span><span>.</span>"), s(t.serialize(), "POST", t.attr("data-url")).done(function (e) {
            Materialize.toast(e.msg, 3e3), a.attr("type", "submit"), a.removeClass("search-location-main"), a.html(a.attr("data-name")), $("#exotic-request").closeModal()
        })
    }), $(".exoQty").on("keyup change", function (e) {
        e.preventDefault();
        var t = $(this).val();
        $(".exoPrice").val(t * $(".exoPrice").attr("data-price"))
    }), $(".exoticPincode").on("paste keyup change", function (e) {
        e.preventDefault();
        var t = $(this),
            a = $(this).val();
        6 == a.length && (isNaN(a) ? (t.val(""), $(".exoticPincodelabel").text("Only Numbers allowed")) : ($(".exoticPincodelabel").text("Pincode"), p || (p = !0, s({
            pin: a
        }, "POST", $(this).attr("data-url")).done(function (e) {
            "error" == e.result && (t.val(""), $(".exoticPincodelabel").text(e.pin), Materialize.toast("Your location is a mystery to our database. <br/>We'll solve this riddle soon. <br/>Stay hooked to our adventure!", 5e3)), p = !1
        }))))
    }), $(".exoticPincode").on("focusout", function (e) {
        e.preventDefault();
        var t = $(this),
            a = $(this).val();
        a.length < 6 && (t.val(""), $(".exoticPincodelabel").text("Pincode is required"))
    }), $(".loc-close-button").click(function () {
        $(".location-modal").closeModal()
    }), $(".location-header").click(function () {
        $(".loc-close-button ").removeClass("hide"), $(".location-modal").openModal({
            dismissible: !0,
            opacity: .85,
            inDuration: 300,
            outDuration: 200,
            startingTop: "30%",
            ready: function (e, t) {},
            complete: function () {}
        })
    }), $(".blog-next").click(function (e) {
        e.preventDefault(), ga("send", "event", "Home", "click", "Blog Post"), $next = $(".blog-post.active").next(".blog-post"), $(".blog-post").removeClass("active"), $next.length > 0 ? $next.addClass("active") : $(".blog-post").first().addClass("active")
    }), $(".blog-prev").click(function (e) {
        e.preventDefault(), $prev = $(".blog-post.active").prev(".blog-post"), $(".blog-post").removeClass("active"), $prev.length > 0 ? $prev.addClass("active") : $(".blog-post").last().addClass("active")
    }), setInterval(function () {
        $(".blog-next").trigger("click")
    }, 1e4), $("#walletContainer").on("click", "li", function (e) {
        $(this).addClass("active").siblings().removeClass("active")
    }), $(".CODTAB").on("click", function (e) {
        if (!$(this).hasClass("cod-disabled")) {
            $(".tab-verticle.CODTAB").removeClass("cod-disabled"), $(".tab-verticle.CODTAB").removeClass("wallet-text");
            $(".set-finalPay").data("val");
            if (1 == fn.codEligible) return void Materialize.toast(fn.codEligibleMsg, 3e3);
            $(".tab-verticle.CODTAB").removeClass("cod-disabled"), $(".wallet-switcher").css({
                opacity: "0.5",
                transition: "all 0.3s ease"
            });
            var t, a = $(".customAddressId").val(),
                o = $(".customDeliveryType").val(),
                r = $(".customDeliverySlot").val(),
                n = $(".customCpn").val();
            $(".wallet-select").hasClass("check-img") ? (t = "unset", $(".checkout-payment-btn").attr("disabled", "disabled").addClass("disabled-btn"), $(".lc-wallet-div").addClass("wallet-div"), s({
                type: t,
                addressId: a,
                deliveryType: o,
                deliverySlot: r,
                cpn: n
            }, "POST", $(".wallet-sw-ur").attr("data-url")).done(function (e) {
                "error" != e.result ? ($(".wallet-select").hasClass("check-img") ? ($(".wallet-select").attr("src", "http://www.licious.in/img/elements/uncheck.png").removeClass("check-img").addClass("uncheck-img").fadeIn(800), $("#lc-wallet-div").attr("data-wuse", "lc-wallet-n")) : ($(".wallet-select").attr("src", "http://www.licious.in/img/elements/check.png").removeClass("uncheck-img").addClass("check-img").fadeIn(800), $("#lc-wallet-div").attr("data-wuse", "lc-wallet-y")), $(".checkout-payment-btn").val("Pay Now Rs. " + e.amount), $(".citrusAmount").val(e.paisa), $("#lc-wallet-div").attr("data-lcpay", e.paisa), "0" == e.paisa ? ($("#payBtn").attr("type", "button"), $("#payBtn").addClass("onlyhogbucks")) : ($("#payBtn").attr("type", "submit"), $("#payBtn").removeClass("onlyhogbucks"))) : Materialize.toast(e.msg, 3e3), $(".lc-wallet-div").removeClass("wallet-div"), $(".checkout-payment-btn").removeAttr("disabled").removeClass("disabled-btn"), "zero" == e.type && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled")
            }).fail(function (e, t, a) {
                Materialize.toast("Request failed, Please refersh the page and try again", 3e3)
            })) : t = "set"
        }
    }), $(".payopt.online").on("click", function (e) {
        ga("send", "event", "Payment", "click", "Online"), $(".wallet-switcher").css({
            opacity: "1",
            transition: "all 0.3s ease"
        })
    }), $(".wallet-switcher").on("click", function (e) {
        if (ga("send", "event", "Licious Wallet", "click", "Select Licious Wallet"), $(".tab-verticle.CODTAB").hasClass("active")) Materialize.toast("LICIOUS WALLET NOT APPLICABLE FOR COD/CARD ON DELIVERY", 3e3), ga("send", "event", "Payment", "click", "Wallet Not Applicable For COD");
        else {
            $(".wallet-switcher").css({
                opacity: "0.5",
                transition: "all 0.3s ease"
            });
            var t, a = $(".customAddressId").val(),
                o = $(".customDeliveryType").val(),
                r = $(".customDeliverySlot").val(),
                n = $(".customCpn").val();
            $(".wallet-select").hasClass("check-img") ? (t = "unset", $(".tab-verticle.CODTAB").removeClass("cod-disabled"), $(".tab-verticle.CODTAB").removeClass("wallet-text")) : (t = "set", $(".tab-verticle.CODTAB").addClass("cod-disabled"), $(".tab-verticle.CODTAB").addClass("wallet-text")), $(".checkout-payment-btn").attr("disabled", "disabled").addClass("disabled-btn"), $(".lc-wallet-div").addClass("wallet-div"), s({
                type: t,
                addressId: a,
                deliveryType: o,
                deliverySlot: r,
                cpn: n
            }, "POST", $(".wallet-sw-ur").attr("data-url")).done(function (e) {
                "error" != e.result ? ($(".wallet-select").hasClass("check-img") ? ($(".wallet-select").attr("src", "http://www.licious.in/img/elements/uncheck.png").removeClass("check-img").addClass("uncheck-img").fadeIn(800), $("#lc-wallet-div").attr("data-wuse", "lc-wallet-n")) : ($(".wallet-select").attr("src", "http://www.licious.in/img/elements/check.png").removeClass("uncheck-img").addClass("check-img").fadeIn(800), $("#lc-wallet-div").attr("data-wuse", "lc-wallet-y")), $(".checkout-payment-btn").val("Pay Now Rs. " + e.amount), $(".citrusAmount").val(e.paisa), $("#lc-wallet-div").attr("data-lcpay", e.paisa), "0" == e.paisa ? ($("#payBtn").attr("type", "button"), $("#payBtn").addClass("onlyhogbucks")) : ($("#payBtn").attr("type", "submit"), $("#payBtn").removeClass("onlyhogbucks"))) : Materialize.toast(e.msg, 3e3), $(".lc-wallet-div").removeClass("wallet-div"), $(".checkout-payment-btn").removeAttr("disabled").removeClass("disabled-btn"), "zero" == e.type && $(".checkout-payment-btn:not(.cod)").attr("disabled", "disabled").addClass("disabled"), $(".wallet-switcher").css({
                    opacity: "1",
                    transition: "all 0.3s ease"
                })
            }).fail(function (e, t, a) {
                Materialize.toast("Request failed, Please refersh the page and try again", 3e3)
            })
        }
    }), $(".hogworks").click(function (e) {
        e.stopPropagation()
    }), $(".checkout-customer-addr-row").click(function (e) {
        e.preventDefault();
        var t = $(".checkout-payments-tab").find(".collapsible-header");
        t.hasClass("active") && t.trigger("click")
    }), $(".li-navigation").on("click", "li", function (e) {
        e.preventDefault(), $(this).toggleClass("active").siblings().removeClass("active")
    }), $(".slider").slider({
        full_width: !1,
        indicators: !1
    }), $("#location_pop,#slug_location_pop").keyup(function () {
        $(".landing-error,.location-error").addClass("hide"), $(".landing-location span").removeClass("hide")
    }), $(document.body).on("click", ".addresses", function (e) {
        e.stopPropagation(), ga("send", "event", "Address", "click", "Select Address");
        var t = this;
        s($(this).serialize(), "GET", $(this).attr("data-url")).done(function (e) {
            "error" == e.result ? ($(".reviewcart").attr("data-pin", e.pin), $(".change-address-alert").openModal({
                dismissible: !0,
                opacity: .85,
                inDuration: 300,
                outDuration: 200,
                startingTop: "30%",
                ready: function (e, t) {},
                complete: function () {}
            })) : ($(".checkout-address-check").addClass("hide"), $(".checkout-address-uncheck").removeClass("hide"), $(".addresses").removeClass("address-active"), $(".addresses").removeClass("address-active"), $(t).find('[name="address"]').prop("checked", !0), $(t).find(".checkout-address-uncheck").addClass("hide"), $(t).find(".checkout-address-check").removeClass("hide"), $(t).addClass("address-active"), $(".customAddressId").val($(t).find('[name="address"]').val()))
        })
    }), $(".express-non-exotic,.schedule-non-exotic").click(function () {
        $(".express-non-exotic-check,.schedule-non-exotic-check").addClass("hide"), $(".schedule-non-exotic-uncheck,.express-non-exotic-uncheck").removeClass("hide"), $(this).find("img").eq(1).removeClass("hide"), $(this).find("img").eq(0).addClass("hide"), $(this).hasClass("express-non-exotic") ? ($(".nonexotic-delivery-slots").addClass("hide"), $(this).find('input[type="radio"]').prop("checked", !0)) : ($(".nonexotic-delivery-slots").removeClass("hide"), $(this).find('input[type="radio"]').prop("checked", !0))
    }), $("#placesFormLanding,#slugFormLanding").bind("keypress", function (e) {
        if (13 == e.keyCode) return !1
    }), $(document).delegate("#deliveryslot", "change", function (e) {
        ga("send", "event", "Delivery", "click", "Delivery Slot Change"), $(".customDeliverySlot").val($(this).val())
    }), $(document).delegate("#exoticdeliveryslot", "change", function (e) {
        ga("send", "event", "Delivery", "click", "Exotic Delivery Slot Change");
        var t = $(this).val().toString(),
            a = t.split("~"),
            o = a[0],
            s = a[1];
        $("#exoticdate").val(o), $("#exoticslot").val(s)
    });
    var g = {
        Hyderabad: "Telengana",
        Bengaluru: "Karnataka",
        Gurugram: "Delhi"
    };
    $('#custoemrAddress [name="city"],#address-edit-city').change(function (e) {
        e.preventDefault(), e.stopPropagation(), $(this).is("#address-edit-city") ? $(".address-edit-state").val(g[$(this).val()]) : $('#custoemrAddress [name="state"]').val(g[$(this).val()])
    }), $('#custoemrProfileAddress [name="city"],#address-edit-city').change(function (e) {
        e.preventDefault(), e.stopPropagation(), $('#custoemrProfileAddress input[name="state"]').val(g[$(this).val()]), $('#customerAddressEdit input[name="state"]').val(g[$(this).val()])
    }), $(".check-step-1").click(u), $(".add-change-close").click(function (e) {
        $(".change-address-alert").closeModal()
    }), $(".signup").click(function () {
        ga("send", "event", "Authentication", "click", "Signup")
    }), $(".easycheckout").click(function () {
        ga("send", "event", "Authentication", "click", "Guest Checkout")
    }), $(".login").click(function () {
        ga("send", "event", "Authentication", "click", "Login")
    }), $(".logout").click(function () {
        ga("send", "event", "Authentication", "click", "Logout")
    }), $(".reviewcart").click(function (e) {
        e.preventDefault(), $(".reviewcart").html("Redirecting..."), s("", "GET", "/review-cart/" + $(".reviewcart").attr("data-pin")).done(function (e) {
            "success" == e.status ? (fn_sublocation.gaSublocation("SL-Address Alert - Review Cart", "Click", ""), location.reload()) : location.reload()
        })
    }), fn = {
        address: {
            editAddr: function () {
                $(".addresses-container").find(".address-edit").on("click", function (e) {
                    e.stopPropagation();
                    var t = this;
                    s("", "POST", "/user/edit-address/" + $(this).data("id")).done(function (e) {
                        if ("success" == e.result) {
                            var a = $("#customerAddressEdit");
                            a.find('input[name="line1"]').val(e.data.line1), a.find('input[name="line2"]').val(e.data.line2), a.find('input[name="lat"]').val(e.data.lat), a.find('input[name="lng"]').val(e.data.lng), a.find('select[name="city"]').val(e.data.city), a.find(".select-dropdown").val(e.data.city), a.find('input[name="state"]').val(e.data.state), a.find('input[name="pincode"]').val(e.data.pincode), a.find('input[name="mobile"]').val(e.data.contact), a.attr("data-id", $(t).data("id")), i(a.find(".pincode")), $(".customerAddrEdit-modal").openModal()
                        } else Materialize.toast("Network Problem, Please try again", 3e3)
                    })
                })
            },
            saveEditAddr: function () {
                $("#customerAddressEdit").submit(function (e) {
                    e.preventDefault(), ga("send", "event", "Address", "click", "Edit Address");
                    var t = $(this).find(".full-width-button");
                    t.addClass("animated flipInY search-location-main"), t.html("<span>.</span><span>.</span><span>.</span>"), s($(this).serialize(), "POST", "/user/edit-address-post/" + $(this).attr("data-id")).done(function (e) {
                        if ("error" == e.result) Materialize.toast("Network Error, Please try again", 3e3);
                        else {
                            var a = $('input[type="radio"][value="' + e.id + '"]').closest(".addresses"),
                                o = a;
                            o.find(".address-line1").text(e.data.line1), o.find(".address-line2").text(e.data.line2), a.find(".address-MobNo").html("<span>MOBILE NUMBER : </span> " + e.data.contact), $('input[type="radio"][value="' + e.id + '"]').prop("checked", !0), $(".customAddressId").val(e.id);
                            var s = $('button[data-id="' + e.id + '"]').parent().prev();
                            $(s).html('<b style="color:black">' + e.data.line1 + "</b><br><label>" + e.data.line1 + "</label><br/><label>" + e.data.city + " - " + e.data.pincode + ", " + e.data.state + "</label>")
                        }
                        t.removeClass("search-location-main animated flipInY"), t.html("UPDATE"), $(".customerAddrEdit-modal").closeModal()
                    })
                })
            },
            deleteAddr: function () {
                $(".addresses-container").delegate(".address-delete", "click", function (e) {
                    e.stopPropagation();
                    var t = this;
                    s("", "POST", $(this).attr("data-url")).done(function (e) {
                        "success" == e.result ? ($(t).closest(".addresses").remove(), $(t).closest(".addr-container").remove(), Materialize.toast("Address deleted", 3e3)) : Materialize.toast("Network Problem, Please try again", 3e3)
                    })
                })
            },
            run: function () {
                fn.address.editAddr(), fn.address.saveEditAddr(), fn.address.deleteAddr()
            }
        },
        pincode: {
            flag: !1,
            validate: function (e) {
                return s({
                    pin: $(e).val()
                }, "POST", $(e).attr("data-url")).done(function (t) {
                    "error" == t.result ? ($(e).val(""), $(".pincode-error").html(t.msg), $(".cust-new-addr-btn").addClass("btn-default").attr("type", "button"), fn.pincode.flag = !0) : ($(".pincode-error").html(""), $(".cust-new-addr-btn").addClass("address-validated"), $(".cust-new-addr-btn").addClass("address-validated"), $(".cust-new-addr-btn").removeClass("btn-default").attr("type", "submit"), fn.pincode.flag = !1)
                }), fn.pincode.flag
            }
        },
        checkout: {
            validateCheckout: function () {
                $(".lec-btn-prodeed-pay-tab").click(function (e) {
                    if (e.preventDefault(), "" == $(".customAddressId").val()) Materialize.toast("Please select delivery address", 3e3);
                    else {
                        if ("later" == $(".customDeliveryType").val() && "" == $(".customDeliverySlot").val()) return Materialize.toast("Please select delivery Slot", 3e3), !1;
                        if (ga("send", "event", "Order Summary", "click", "Proceed To Payment"), $(".lec-btn-prodeed-pay-tab").hasClass("exotic")) {
                            var t = $(".lec-btn-prodeed-pay-tab").html();
                            "" == $("#exoticdate").val() ? Materialize.toast("Please select Exotic delivery Slot", 3e3) : ($(".lec-btn-prodeed-pay-tab").html("Processing..."), s({
                                slotEx: $("#exoticslot").val(),
                                dateEx: $("#exoticdate").val()
                            }, "POST", $(".delivery-slot-row-exotic").attr("data-url")).done(function (e) {
                                $('.check-step[data-type="payment"]').removeClass("inactive-checkout"), $(".checkout-tab").removeClass("active animated fadeIn"), $(".checkout-tab.payment").addClass("active animated fadeIn"), c($(".check-step-2 .checkout-number")), $("html, body").animate({
                                    scrollTop: 0
                                }, 600), $(".check-step-3").click(u), $(".lec-btn-prodeed-pay-tab").html(t)
                            }))
                        } else $('.check-step[data-type="payment"]').removeClass("inactive-checkout"), $(".checkout-tab").removeClass("active animated fadeIn"), $(".checkout-tab.payment").addClass("active animated fadeIn"), c($(".check-step-2 .checkout-number")), $("html, body").animate({
                            scrollTop: 0
                        }, 600), $(".check-step-3").click(u)
                    }
                    return !1
                })
            },
            "continue": function () {
                $(".lec-btn-prodeed-payment").on("click", function (e) {
                    e.preventDefault(), e.stopImmediatePropagation(), $(this).html("Processing Your Request..");
                    s($(this).serialize(), "GET", "/cart/lockstock").done(function (e) {
                        "error" == e.result ? (Materialize.toast("Some items went out of stock..", 3e3), location.reload(), $(".lec-btn-prodeed-payment").html("Checkout")) : (l(), $(".checkout-li").removeClass("active"), c($(".check-step-1 .checkout-number")), $('.check-step[data-type="address"]').removeClass("inactive-checkout"), $(".checkout-tab").removeClass("active animated fadeIn"), $(".checkout-tab.address").addClass("active animated fadeIn"), $(".check-step-1").removeClass("lock"), $("html, body").animate({
                            scrollTop: 0
                        }, 600), $(".lec-btn-prodeed-payment").html("Checkout"), ga("send", "event", "Checkout", "click", "Proceed To Checkout"), $(".check-step-2").click(u))
                    })
                })
            },
            guest_continue: function () {
                $(".checkout-customer-addr-row").click(function () {
                    var e = $(".add_msg_div").data("msg");
                    if (1 == e) {
                        var t = $(".checkout-customer-addr-row").find(".collapsible-header");
                        if (!t.hasClass("active")) return Materialize.toast("To order only eggs, add another pack", 3e3), !1;
                        t.trigger("click")
                    }
                })
            },
            g_check: 0,
            initGuestCheckout: function () {
                $(".lec-btn-prodeed-address").click(function (e) {
                    e.preventDefault(), $(".order-summary").find(".collapsible-header").trigger("click");
                    var t = $(".checkout-customer-addr-row").find(".collapsible-header");
                    t.trigger("click"), fn.checkout.g_check = 1
                })
            },
            guest_info: {
                name: "",
                email: "",
                phone: ""
            },
            guest_pincode: function () {
                $(".guest_pincode").on("change", function (e) {
                    fn.pincode.validate($(this))
                })
            },
            get_guest_info: function () {
                var e = $(".customer_key_value").data("custkey"),
                    t = $(".get-guest-info").data("url");
                r({}, "GET", t + "/" + e).done(function (e) {
                    fn.checkout.guest_info.name = e.data.name, fn.checkout.guest_info.email = e.data.email, fn.checkout.guest_info.phone = e.data.phone
                }).fail(function (e) {})
            },
            set_guest_info: function () {
                var e = $(".customer_key_value").data("custkey"),
                    t = $(".set-guest-info").data("url"),
                    a = $(".guest_name").val(),
                    o = $(".guest_email").val(),
                    s = $(".guest_phone").val(),
                    n = $(".guest_login_error"),
                    i = $(".guest_url_redirect").data("url"),
                    l = /^[A-z ]+$/,
                    d = /^\d{10}$/,
                    c = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                "" == a || "" == o || "" == s ? n.html("All Fields are mandatory, Please provide all the details") : !s.match(d) || s.length < 10 ? n.html("Please provide valid phone number") : s.charAt(0) < 6 ? n.html("phone number should start with 6/7/8/9") : o.match(c) ? 0 == l.test(a) ? n.html("Name can not contain numbers and special characters") : (n.html(""), r({
                    customer_key: e,
                    name: a,
                    email: o,
                    phone: s
                }, "GET", t).done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status ? window.location.href = i : Materialize.toast("Something went wrong, Please retry", 3e3)
                })) : n.html("Please provide valid email")
            },
            validateGuestCheckout: function () {
                $(".lec-gst-btn-prodeed-pay-tab").click(function (e) {
                    e.preventDefault();
                    var t = $(".guest-form"),
                        a = t.find(".addr-line1").val(),
                        o = t.find(".addr-line2").val(),
                        s = t.find(".city").val(),
                        n = t.find(".state").val(),
                        i = t.find(".guest_pincode").val(),
                        l = $(".lec-gst-btn-prodeed-pay-tab"),
                        d = $("#exoticdate").val(),
                        c = $(".set-exotic-slot").data("url"),
                        u = $(".set-guest-addr").data("url"),
                        p = $(".customer_key_value").data("custkey");
                    return "" == a || "" == o || "" == s || "" == n || "" == i ? Materialize.toast("Please fill in delivery address details", 3e3) : l.hasClass("exotic") ? "" == d ? Materialize.toast("Please select Exotic delivery Slot", 3e3) : r({
                        slotEx: $("#exoticslot").val(),
                        dateEx: $("#exoticdate").val()
                    }, "POST", c).done(function (e) {
                        r({
                            customer_key: p,
                            name: fn.checkout.guest_info.name,
                            email: fn.checkout.guest_info.email,
                            phone: fn.checkout.guest_info.phone,
                            line1: a,
                            line2: o,
                            pincode: i,
                            city: s,
                            state: n,
                            lat: $('input[name="lat"]').val(),
                            lng: $('input[name="lng"]').val()
                        }, "POST", u).done(function (e) {
                            $(".checkout-customer-addr-row").find(".collapsible-header").trigger("click");
                            var t = $(".checkout-payments-tab").find(".collapsible-header");
                            t.hasClass("active") || t.trigger("click")
                        })
                    }) : r({
                        customer_key: p,
                        name: fn.checkout.guest_info.name,
                        email: fn.checkout.guest_info.email,
                        phone: fn.checkout.guest_info.phone,
                        line1: a,
                        line2: o,
                        pincode: i,
                        city: s,
                        state: n,
                        lat: $('input[name="lat"]').val(),
                        lng: $('input[name="lng"]').val()
                    }, "POST", u).done(function (e) {
                        $(".checkout-customer-addr-row").find(".collapsible-header").trigger("click");
                        var t = $(".checkout-payments-tab").find(".collapsible-header");
                        t.hasClass("active") || t.trigger("click")
                    }), !1
                })
            },
            run: function () {
                fn.checkout.validateCheckout(), fn.checkout.initGuestCheckout(), fn.checkout.validateGuestCheckout(), fn.checkout.guest_pincode(), fn.checkout["continue"](), fn.checkout.guest_continue()
            }
        },
        user: {
            lictabs: function () {
                $(".lw-tabs li").click(function () {
                    var e = $(this).attr("data-div");
                    $(".lw-tabs li").removeClass("active"), $(this).addClass("active"), "info" == e ? ($(".tab-div").hide(), $(".info").show()) : ($(".tab-div").hide(), $(".trnc-history").show())
                })
            },
            licTrHis: function () {
                $(".lw-tabs .tr-hist").click(function () {
                    $(".trans-list").html("<li>Processing....</li>"), $.ajax({
                        data: {
                            customer_key: $(".customer_key").val()
                        },
                        type: "GET",
                        url: $(".trns-hist-api").attr("data-url"),
                        headers: {
                            token: $(".cust_token").val()
                        }
                    }).done(function (e) {
                        $(".trans-list").html(""), $.map(e.data, function (e) {
                            class_name = "Debited" == e.type ? "debit" : "credit";
                            var t = e.date.split(" ");
                            f_date = new Date(t[0]), newDate = f_date.toDateString(), newDate = newDate.split(" "), newDate = newDate[2] + " " + newDate[1] + " " + newDate[3];
                            var a = '<li><div class = "date"><h4>' + newDate + "</h4><p>" + e.reason + '</p></div><div class = "' + class_name + '"><p>' + e.type + "</p><h4>Cash: <span> " + e.licious_cash + " </span> Cash+: <span>" + e.licious_cashp + "</span></h4></div></li>";
                            $(".trans-list").append(a)
                        })
                    })
                })
            },
            run: function () {
                fn.user.lictabs(), fn.user.licTrHis()
            }
        },
        add_message: {
            close: function () {
                $(".add_message span").click(function () {
                    $(".add_message").removeClass("fadeInUp"), $(".add_message").addClass("fadeOutDown")
                })
            }
        },
        checkout_oos: {
            page: window.location.href,
            order_page: "order-summary",
            delivery_page: "delivery-info",
            summary_page: "delivery-summary",
            payment_page: "payment",
            city_state_map: {
                Hyderabad: "Telangana",
                Bengaluru: "Karnataka",
                Bangalore: "Karnataka"
            },
            city_id_map: {
                Hyderabad: 2,
                Bengaluru: 1,
                Bangalore: 1
            },
            localAddr: {},
            offeredProducts: function () {
                fn.checkout_oos.ajaxForm({}, "GET", "/checkout_oos/offered-products").done(function (e) {
                    if (e = JSON.parse(e), "success" == e.status) {
                        var t, a;
                        ! function () {
                            var o = function (e, t, a, o) {
                                return "percentage" == a ? Math.round(e - e * t / 100) : "flat" == a ? Math.round(e - t) : "nooffer" == a && o > 0 ? Math.round(e - e * o / 100) : e
                            };
                            t = " " + e.title + " ", $(".crossel-wrap .heading").html(t), $(".crossel-products").html(""), a = " " + e.delivery_free_message + " ", $(".freedelivery-wrapper .freedelivery-text").html(a), $.each(e.data, function (e, t) {
                                var a, s, r = "flat" == t.crosssell.type ? "show" : "hide",
                                    n = "flat" != t.crosssell.type ? "show" : "hide",
                                    i = "delivery" == t.crosssell.type || "nooffer" == t.crosssell.type ? "hide" : "show",
                                    l = "nooffer" == t.crosssell.type ? "hide" : "show",
                                    d = "nooffer" == t.crosssell.type && t.base_discount > 0 ? "show" : "hide",
                                    c = "nooffer" == t.crosssell.type && t.base_discount > 0 ? "hide" : "show";
                                s = "" == t.pieces ? t.net : t.pieces + " Pieces", "percentage" == t.crosssell.type ? a = t.crosssell.value + " %Off" : "delivery" == t.crosssell.type ? a = "Free Delivery" : "flat" == t.crosssell.type ? a = t.crosssell.value + " Off" : "nooffer" == t.crosssell.type && t.base_discount > 0 && (a = t.base_discount + " %Off");
                                var u = '<li class = "csid-' + t.crosssell.parent_product_id + " productid-" + t.crosssell.product_id + '"><div class = "product-img"><img src=" ' + t.pr_image + ' " alt="Image name"><span class = "discount-label ' + d + '">' + a + '</span><span class = "discount-label ' + l + " " + n + '">' + a + '</span><span class = "discount-label rupee ' + r + '">' + a + '</span></div><div class="product-name">' + t.merchandise_name + '</div><div class = "product-pricing disc ' + c + '" ><div class = "pricing discount"><span class = "rupee ' + i + '">' + t.base_price + '</span><span class = "text-red discount rupee ">' + o(t.base_price, t.crosssell.value, t.crosssell.type) + '</span></div><div class = "weight">' + s + '</div></div><div class = "product-pricing disc ' + d + '" ><div class = "pricing discount"><span class = "rupee ">' + t.base_price + '</span><span class = "text-red discount rupee ">' + o(t.base_price, t.crosssell.value, t.crosssell.type, t.base_discount) + '</span></div><div class = "weight">' + s + '</div></div><div class = "product-cta"><button class = "btn" data-prid = ' + t.crosssell.product_id + " data-crosssellid = " + t.crosssell.id + " data-offertype = " + t.crosssell.type + ' data-prname = "' + t.merchandise_name + '" data-baseprice = ' + o(t.base_price, t.crosssell.value, t.crosssell.type, t.base_discount) + ">Add</button></div></li>";
                                $(".crossel-products").append(u), $(".crossel-wrap").show()
                            }), fn.checkout_oos.addCartItem()
                        }()
                    } else $(".order-summary .crossel-wrap").hide()
                }).always(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status
                })
            },
            cartCount: function () {
                fn.checkout_oos.ajaxForm({}, "GET", "/checkout_oos/cart-count").done(function (e) {
                    e = JSON.parse(e), "success" == e.status && (e.data > 0 && $(".cart i").html() && e.data != $(".cart i").html() ? ($(".cart i").html(e.data), $(".cart").addClass("loaded"), (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && fn_home.quickCheckout()) : 0 === e.data && ($(".cart i").html("0"), $(".cart").removeClass("loaded"), $(".quick-checkout.fade-in").length && (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && ($(".slots-layout").removeClass("fade-in"), $(".slot-detials").removeClass("fade-in"), $("#slotAction").html("View"), $(".background-div").removeClass("dull-background"), $(".quick-checkout").removeClass("fade-in"), $(".quick-checkout .payment").removeClass("hide-class"), window.location.href.includes("/past-orders") && location.reload())))
                })
            },
            setTotalbar: function () {
                $(window).on("scroll load resize", function () {
                    var e = document.querySelector(".total-wrapper");
                    e.offsetTop + 65 > window.innerHeight + $(window).scrollTop() ? $(".total-wrapper").find(".fix-div").addClass("fixed") : $(".total-wrapper").find(".fix-div").removeClass("fixed")
                })
            },
            changeAddress: function () {
                $(".delivery-addr").find(".change-addr").click(function () {
                    $(".page-holder").find(".addr-container").show(), $(".page-holder").find(".change-addr").hide(), $(".page-holder").find(".close-change-addr").show(), fn.checkout_oos.closeChangeAddress()
                })
            },
            closeChangeAddress: function () {
                $(".delivery-addr").find(".close-change-addr").click(function () {
                    $(".page-holder").find(".close-change-addr").hide(), $(".page-holder").find(".change-addr").show(), $(".page-holder").find(".addr-container").hide()
                })
            },
            selectAddress: function () {
                $(".addr-holder .addr").on("click", function (e) {
                    function t(e) {
                        fn.checkout_oos.showAlert(e, "change", "addr"), fn.checkout_oos.updateCartLocation(r, n, i), fn.checkout_oos.changeAddressAlert(), $(".pages.delivery-details").removeClass("loader-div complete"), l.css("opacity", "1"), l.prop("disabled", !1), localStorage.setItem("default_addr_id", o)
                    }
                    e.stopImmediatePropagation();
                    var a = $(this).find(".this-addr").html(),
                        o = $(this).data("addrid"),
                        s = $(this).data("pin"),
                        r = $(this).data("lat"),
                        n = $(this).data("lng"),
                        i = ($(".selected-addr").html(), $(this).data("city")),
                        l = $(this);
                    fn.checkout_oos.verifyService(r, n).done(function (e) {
                        var d = JSON.parse(e);
                        "LOCATION_CHANGED" == d.status ? t(d.message) : "SERVICABLE" == d.status && null != d.data ? fn.checkout_oos.ajaxForm({
                            location: d.data.address,
                            lat: d.data.lat,
                            lng: d.data.lng,
                            clearcart: "false"
                        }, "POST", "/get-location").done(function (e) {
                            "success" == e.result ? ($(".location-name").html(d.data.address), $(".location-name").attr("title", d.data.address), fn.checkout_oos.hideAlert(), fn.checkout_oos.reLockOrder(), $(".delivery-details").find(".delivery-option ").show(), $(".checkout-shipment-summary").prop("disabled", !1), $(".checkout-shipment-summary").removeClass("disabled"), $(".addr-container").find(".oos-alert").hide(), $(".addr-holder").find(".addr").removeClass("selected"), l.addClass("selected"), localStorage.setItem("hub_id", d.data.hub_id), $(".delivery-addr").find(".selected-addr").html(a.replace("<br>", " ")), localStorage.setItem("default_addr", a.replace("<br>", " ")), localStorage.setItem("default_addr_id", o), localStorage.setItem("default_addr_lat", r), localStorage.setItem("default_addr_lng", n), localStorage.setItem("city_name", i)) : (fn.checkout_oos.showAlert(e.msg, "dismiss", "addr"), fn.checkout_oos.closeLocationAlert())
                        }) : "ERROR" == d.status || "error" == d.status ? (fn.checkout_oos.showAlert(d.message, "dismiss", "addr"), fn.checkout_oos.closeLocationAlert()) : ($(".set-pincode").data("val", s), $(".addr-holder").find(".addr").removeClass("selected"), l.addClass("selected"), $(".delivery-summary").find("." + o).addClass("selected"), $(".customAddressId").val(o), $(".delivery-addr").find(".selected-addr").html(a.replace("<br>", " ")), localStorage.setItem("default_addr", a.replace("<br>", " ")), localStorage.setItem("default_addr_id", o), localStorage.setItem("default_addr_lat", r), localStorage.setItem("default_addr_lng", n))
                    })
                })
            },
            closeLocationAlert: function () {
                $(".alert-cta .change-address").on("click", function () {
                    $(".alert-screen").hide(), fn_sublocation.gaSublocation("SL-Address Alert - Change Address", "Click", "")
                })
            },
            changeAddressAlert: function () {
                $(".alert-cta .change-address").on("click", function (e) {
                    e.stopImmediatePropagation(), $(".alert-screen").hide(), $(".delivery-addr").find(".change-addr").hide(), $(".delivery-addr").find(".close-change-addr").show(), $(".delivery-addr").find(".addr-container").show(), fn_sublocation.gaSublocation("SL-Address Alert - Change Address", "Click", "")
                })
            },
            updateCartLocation: function (e, t, a) {
                $(".alert-cta .review-cart").on("click", function (o) {
                    o.stopImmediatePropagation(), fn_sublocation.gaSublocation("SL-Address Alert - Review Cart", "Click", ""), fn.checkout_oos.updateCartLocationApi(e, t).done(function (e) {
                        var t = JSON.parse(e);
                        "LOCATION_CHANGED" == t.status || "SERVICABLE" == t.status ? fn.checkout_oos.ajaxForm({
                            location: t.data.address,
                            lat: t.data.lat,
                            lng: t.data.lng,
                            clearcart: "false"
                        }, "POST", "/get-location").done(function (e) {
                            "success" == e.result && ($(".location-name").html(t.data.address), fn.checkout_oos.navigate(fn.checkout_oos.order_page), fn.checkout_oos.hideAlert(), localStorage.setItem("hub_id", t.data.hub_id), localStorage.setItem("city_name", a))
                        }) : (fn.checkout_oos.hideAlert(), fn.checkout_oos.navigate(fn.checkout_oos.order_page))
                    })
                })
            },
            gotoCart: function () {
                $(".goto-cart").on("click", function () {
                    fn.checkout_oos.navigate(fn.checkout_oos.order_page), $(".alert-screen").hide(), fn_sublocation.gaSublocation("SL-Address Alert - Review Cart", "Click", "")
                })
            },
            dismissAlert: function () {
                $(".dismiss").on("click", function () {
                    $(".alert-screen").hide()
                })
            },
            updateCartLocationApi: function (e, t) {
                var a = "/checkout_oos/update-cart-location";
                return fn.checkout_oos.ajaxForm({
                    lat: e,
                    lng: t
                }, "POST", a)
            },
            verifyAddr: function (e) {
                var t = "/checkout_oos/change-addr/" + e;
                return fn.checkout_oos.ajaxForm({}, "POST", t)
            },
            verifyService: function (e, t) {
                var a = "/checkout_oos/change-address";
                return fn.checkout_oos.ajaxForm({
                    lat: e,
                    lng: t
                }, "POST", a)
            },
            getCities: function (e) {
                fn.checkout_oos.ajaxForm("", "GET", "/checkout_oos/get-addr-cities").done(function (t) {
                    var a = JSON.parse(t);
                    if ("success" == a.status) {
                        switch ($(".add-addr-pop").find(".addr-city").val(a.data.city_name), $(".add-addr-pop").find(".addr-state").val(a.data.state), localStorage.setItem("city_id", a.data.city_id), e) {
                            case "edit":
                                fn.checkout_oos.showAddrPopup("edit"), fn.checkout_oos.hideAddrPopup();
                                break;
                            case "add-guest":
                                fn.checkout_oos.showAddrPopup("create-new");
                                break;
                            case "add":
                                fn.checkout_oos.showAddrPopup("add-new-addr");
                                break;
                            case "add-one":
                                fn.checkout_oos.validateAddrForm("save"), fn.checkout_oos.showAddrPopup("add-new")
                        }
                        1 === a.data.sub_location ? ($(".ui.dropdown").show(), $(".addr-line2").hide(), fn.checkout_oos.getLocality(a.data.city_id)) : ($(".ui.dropdown").hide(), $(".addr-line2").show())
                    }
                })
            },
            getLocality: function (e) {
                fn.checkout_oos.ajaxForm({
                    city_id: e
                }, "POST", "/checkout_oos/get-addr-locality").done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status && ($(".ui.dropdown").show(), $('input[type="text"].addr-line2').hide(), $(".dropdown").find(".menu").html(""), $.map(t.data, function (e) {
                        var t = '<div class="item" data-value="' + e.sublocation + '"></i>' + e.sublocation + "</div>";
                        $(".dropdown").find(".menu").append(t)
                    }))
                })
            },
            fetchAddrs: function (e) {
                $(".delivery-addr").find(".address-container").removeClass("reset"), $(".delivery-addr").find(".add-addr-screen").hide();
                var t = $(".user_type").data("val");
                fn.checkout_oos.ajaxForm("", "GET", "/checkout_oos/get-addr").done(function (a) {
                    var o = JSON.parse(a);
                    if ("success" == o.status) {
                        $(".addr-container .user-name").val();
                        $(".addr-container").find(".addr-holder").html("");
                        var s = 'Your <span class="text-red">Delivery Address</span> is<div class = "selected-addr"></div><div class = "change-addr text-red">Change My Address</div><div class = "close-change-addr text-red">Collapse</div>',
                            r = 'Your <span class="text-red">Delivery Address</span> is<div class = "selected-addr"></div>';
                        "save" == e ? ($(".delivery-details .delivery-addr .oos-header.addr-header").html(s), $(".delivery-summary .delivery-addr .oos-header.addr-header").html(r), $(".delivery-addr").find(".change-addr").show(), $(".delivery-addr").find(".close-change-addr").hide()) : ($(".delivery-details .delivery-addr .oos-header.addr-header").html(s), $(".delivery-summary .delivery-addr .oos-header.addr-header").html(r), $(".delivery-addr").find(".change-addr").show(), $(".delivery-addr").find(".close-change-addr").hide());
                        var n = localStorage.getItem("default_addr_id"),
                            i = localStorage.getItem("hub_id"),
                            l = !1;
                        $.map(o.address, function (t, a) {
                            var o = "";
                            "save" == e ? 0 == a && i == t.hub_id ? (o = "selected", $(".customAddressId").val(t.address_id), $(".set-pincode").data("val", t.pincode), $(".selected-addr").html(t.line1 + " " + t.line2 + " " + t.city + " " + t.state + "," + t.pincode), localStorage.setItem("default_addr", t.line1 + " " + t.line2 + " " + t.city + " " + t.state + "," + t.pincode), localStorage.setItem("default_addr_id", t.address_id), localStorage.setItem("default_pin", t.pincode), localStorage.setItem("default_addr_lat", t.lat), localStorage.setItem("default_addr_lng", t.lng), l = !0) : o = "" : null == n || "" == n ? 0 == a && i == t.hub_id ? (o = "selected", $(".customAddressId").val(t.address_id), $(".set-pincode").data("val", t.pincode), $(".selected-addr").html(t.line1 + " " + t.line2 + " " + t.city + " " + t.state + "," + t.pincode), localStorage.setItem("default_addr", t.line1 + " " + t.line2 + " " + t.city + " " + t.state + "," + t.pincode), localStorage.setItem("default_addr_id", t.address_id), localStorage.setItem("default_pin", t.pincode), localStorage.setItem("default_addr_lat", t.lat), localStorage.setItem("default_addr_lng", t.lng), l = !0) : o = "" : n == t.address_id && i == t.hub_id ? (o = "selected", $(".customAddressId").val(t.address_id), $(".set-pincode").data("val", t.pincode), $(".selected-addr").html(t.line1 + " " + t.line2 + " " + t.city + " " + t.state + "," + t.pincode), localStorage.setItem("default_addr", t.line1 + " " + t.line2 + " " + t.city + " " + t.state + "," + t.pincode), localStorage.setItem("default_addr_id", t.address_id), localStorage.setItem("default_pin", t.pincode), localStorage.setItem("default_addr_lat", t.lat), localStorage.setItem("default_addr_lng", t.lng), l = !0) : o = "";
                            var s = '<div class = "addr ' + t.address_id + " " + o + '" data-addrid="' + t.address_id + '" data-pin="' + t.pincode + '" data-lat="' + t.lat + '" data-lng="' + t.lng + '" data-city="' + t.city + '"><div class="select-addr"><span></span></div><div class="addr-details"><h5>' + t.line1 + '</h5><p class = "this-addr">' + t.line2 + '</p><p class = "this-landmark">' + (null != t.landmark ? t.landmark : "") + '</p><p class = "this-city">' + t.city + "</p><p><span>Mobile Number:</span>" + t.contact + '</p></div><div class = "addr-actions"><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/edit.png"alt="Edit Addr" class = "edit-addr" data-clickname="checkout" data-addrid = ' + t.address_id + '><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/delete-icon2.png"alt="Delete Addr" class = "delete-addr" data-addrid = ' + t.address_id + "></div></div>";
                            $(".addr-container").find(".addr-holder").append(s)
                        }), l ? (fn.checkout_oos.reLockOrder(), $(".delivery-details").find(".delivery-option ").show(), $(".checkout-shipment-summary").prop("disabled", !1), $(".checkout-shipment-summary").removeClass("disabled"), $(".addr-container").find(".oos-alert").hide()) : ($(".page-holder").find(".addr-container").show(), $(".delivery-addr").find(".change-addr").hide(), $(".delivery-addr").find(".close-change-addr").show(), $(".delivery-details").find(".delivery-option ").hide(), $(".checkout-shipment-summary").prop("disabled", !0), $(".checkout-shipment-summary").addClass("disabled"), $(".addr-container").find(".oos-alert").show())
                    } else if ("error" == o.status && "guest" == t) {
                        var d = localStorage.getItem("default_addr");
                        null == d || "" == d ? ($(".delivery-addr").find(".change-addr").hide(), $(".page-holder").find(".address-container").addClass("reset"), $(".page-holder").find(".address-container").removeClass("create-new"), $(".page-holder").find(".address-container").removeClass("add-new"), $(".page-holder").find(".address-container").removeClass("edit"), $(".page-holder").find(".address-container").addClass("create-new"), $(".page-holder").find(".add-addr-screen").show(), $(".delivery-addr .oos-header").html('Add <span class="text-red">new address</span>'), fn.checkout_oos.validateAddrForm("save"), fn.checkout_oos.changeCity(), fn.checkout_oos.validateNumbers()) : ($(".delivery-addr").find(".address-container").removeClass("reset"), $(".delivery-addr").find(".add-addr-screen").hide())
                    } else "error" == o.status && "auth" == t && ($(".page-holder").find(".address-container").addClass("reset"), $(".delivery-addr").find(".change-addr").hide(), $(".delivery-addr").find(".close-change-addr").show(), $(".page-holder").find(".address-container").removeClass("create-new"), $(".page-holder").find(".address-container").removeClass("add-new"), $(".page-holder").find(".address-container").removeClass("edit"), $(".page-holder").find(".address-container").addClass("add-new-addr"), $(".page-holder").find(".add-addr-screen").show(), $(".delivery-addr .oos-header").html('Add <span class="text-red">new address</span>'), fn.checkout_oos.validateAddrForm("save"), fn.checkout_oos.changeCity(), fn.checkout_oos.validateNumbers());
                    fn.checkout_oos.editAddr(), fn.checkout_oos.deleteAddr(), fn.checkout_oos.changeAddress(), fn.checkout_oos.closeChangeAddress(), fn.checkout_oos.selectAddress(), fn.checkout_oos.validateAddrForm("save")
                })
            },
            getAddr: function (e) {
                fn.checkout_oos.ajaxForm("", "POST", "/checkout_oos/get-addrs/" + e).done(function (t) {
                    var a = JSON.parse(t);
                    if ("success" == a.status) {
                        var o = $(".address-container");
                        o.attr("data-addrid", e), o.find(".newlocation").val(a.data.line1), o.find(".flataddress").val(a.data.line2), o.find(".newlocation").attr("data-latlng", JSON.stringify({
                            lat: a.data.lat,
                            lng: a.data.lng
                        })), o.find(".addresscity").val(a.data.city), o.find(".mobileno").val(a.data.contact), o.find(".addlandmark").val(a.data.landmark), fn.checkout_oos.showAddrPopup("edit"), fn.checkout_oos.hideAddrPopup();
                        var s = {
                                lat: a.data.lat,
                                lng: a.data.lng
                            },
                            r = new google.maps.LatLng(s.lat, s.lng);
                        map.panTo(r), marker.setPosition(r), map.panBy(263, 0)
                    } else Materialize.toast("Network Problem, Please try again", 3e3)
                })
            },
            deleteAddr: function (e) {
                $(".delete-addr").on("click", function (t) {
                    t.stopImmediatePropagation();
                    var a = $(this).data("addrid");
                    fn.checkout_oos.ajaxForm("", "POST", "/checkout_oos/delete-addr/" + a).done(function (t) {
                        var o = JSON.parse(t);
                        "success" == o.status ? ($(".addr-holder").find("." + a).remove(), $(".selected-addr").html(""), Materialize.toast("Address was deleted", 3e3), "profile" == e && fn.checkout_oos.renderProfileAddr(), fn.checkout_oos.fetchAddrs()) : Materialize.toast("Network Problem, Please try again", 3e3)
                    })
                })
            },
            validatePincode: function (e, t) {
                var a = "/checkout_oos/pincode-validate/" + e + "/" + t;
                s({}, "POST", a).done(function (e) {
                    var t = JSON.parse(e);
                    "error" == t.status ? ($(".add-addr-pop").find(".pincode").addClass("invalid"), $(".add-addr-pop").find(".pincode input").val("").focus()) : $(".add-addr-pop").find(".pincode").removeClass("invalid")
                })
            },
            validateAddrForm: function (e) {
                $(".address-container").find('input[name="addr-line2"]').each(function (e, t) {
                    $(t).on("change", function () {
                        var e = $(this).val();
                        $(".address-container").find(".addr-line2").each(function (t, a) {
                            $(a).attr("value", e)
                        })
                    })
                }), $(".addr-cta .btn.send").on("click", function (e) {
                    e.stopImmediatePropagation();
                    var t = $(this).data("type"),
                        a = $(".address-container"),
                        o = a.find(".pincode").val(),
                        s = a.find(".mobileno").val(),
                        r = a.find(".newlocation").val(),
                        n = a.find(".flataddress").val(),
                        i = a.find(".addlandmark").val(),
                        l = a.find(".addresscity").val(),
                        d = a.find(".state").val(),
                        c = a.attr("data-addrid"),
                        u = a.find(".emailnew").val(),
                        p = a.find(".fullnamenew").val(),
                        m = JSON.parse(a.find(".newlocation").attr("data-latlng")),
                        h = !1,
                        f = {
                            addr_1: {
                                val: n
                            },
                            addr_2: {
                                val: r
                            },
                            city: {
                                val: l
                            },
                            state: {
                                val: d
                            },
                            pincode: {
                                val: o
                            },
                            mobile: {
                                val: s
                            },
                            lat: {
                                val: m.lat
                            },
                            lng: {
                                val: m.lng
                            },
                            landmark: {
                                val: i
                            },
                            email: {
                                val: u
                            },
                            fullname: {
                                val: p
                            }
                        };
                    if ($.each(f, function (e, t) {
                            if ("" == t.val) {
                                switch (e) {
                                    case "addr_2":
                                        "" == t.val ? (a.find(".required, .pincode, .mobile").removeClass("error"), a.find(".newlocation").parent().addClass("error")) : a.find(".newlocation").parent().removeClass("error");
                                        break;
                                    case "addr_1":
                                        "" == t.val ? (a.find(".required, .pincode, .mobile").removeClass("error"), a.find(".flataddress").parent().addClass("error")) : a.find(".flataddress").parent().removeClass("error");
                                        break;
                                    case "city":
                                        "" == t.val ? (a.find(".required, .pincode, .mobile").removeClass("error"), a.find(".addresscity").parent().addClass("error")) : a.find(".addresscity").parent().removeClass("error");
                                        break;
                                    case "mobile":
                                        "" == t.val ? (a.find(".required, .pincode, .mobile").removeClass("error"), a.find(".mobileno").parent().addClass("error")) : a.find(".mobileno").parent().removeClass("error");
                                        break;
                                    case "email":
                                        "" == t.val ? (a.find(".required, .pincode, .mobile").removeClass("error"), a.find(".emailnew").parent().addClass("error")) : a.find(".emailnew").parent().removeClass("error");
                                        break;
                                    case "fullname":
                                        "" == t.val ? (a.find(".required, .pincode, .mobile").removeClass("error"), a.find(".fullnamenew").parent().addClass("error")) : a.find(".fullnamenew").parent().removeClass("error")
                                }
                                if ("landmark" != e) return h = !1, !1
                            } else switch (e) {
                                case "mobile":
                                    var o = /^[6789]\d{9}$/;
                                    if (!o.test(t.val)) return a.find(".required").removeClass("error"), a.find(".mobileno").parent().addClass("error"), h = !1, !1;
                                    a.find(".required").removeClass("error"), h = !0;
                                    break;
                                case "email":
                                    var s = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    if (!s.test(t.val)) return a.find(".required").removeClass("error"), a.find(".emailnew").parent().addClass("error"), h = !1, !1;
                                    a.find(".required").removeClass("error"), h = !0
                            }
                        }), h) switch (a.find(".required, .pincode, .mobile").removeClass("error"), $(this).prop("disabled", !0), $(this).addClass("disabled"), t) {
                        case "save":
                            fn.checkout_oos.saveAddr(f);
                            break;
                        case "update":
                            fn.checkout_oos.updateAddr(f, c);
                            break;
                        case "guest_addr":
                            fn.checkout_oos.setGuestAddr(f);
                            break;
                        case "new_addr":
                            fn.checkout_oos.saveAddr(f);
                            break;
                        case "new_addr_profile":
                            fn.checkout_oos.saveAddrProfile(f);
                            break;
                        case "update_addr_profile":
                            fn.checkout_oos.updateAddrProfile(f, c)
                    }
                })
            },
            validateNumbers: function () {
                $(".addr-pincode, .addr-mobile").on("keypress paste", function (e) {
                    e = e ? e : window.event;
                    var t = e.which ? e.which : e.keyCode;
                    return !(t > 31 && (t < 48 || t > 57))
                }), $(".addr-pincode, .addr-mobile").on("change", function (e) {
                    var t = $(".add-addr-pop").find(".addr-pincode"),
                        a = $(".add-addr-pop").find(".addr-mobile"),
                        o = /^\d+$/;
                    if (!o.test(t.val()) || t.val().length < 6) t.parent().addClass("error"), t.val("");
                    else {
                        var s = localStorage.getItem("city_id");
                        fn.checkout_oos.validatePincode(t.val(), s), t.parent().removeClass("error")
                    }!o.test(a.val()) || a.val().length < 10 || a.val().charAt(0) < 6 ? (a.parent().addClass("error"), a.val("")) : a.parent().removeClass("error")
                })
            },
            changeCity: function () {
                $(".add-addr-pop").find(".select-dropdown li").on("click", function () {
                    var e = $(this).text();
                    $(".addr-state").val(fn.checkout_oos.city_state_map[e])
                })
            },
            showAddrPopup: function (e) {
                var t = $(".address-container");
                t.addClass("reset"), t.addClass(e), $(".add-addr-screen").show()
            },
            addAddr: function () {
                $(".add-new-addr-btn").on("click", function () {
                    fn.checkout_oos.checkProfile(), fn.checkout_oos.hideAddrPopup(), fn.checkout_oos.showAddrPopup("add-new")
                })
            },
            editAddr: function () {
                $(".edit-addr").on("click", function (e) {
                    if (e.stopImmediatePropagation(), fn.checkout_oos.checkProfile(), $(e.target).hasClass("edit-addr")) {
                        $(".address-container").find(".newlocation").prop("disabled", !0), $(".address-container").find(".mapBlocker").show();
                        var t = $(this).data("addrid");
                        fn.checkout_oos.getAddr(t), fn.checkout_oos.validateAddrForm("update"), "profile" == $(this).data("clickname") && fn_sublocation.gaSublocation("Profile - EditAddress", "Click", ""), "checkout" == $(this).data("clickname") && fn_sublocation.gaSublocation("Cart - EditAddress", "Click", "")
                    }
                })
            },
            checkProfile: function () {
                var e = JSON.parse(localStorage.getItem("profile_complete")),
                    t = $(".address-form").find(".email"),
                    a = $(".address-form").find(".fullname");
                "true" === e.status || 1 == e.status ? (t.hide().find(".emailnew").val(e.email), a.hide().find(".fullnamenew").val(e.name)) : (t.show(), a.show())
            },
            getPin: function (e) {
                var t = "";
                return $.map(e, function (e, a) {
                    "postal_code" === e.types[0] && (t = e.long_name)
                }), t
            },
            saveAddr: function (e) {
                var t = "/checkout_oos/save-addr",
                    a = {
                        line1: e.addr_1.val,
                        line2: e.addr_2.val,
                        landmark: e.landmark.val,
                        city: e.city.val,
                        state: e.state.val,
                        pincode: Number(e.pincode.val),
                        contact: e.mobile.val,
                        lat: e.lat.val,
                        lng: e.lng.val
                    },
                    o = JSON.parse(localStorage.getItem("profile_complete"));
                "false" == o.status && Object.assign(a, {
                    email: e.email.val,
                    name: e.fullname.val
                }), fn.checkout_oos.ajaxForm(a, "POST", t).done(function (t) {
                    var a = JSON.parse(t);
                    "success" == a.status ? (fn.checkout_oos.resetForm(), fn.checkout_oos.fetchAddrs("save"), $(".address-container").removeClass("reset"), $(".address-container").attr("class", "address-container"), $(".add-addr-screen").hide(), $(".addr-header").find(".selected-addr").html(e.addr_1.val), localStorage.setItem("profile_complete", JSON.stringify({
                        status: !0,
                        email: e.email.val,
                        name: e.fullname.val
                    }))) : "error" == a.status && (fn.checkout_oos.showAlert(a.message, "dismiss", "addr"), fn.checkout_oos.closeLocationAlert())
                }).always(function () {
                    $(".addr-cta .btn.send").prop("disabled", !1), $(".addr-cta .btn.send").removeClass("disabled")
                })
            },
            saveAddrProfile: function (e) {
                var t = "/checkout_oos/save-addr",
                    a = {
                        line1: e.addr_1.val,
                        line2: e.addr_2.val,
                        landmark: e.landmark.val,
                        city: e.city.val,
                        state: e.state.val,
                        pincode: Number(e.pincode.val),
                        contact: e.mobile.val,
                        lat: e.lat.val,
                        lng: e.lng.val
                    },
                    o = JSON.parse(localStorage.getItem("profile_complete"));
                "false" == o.status && Object.assign(a, {
                    email: e.email.val,
                    name: e.fullname.val
                }), fn.checkout_oos.ajaxForm(a, "POST", t).done(function (t) {
                    var a = JSON.parse(t);
                    "success" == a.status ? (fn.checkout_oos.resetForm(), fn.checkout_oos.renderProfileAddr(), $(".address-container").removeClass("reset"), $(".address-container").attr("class", "address-container"), $(".add-addr-screen").hide(), localStorage.setItem("profile_complete", JSON.stringify({
                        status: !0,
                        email: e.email.val,
                        name: e.fullname.val
                    }))) : "error" == a.status && (fn.checkout_oos.showAlert(a.message, "dismiss", "addr"), fn.checkout_oos.closeLocationAlert())
                }).always(function () {
                    $(".addr-cta .btn.send").prop("disabled", !1), $(".addr-cta .btn.send").removeClass("disabled")
                })
            },
            renderProfileAddr: function () {
                fn.checkout_oos.ajaxForm("", "GET", "/checkout_oos/get-addr").done(function (e) {
                    var t = JSON.parse(e);
                    if ("success" == t.status) {
                        $(".addr-container .user-name").val();
                        $(".addr-holder").html(""), $.map(t.address, function (e, t) {
                            var a = '<div class="row addr-container ' + e.address_id + '" ><div class="col s2"><!-- <input name="group1" type="radio" disabled="disabled" id="{{$address[\'address_id\']}}" /> --><label for=""><img src="/img/elements/house.jpg"/></label></div><div class="col s7 profile-addr h-ssp-reg"><b style="color:black" class = "h-ssp-semi-bold">' + e.line1 + "</b><br><label>" + e.line2 + ", " + e.landmark + "</label><br/><label>" + e.city + " - " + e.pincode + ", " + e.state + '</label></div><div class="col s3 right-align action-btns"><img src = "/build/img/edit-icon.png" class="edit-addr" data-clickname="profile" data-addrid="' + e.address_id + '" data-pin="' + e.pincode + '" data-lat="' + e.lat + '" data-lng="' + e.lng + '"/><img src = "/build/img/delete-icon.png"  class="delete-addr" data-addrid="' + e.address_id + '" data-pin="' + e.pincode + '" data-lat="' + e.lat + '" data-lng="' + e.lng + '"/></div></div>';
                            $(".addr-holder").append(a)
                        })
                    } else "error" == t.status && $(".addr-holder").html('<p class="text-red">No Saved Address</p>');
                    fn.checkout_oos.editAddr(), fn.checkout_oos.deleteAddr()
                })
            },
            updateAddr: function (e, t) {
                var a = "/checkout_oos/update-addr";
                $(".addr-cta .btn.send").prop("disabled", !0), fn.checkout_oos.ajaxForm({
                    line1: e.addr_1.val,
                    line2: e.addr_2.val,
                    landmark: e.landmark.val,
                    city: e.city.val,
                    state: e.state.val,
                    pincode: e.pincode.val,
                    contact: e.mobile.val,
                    address_id: t,
                    lat: e.lat.val,
                    lng: e.lng.val
                }, "POST", a).done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status && (fn.checkout_oos.resetForm(), fn.checkout_oos.fetchAddrs(), $(".address-container").removeClass("reset"), $(".address-container").attr("class", "address-container"), $(".add-addr-screen").hide())
                }).always(function () {
                    $(".addr-cta .btn.send").prop("disabled", !1), $(".addr-cta .btn.send").removeClass("disabled")
                })
            },
            updateAddrProfile: function (e, t) {
                var a = "/checkout_oos/update-addr";
                $(".addr-cta .btn.send").prop("disabled", !0), fn.checkout_oos.ajaxForm({
                    line1: e.addr_1.val,
                    line2: e.addr_2.val,
                    landmark: e.landmark.val,
                    city: e.city.val,
                    state: e.state.val,
                    pincode: e.pincode.val,
                    contact: e.mobile.val,
                    address_id: t,
                    lat: e.lat.val,
                    lng: e.lng.val
                }, "POST", a).done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status && (fn.checkout_oos.resetForm(), fn.checkout_oos.renderProfileAddr(), $(".address-container").removeClass("reset"), $(".add-addr-screen").hide())
                }).always(function () {
                    $(".addr-cta .btn.send").prop("disabled", !1), $(".addr-cta .btn.send").removeClass("disabled")
                })
            },
            setGuestAddr: function (e) {
                $(".addr-cta .btn.send").prop("disabled", !0);
                var t = $(".set-guest-addr").data("url"),
                    a = $(".customer_key_value").data("custkey"),
                    o = {
                        customer_key: a,
                        name: $(".guest-name").val(),
                        email: $(".guest-email").val(),
                        phone: $(".guest-mobile").val(),
                        line1: e.addr_1.val,
                        line2: e.addr_2.val,
                        pincode: e.pincode.val,
                        city: e.city.val,
                        state: e.state.val,
                        lat: e.lat.val,
                        lng: e.lng.val,
                        landmark: e.landmark.val
                    };
                fn.checkout_oos.ajaxFormNC(o, "POST", t).done(function (e) {
                    if ("success" == e.status) {
                        fn.checkout_oos.resetForm(), $(".address-container").removeClass("reset"), $(".address-container").attr("class", "address-container"), $(".add-addr-screen").hide();
                        var t = 'Your <span class="text-red">Delivery Address</span> is<div class = "selected-addr"></div>';
                        $(".delivery-summary .delivery-addr .oos-header").html(t), $(".delivery-summary .selected-addr").html(o.line1 + " " + o.line2 + " " + o.city + " " + o.state + "," + o.pincode), localStorage.setItem("default_addr", o.line1 + " " + o.line2 + " " + o.city + " " + o.state + "," + o.pincode), localStorage.setItem("default_addr_id", ""), localStorage.setItem("default_addr_lat", o.lat), localStorage.setItem("default_addr_lng", o.lng), localStorage.setItem("default_pin", o.pincode), $(".set-pincode").data("val", o.pincode), fn.checkout_oos.localAddr = o, fn.checkout_oos.reLockOrder(), $(".delivery-details").find(".delivery-option ").show(), $(".checkout-shipment-summary").prop("disabled", !1), $(".checkout-shipment-summary").removeClass("disabled"), $(".addr-container").find(".oos-alert").hide()
                    }
                }).always(function () {
                    $(".addr-cta .btn.send").prop("disabled", !1), $(".addr-cta .btn.send").removeClass("disabled")
                })
            },
            hideAddrPopup: function (e) {
                var t = $(".address-container");
                switch (e) {
                    case "save":
                        $(".panel .cancel").on("click", function () {
                            fn.checkout_oos.resetForm(), t.attr("class", "address-container"), $(".add-addr-screen").hide()
                        });
                        break;
                    default:
                        $(".add-addr-screen, .panel .cancel").on("click", function () {
                            fn.checkout_oos.resetForm(), t.attr("class", "address-container"), $(".add-addr-screen").hide()
                        })
                }
            },
            resetForm: function () {
                $(":input", ".address-form").not(":button, :submit, :reset, :hidden, .select-dropdown").val("").removeAttr("checked").removeAttr("selected"), $(".select-dropdown").val("Select City"), $(".address-container").find(".required, .pincode, .mobile").removeClass("error"), $(".address-container").find(".newlocation").prop("disabled", !1), $(".address-container").find(".mapBlocker").hide()
            },
            showAlert: function (e, t, a) {
                var o = $(".alert-screen"),
                    s = '<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/alert.png" alt = "Alert!""/>';
                switch (o.find(".alert-message").html(e), t) {
                    case "review":
                        o.find(".btn").hide(), o.find(".review-cart").show();
                        break;
                    case "reload":
                        o.find(".btn").hide(), o.find(".reload-cart").show();
                        break;
                    case "change":
                        o.find(".btn").hide(), o.find(".change-address").show(), o.find(".review-cart").show();
                        break;
                    case "goto":
                        o.find(".btn").hide(), o.find(".goto-cart").show();
                        break;
                    case "dismiss":
                        o.find(".btn").hide(), o.find(".change-address").show();
                        break;
                    case "product":
                        o.find(".btn").hide(), o.find(".view-cart").show();
                        break;
                    case "slots":
                        o.find(".btn").hide(), o.find(".view-cart").show()
                }
                switch (a) {
                    case "items":
                        o.find(".this-header").html(s + " Alert [" + e + "]");
                        break;
                    case "addr":
                        o.find(".this-header").html(s + "Alert [Change in Delivery Address]");
                        break;
                    case "product":
                        o.find(".this-header").html(s + "Alert [Change in Product Availability]")
                }
                o.show()
            },
            hideAlert: function (e) {
                var t = $(".alert-screen");
                t.find(".alert-message").html(""), t.hide()
            },
            setPageInit: function () {
                var e = location.hash;
                if (e = e.replace(/[#_=]/gi, ""), "" == e) window.location.href = fn.checkout_oos.page + "#order-summary";
                else switch (e) {
                    case "order-summary":
                        fn.checkout_oos.getOrderSummary(), fn.checkout_oos.offeredProducts(), $(".page-holder").find(".pages").hide(), localStorage.removeItem("default_addr"), $(".page-holder").find(".pages.order-summary").show(), $(".checkout-oos .nav").find("li").removeClass("done, active"), $(".checkout-oos .nav").find("li.order-summary").removeClass("done"), $(".checkout-oos .nav").find("li.order-summary").addClass("active"), $(".page-holder").find(".add-addr-screen").hide(), $(".page-holder").find(".address-container").removeClass("reset");
                        break;
                    case "delivery-info":
                        ga("set", "page", location.pathname + location.search + location.hash), ga("send", "pageview"), fn.checkout_oos.fetchAddrs(), fn.checkout_oos.editOrder(), $(".page-holder").find(".pages").hide(), $(".page-holder").find(".pages.delivery-details").show(), $(".checkout-oos .nav").find("li").removeClass("done, active"), $(".checkout-oos .nav").find(".order-summary").addClass("done"), $(".checkout-oos .nav").find(".nav-delivery-info").addClass("active"), $(".addr-container").hide();
                        var t = localStorage.getItem("default_addr"),
                            a = localStorage.getItem("default_addr_id"),
                            o = localStorage.getItem("default_pin");
                        null == t && "" == t || ($(".selected-addr").html(t), $(".customAddressId").val(a), $(".set-pincode").data("val", o));
                        break;
                    case "delivery-summary":
                        ga("set", "page", location.pathname + location.search + location.hash), ga("send", "pageview"), fn.checkout_oos.getShipmentSummary();
                        var t = localStorage.getItem("default_addr"),
                            a = localStorage.getItem("default_addr_id"),
                            o = localStorage.getItem("default_pin");
                        null == t && "" == t || ($(".selected-addr").html(t), $(".customAddressId").val(a), $(".set-pincode").data("val", o)), fn.checkout_oos.editShipments(), $(".page-holder").find(".pages").hide(), $(".page-holder").find(".pages.delivery-summary").show(), $(".checkout-oos .nav").find("li").removeClass("done, active"), $(".checkout-oos .nav").find(".order-summary").addClass("done"), $(".checkout-oos .nav").find(".nav-delivery-info").addClass("active");
                        break;
                    case "payment":
                        localStorage.setItem("pay_method", "Credit/Debit Card"), fn.checkout_oos.getWalletInfo(), codEligible(), ga("set", "page", location.pathname + location.search + location.hash), ga("send", "pageview");
                        var t = localStorage.getItem("default_addr"),
                            a = localStorage.getItem("default_addr_id"),
                            o = localStorage.getItem("default_pin");
                        null == t && "" == t || ($(".selected-addr").html(t), $(".customAddressId").val(a), $(".set-pincode").data("val", o)), $(".page-holder").find(".pages").hide(), $(".page-holder").find(".pages.payment").show(), $(".checkout-oos .nav").find("li").removeClass("done, active"), $(".checkout-oos .nav").find(".order-summary").addClass("done"), $(".checkout-oos .nav").find(".nav-delivery-info").addClass("done"), $(".checkout-oos .nav").find(".pay-details").addClass("active")
                }
            },
            showSlots: function () {
                $(".slots-selector").bind("click", function () {
                    var e = ($(".get-slots-url").data("url"), $(this).data("shipid")),
                        t = $(this).data("type"),
                        a = $(this);
                    $(this).parent().find(".slots-layout").show(), $(this).parent().find(".slots-screen").show(), fn.checkout_oos.ajaxForm({}, "POST", "/checkout_oos/get-slots/" + e).done(function (o) {
                        fn.checkout_oos.renderSlots(o, a, e), fn.checkout_oos.selectSlot(e, t)
                    })
                }), fn.checkout_oos.hideSlots()
            },
            renderSlots: function (e, t, a, o) {
                var s = JSON.parse(e);
                $(t).parent().find(".slots-holder").html(""), s.slots[0].express_elligible ? ($(t).parent().find(".this-header").removeClass("hide"), $(t).parent().find(".this-header").addClass("express"), $(t).parent().find(".this-header").attr("data-date", s.slots[0].date), $(t).parent().find(".this-header").attr("data-shipid", a), $(t).parent().find(".this-header").attr("data-time", s.slots[0].express_value), $(t).parent().find(".this-header").find(".text-red").html(s.slots[0].express_value)) : ($(t).parent().find(".this-header").addClass("hide"), $(t).parent().find(".this-header").removeClass("express")), $.map(s.slots, function (e, o) {
                    var s = new Date(e.timestamp).getDate(),
                        r = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    s == (new Date).getDate() ? todomo = "Today (" + s + " " + n[new Date(e.timestamp).getMonth()] + ")" : s == (new Date).getDate() + 1 ? todomo = "Tomorrow (" + s + " " + n[new Date(e.timestamp).getMonth()] + ")" : todomo = r[new Date(e.timestamp).getDay()] + " (" + s + " " + n[new Date(e.timestamp).getMonth()] + ")";
                    var i = '<div class = "slot-day-time slot-' + e.date + '"><div class = "slot-day">' + todomo + '</div><ul class = "slot-time"></ul></div>';
                    $(t).parent().find(".slots-holder").append(i), $.map(e.slots, function (o) {
                        var s = "n-a",
                            r = "";
                        s = 1 == o.status ? "a" : "n-a", r = o.selected ? "selected" : "";
                        var n = '<li class = "' + s + " " + r + '" data-date="' + e.date + '" data-shipid="' + a + '" data-value="' + o.time + '">' + o.time + "</li>";
                        $(t).parent().find(".slot-" + e.date + " .slot-time").append(n)
                    })
                })
            },
            selectSlot: function (e, t) {
                $(".slot-time").find("li").click(function () {
                    var t = $(this).hasClass("n-a"),
                        a = $(this).data("date"),
                        o = $(this).data("shipid"),
                        s = $(this).data("value"),
                        r = "/checkout_oos/select-slot/" + o + "/" + a + "/" + s;
                    t || fn.checkout_oos.ajaxForm({}, "POST", r).done(function (t) {
                        var r = JSON.parse(t),
                            n = JSON.parse(localStorage.getItem("DeliverySlots")),
                            i = [],
                            l = [],
                            d = "";
                        $.map(r.shipments, function (e) {
                            e.id == o && (d = e.delivery_type, $.map(e.products, function (e) {
                                i.push(e.product_id), l.push(e.product_name)
                            }))
                        });
                        clevertap.event.push("Slot Selection", {
                            Date: a,
                            Time: s,
                            "Shipment Id": o
                        }), $(".shipment-container.details").html(""), n.indexOf(e) == -1 && (n.push(e), localStorage.setItem("DeliverySlots", JSON.stringify(n))), fn.checkout_oos.renderShipments(t), fn.checkout_oos.showSlots()
                    })
                }), fn.checkout_oos.clickSlotExpress()
            },
            clickSlotExpress: function () {
                $(".slots-layout").find(".this-header.express").on("click", function (e) {
                    e.stopImmediatePropagation();
                    var t = ($(this).hasClass("n-a"), $(this).data("date")),
                        a = $(this).data("shipid"),
                        o = $(this).data("time"),
                        s = "/checkout_oos/select-slot/" + a + "/" + t + "/" + o;
                    fn.checkout_oos.ajaxForm({}, "POST", s).done(function (e) {
                        var s = JSON.parse(e),
                            r = [],
                            n = [],
                            i = "";
                        $.map(s.shipments, function (e) {
                            e.id == a && (i = e.delivery_type, $.map(e.products, function (e) {
                                r.push(e.product_id), n.push(e.product_name)
                            }))
                        });
                        $.map(s.shipments, function () {
                            clevertap.event.push("Slot Selection", {
                                Date: t,
                                Time: o,
                                "Shipment Id": a
                            })
                        }), $(".shipment-container.details").html(""), fn.checkout_oos.renderShipments(e), fn.checkout_oos.showSlots()
                    })
                })
            },
            hideSlots: function () {
                $(".slots-screen").on("click", function () {
                    $(this).hide(), $(this).parent().find(".slots-layout").hide()
                })
            },
            getOrderSummary: function (e) {
                var t = $(".order-summary-url").data("url");
                fn.checkout_oos.ajaxForm({}, "get", t).done(function (e) {
                    var t = JSON.parse(e);
                    t.show_popup && fn.checkout_oos.showAlert(t.web_popup_message, "product", "product"), $(".alert-cta .view-cart").on("click", function () {
                        $(".alert-screen").hide()
                    }), "" != t.notification.text ? ($(".add_message.static-oos").show(), $(".fix-div").addClass("mar-30"), $(".checkout-order-summary").prop("disabled", !0), $(".checkout-order-summary").addClass("disabled")) : ($(".add_message.static-oos").hide(), $(".fix-div").removeClass("mar-30"), $(".checkout-order-summary").prop("disabled", !1), $(".checkout-order-summary").removeClass("disabled")), $(".pages.order-summary").find(".item-holder").html(""), fn.checkout_oos.renderItems(e);
                    var t = JSON.parse(e),
                        a = '<li>Delivery Charge <span class = "rupee">' + parseFloat(t.shipping).toFixed(2) + '</span></li><li>Total <span class = "rupee text-red">' + parseFloat(t.total).toFixed(2) + "</span></li>";
                    $(".order-summary").find(".total-overview").html(a)
                }).always(function () {
                    if ("reload" == e) {
                        $(".alert-screen").hide();
                        var t = $(".alert-screen").find(".reload-cart");
                        t.prop("disabled", !1), t.removeClass("disabled")
                    }
                    var a = document.querySelector(".total-wrapper");
                    a.offsetTop + 65 > window.innerHeight + $(window).scrollTop() ? $(".total-wrapper").find(".fix-div").addClass("fixed") : $(".total-wrapper").find(".fix-div").removeClass("fixed"), fn.checkout_oos.setTotalbar()
                })
            },
            renderItems: function (e) {
                var t = JSON.parse(e);
                fn.checkout_oos.setFinalPayment(t.grand_total), t.products.length ? ($(".pages.order-summary").find(".available-products").show(), $.map(t.products, function (e) {
                    var t = e.offer_discount && e.discount > 0 ? '<p class = "rupee discounted">' + parseFloat(e.base_price + e.discount / e.quantity).toFixed(2) + '</p><p class = "rupee original">' + parseFloat(e.base_price).toFixed(2) + "</p>" : '<p class = "rupee original">' + parseFloat(e.base_price).toFixed(2) + "</p>",
                        a = '<div class="item prd-' + e.product_id + '"><div class="item-name"><img src="' + e.image + '" alt="' + e.product_name + '"><div class="item-desc"><p>' + e.product_name + "</p><p>" + e.weight + '</p></div></div><div class="item-qty"><button class = "minus-one" data-prid="' + e.product_id + '" data-stock="' + e.stock + '" data-text="' + e.product_name + '" data-amt="' + parseFloat(e.base_price).toFixed(2) + '">&#8211;</button><input type="text" class="item_qty" value = "' + e.quantity + '" disabled><button class = "plus-one" data-prid="' + e.product_id + '" data-stock="' + e.stock + '" data-text="' + e.product_name + '" data-amt="' + parseFloat(e.base_price).toFixed(2) + '">+</button></div><div class="item-price">' + t + '</div><div class="item-subtotal"><span class = "rupee">' + parseFloat(e.subtotal).toFixed(2) + '</span></div><div class="item-cta"><span class = "remove-item" data-prid="' + e.product_id + '" data-quatity="' + e.quantity + '">&times;</span></div></div>';
                    $(".order-summary").find(".item-holder").append(a)
                }), fn.checkout_oos.addCartItem(), fn.checkout_oos.removeCartItem(), fn.checkout_oos.updateItemQty(), $(".remove-item").on("click", function () {
                    var e = $(this).data("prid"),
                        t = $(this).data("quatity");
                    fn.checkout_oos.deleteCartItem(e, t).always(function (e) {})
                })) : ($(".pages.order-summary").find(".available-products").hide(), $(".pages.order-summary").find(".total-wrapper").hide(), $(".pages.order-summary").find(".continue-shopping").show()), t.oss_products.length ? ($(".pages.order-summary").find(".item-holder.oos").html(""), $(".pages.order-summary").find(".oss-products").show(), $.map(t.oss_products, function (e) {
                    var t = e.offer_discount && e.discount > 0 ? '<p class = "rupee discounted">' + parseFloat(e.base_price + e.discount / e.quantity).toFixed(2) + '</p><p class = "rupee original">' + parseFloat(e.base_price).toFixed(2) + "</p>" : '<p class = "rupee original">' + parseFloat(e.base_price).toFixed(2) + "</p>";
                    item = '<div class="item prd-' + e.product_id + '"><div class="item-name"><img src="' + e.image + '" alt="' + e.product_name + '"><div class="item-desc"><p>' + e.product_name + "</p><p>" + e.weight + '</p></div></div><div class="item-qty"><input type="text" class="item_qty" value = "' + e.quantity + '" disabled></div><div class="item-price">' + t + '</div><div class="item-subtotal"><span class = "rupee">' + parseFloat(e.subtotal).toFixed(2) + "</span></div></div>", $(".order-summary").find(".item-holder.oos").append(item)
                })) : $(".pages.order-summary").find(".oss-products").hide(), t.oss_products.length || t.products.length || $(".pages.order-summary").html('<div class = "main-container"><div class="oos-header">Your <span class="text-red">Cart is Empty</span></div><div class="empty-cart"><img data-lazy="https://d2407na1z3fc0t.cloudfront.net/Banner/empty-cart-icon.png" alt="Empty cart">Your cart awaits your next meal <p><a href="/">Continue Shopping</a></p> </div></div>');
            },
            addCartItem: function () {
                $(".item").find(".plus-one").on("click", function (e) {
                    e.stopPropagation();
                    var t = $(this),
                        a = parseInt($(this).parent().find(".item_qty").val()),
                        o = $(this).data("prid"),
                        s = $(this).data("stock"),
                        r = a + 1;
                    return r <= s ? void(t.hasClass("ub") || (t.parent().find(".item_qty").val(r), t.addClass("ub"), fn.checkout_oos.updateCartItem(o, r, "add").always(function () {
                        t.removeClass("ub")
                    }))) : void Materialize.toast("Only " + s + " units left", 3e3)
                }), $(".crossel-products .product-cta").find(".btn").on("click", function (e) {
                    e.stopImmediatePropagation();
                    var t = ($(this), $(this).data("prid")),
                        a = $(this).data("crosssellid"),
                        o = $(this).data("offertype"),
                        s = $(this).data("prname"),
                        r = $(this).data("baseprice"),
                        n = 1;
                    $(this).prop("disabled", !0), $(this).addClass("disabled"), $(".crossel-wrap").addClass("loader-div"), fn.checkout_oos.crosssellAddCartItem(t, n, a, o, s, r)
                })
            },
            removeCartItem: function () {
                $(".item").find(".minus-one").on("click", function (e) {
                    e.stopPropagation();
                    var t = $(this),
                        a = parseInt($(this).parent().find(".item_qty").val()),
                        o = $(this).data("prid"),
                        s = a - 1;
                    if (!t.hasClass("ub")) return t.addClass("ub"), 0 == s ? (fn.checkout_oos.deleteCartItem(o, a).always(function () {
                        t.removeClass("ub")
                    }), !1) : (fn.checkout_oos.updateCartItem(o, s, "remove").always(function () {
                        t.removeClass("ub")
                    }), $(this).parent().find(".item_qty").val(s), $(this).parent().find(".item-cta .remove-item").data("quantity", s), void 0)
                })
            },
            updateCartItem: function (e, t, a) {
                var o = "/checkout_oos/cart-item-update/" + e + "/" + t;
                return fn.checkout_oos.ajaxForm({}, "POST", o).done(function (e) {
                    var o = JSON.parse(e);
                    "" != o.message ? ($(".add_message.static-oos").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + o.message).show(), $(".checkout-order-summary").prop("disabled", !0), $(".checkout-order-summary").addClass("disabled"), $(".fix-div").addClass("mar-30")) : ($(".add_message.static-oos").hide(), $(".checkout-order-summary").prop("disabled", !1), $(".checkout-order-summary").removeClass("disabled"), $(".fix-div").removeClass("mar-30"));
                    var s = $(".order-summary .item-holder").find(".prd-" + o.product_id);
                    "success" == o.status ? (s.find(".item-subtotal span").html(parseFloat(o.product.subtotal).toFixed(2)), s.find(".item-cta .remove-item").attr("data-quatity", t), fn.checkout_oos.setFinalPayment(o.grand_total), fn.checkout_oos.updateCartBtn(o.item_count), fn.checkout_oos.updateOrderTotal(o), "add" == a ? (ga("send", "event", {
                        eventCategory: "Cart",
                        eventAction: "CartPageAddedToCart",
                        eventLabel: o.product.product_name,
                        eventValue: o.product.base_price
                    }), clevertap.event.push("Added to Cart", {
                        "Product ID": o.product.product_id,
                        "Product Name": o.product.product_name,
                        "Product Price": o.product.base_price,
                        Quantity: o.quantity,
                        incoming_source: "cart_page",
                        Checkout_Flow: "old_checkout"
                    }), clevertap.event.push("Product added to cart", {
                        "Product ID": o.product.product_id,
                        "Product Name": o.product.product_name,
                        Price: Number(o.product.base_price),
                        Quantity: Number(o.product.quantity),
                        "Category ID": o.product.category_id,
                        Checkout_Flow: old_checkout
                    })) : (ga("send", "event", {
                        eventCategory: "Cart",
                        eventAction: "CartProductRemovedFromCart",
                        eventLabel: o.product.product_name,
                        eventValue: o.product.base_price
                    }), clevertap.event.push("Product Removed from Cart", {
                        "Product ID": o.product.product_id,
                        "Product Name": o.product.product_name,
                        "Product Price": o.product.base_price,
                        Quantity: o.quantity
                    }))) : Materialize.toast(o.message, 3e3)
                })
            },
            crosssellAddCartItem: function (e, t, a, o, s, r) {
                var n = "/checkout_oos/cart-item-update/" + e + "/" + t;
                return fn.checkout_oos.ajaxForm({
                    crosssell_id: a,
                    product_id: e,
                    quantity: t
                }, "POST", n).done(function (t) {
                    var a = JSON.parse(t);
                    a.data;
                    "success" == a.status ? ($(".crossel-wrap").addClass("complete"), "delivery" == o ? ($(".freedelivery-wrapper").addClass("show"), setTimeout(function () {
                        $(".freedelivery-wrapper").removeClass("show")
                    }, 5e3)) : $(".freedelivery-wrapper").removeClass("show"), $(".crossel-wrap .crossel-products").find(".productid-" + e).fadeOut(300, function () {
                        $(this).remove(), $(".crossel-wrap .crossel-products").children("li").length < 1 ? $(".crossel-wrap").hide() : $(".crossel-wrap").show()
                    }), ga("send", "event", {
                        eventCategory: "Cart-Cross Sell Module",
                        eventAction: "CartModuleProductAddedToCart",
                        eventLabel: s + " - " + o,
                        eventValue: r
                    }), clevertap.event.push("Product added to cart", {
                        "Product ID": a.product.product_id,
                        "Product Name": a.product.product_name,
                        Price: Number(a.product.base_price),
                        Quantity: Number(a.product.quantity),
                        "Category ID": a.product.category_id,
                        Checkout_Flow: old_checkout
                    }), fn.checkout_oos.getOrderSummary(), fn.checkout_oos.setFinalPayment(a.grand_total), fn.checkout_oos.updateCartBtn(a.item_count), fn.checkout_oos.updateOrderTotal(a), setTimeout(function () {
                        $(".crossel-wrap").removeClass("loader-div complete")
                    }, 500)) : ($(".crossel-products .product-cta .btn").prop("disabled", !1), $(".crossel-products .product-cta .btn").addClass("enabled"), $(".crossel-wrap").removeClass("loader-div"), Materialize.toast(a.message, 3e3))
                }).always(function (e) {})
            },
            deleteCartItem: function (e, t) {
                var a = "/checkout_oos/cart-item-delete/" + e;
                return fn.checkout_oos.ajaxForm({}, "POST", a).done(function (e) {
                    var t = JSON.parse(e);
                    if ("success" == t.status) {
                        if (ga("send", "event", {
                                eventCategory: "Cart",
                                eventAction: "CartPageRemovedFRomCart",
                                eventLabel: t.product.product_name,
                                eventValue: t.product.base_price
                            }), clevertap.event.push("Product Removed from Cart", {
                                "Product ID": t.product.product_id,
                                "Product Name": t.product.product_name,
                                "Product Price": t.product.base_price
                            }), t.show_popup && fn.checkout_oos.showAlert(t.web_popup_message, "product", "product"), $(".alert-cta .view-cart").on("click", function () {
                                $(".alert-screen").hide()
                            }), $(".order-summary .item-holder").find(".prd-" + t.product_id).remove(), $(".crossel-wrap .crossel-products").find(".csid-" + t.product_id).remove(), $(".crossel-wrap .crossel-products").children("li").length < 1 && $(".crossel-wrap").hide(), fn.checkout_oos.getOrderSummary(), fn.checkout_oos.updateOrderTotal(t), fn.checkout_oos.updateCartBtn(t.item_count), Materialize.toast("Item removed from cart", 3e3), 0 == t.item_count) {
                            var a = '<div class = "main-container"><div class="oos-header">Your <span class="text-red">Cart is Empty</span></div><div class="empty-cart"><img data-lazy="https://d2407na1z3fc0t.cloudfront.net/Banner/empty-cart-icon.png" alt="Empty cart">Your cart awaits your next meal <p><a href="/">Continue Shopping</a></p> </div></div>';
                            $(".order-summary .main-container").html(a), $(".crossel-wrap").hide(), $(".total-wrapper").hide()
                        }
                        "" != t.message ? ($(".add_message.static-oos").html('<img src="https://d2407na1z3fc0t.cloudfront.net/Banner/info_2x.png" alt="Info">' + t.message).show(), $(".checkout-order-summary").prop("disabled", !0), $(".checkout-order-summary").addClass("disabled")) : ($(".add_message.static-oos").hide(), $(".checkout-order-summary").prop("disabled", !1), $(".checkout-order-summary").removeClass("disabled"))
                    }
                })
            },
            deleteShipmentItem: function (e, t, a, o, s) {
                var r = "/checkout_oos/shipment-item-delete";
                fn.checkout_oos.ajaxForm({
                    shipId: t,
                    productId: e
                }, "POST", r).done(function (e) {
                    var r = JSON.parse(e),
                        n = parseInt(s * o);
                    "success" == r.status ? ($(".loader-div").addClass("complete"), ga("send", {
                        hitType: "event",
                        eventCategory: "Cart",
                        eventAction: "DeleteButtonClick",
                        eventLabel: a,
                        eventValue: n
                    }), fn.checkout_oos.cartCount(), fn.checkout_oos.getShipments()) : 1 == t ? $(".shipment-head-block1").removeClass("loader-div") : $(".shipment-head-block2").removeClass("loader-div")
                }).always(function () {
                    setTimeout(function () {
                        $(".loader-div").removeClass("loader-div complete"), $(".items-holder").find(".item." + e).remove()
                    }, 600)
                }).fail(function () {
                    1 == t ? $(".shipment-head-block1").removeClass("loader-div") : $(".shipment-head-block2").removeClass("loader-div")
                })
            },
            updateItemQty: function () {
                $(".item").find(".item_qty").on("change", function () {})
            },
            updateCartBtn: function (e) {
                var t = $(".sub-header").find(".cart");
                t.find("i").html(e), e > 0 ? (t.hasClass("loaded") || t.addClass("loaded"), (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && fn_home.quickCheckout()) : (t.removeClass("loaded"), $(".quick-checkout.fade-in").length && (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && ($(".slots-layout").removeClass("fade-in"), $(".slot-detials").removeClass("fade-in"), $("#slotAction").html("View"), $(".background-div").removeClass("dull-background"), $(".quick-checkout").removeClass("fade-in"), $(".quick-checkout .payment").removeClass("hide-class")))
            },
            updateOrderTotal: function (e) {
                var t = '<li>Delivery Charge <span class = "rupee">' + parseFloat(e.shipping_charge).toFixed(2) + '</span></li><li>Total <span class = "rupee text-red">' + parseFloat(e.total).toFixed(2) + "</span></li>";
                $(".order-summary").find(".total-overview").html(t)
            },
            confirm_items: function () {
                $(".checkout-order-summary").on("click", function () {
                    var e = $(".order-lock-url").data("url"),
                        t = $(this);
                    $(".total-wrapper.os").addClass("loader-div"), t.css("opacity", "0.5").prop("disabled", !0), fn.checkout_oos.ajaxForm({}, "POST", e).done(function (e) {
                        var t = JSON.parse(e);
                        "success" == t.status ? ($(".total-wrapper.os").addClass("complete"), setTimeout(function () {
                            fn.checkout_oos.navigate(fn.checkout_oos.delivery_page)
                        }, 500), fbq("track", "InitiateCheckout")) : (fn.checkout_oos.showAlert(t.message, "reload", "items"), fn.checkout_oos.reloadCart())
                    }).always(function () {
                        setTimeout(function () {
                            $(".total-wrapper.os").removeClass("loader-div complete"), t.css("opacity", "1").prop("disabled", !1)
                        }, 600)
                    })
                })
            },
            lockOrder: function () {
                var e = $(".order-lock-url").data("url");
                fn.checkout_oos.ajaxForm({}, "POST", e).done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status ? fn.checkout_oos.navigate(fn.checkout_oos.delivery_page) : (fn.checkout_oos.showAlert(t.message, "reload", "items"), fn.checkout_oos.reloadCart())
                })
            },
            editOrder: function () {
                $(".edit-order").on("click", function () {
                    fn.checkout_oos.navigate(fn.checkout_oos.order_page)
                })
            },
            reLockOrder: function () {
                $(".order-lock-url").data("url");
                fn.checkout_oos.getShipments()
            },
            reloadCart: function () {
                $(".reload-cart").click(function () {
                    $(this).prop("disabled", !0), $(this).addClass("disabled"), fn_sublocation.gaSublocation("SL-Address Alert - Review Cart", "Click", ""), fn.checkout_oos.getOrderSummary("reload")
                })
            },
            getShipments: function () {
                var e = $(".get-shipments-url").data("url"),
                    t = [],
                    a = [];
                fn.checkout_oos.ajaxForm({}, "GET", e).done(function (e) {
                    var o = JSON.parse(e);
                    "success" == o.status ? ($.map(o.shipments, function (e, t) {
                        a.push({
                            id: e.id,
                            delivery_type: e.delivery_type
                        })
                    }), localStorage.setItem("DeliverySlots", JSON.stringify(t)), localStorage.setItem("DeliveryInfo", JSON.stringify(a)), fn.checkout_oos.renderShipments(e), fn.checkout_oos.showSlots()) : fn.checkout_oos.navigate(fn.checkout_oos.order_page)
                })
            },
            renderShipments: function (e) {
                var t = JSON.parse(e),
                    a = 0,
                    o = !1,
                    s = JSON.parse(localStorage.getItem("DeliverySlots")),
                    r = JSON.parse(localStorage.getItem("DeliveryInfo")),
                    n = [],
                    i = [],
                    l = [],
                    d = 0;
                checkoutStart = {}, $(".shipment-container.details").html(""), $(".shipment-container.details").find(".items-holder").html("");
                var c = '<div class="head-shipment"><div class="oos-alert delivery">We ran out of some items! Want to split this order ?</div><div class="shipment-head-block1"></div></div><div class="head-shipment"><div class="oos-header delivery"> Tell us when you want these delivered ! </span> </div><div class="shipment-head-block2"></div></div>';
                $(".shipment-container").append(c), t.shipments.length > 1 ? $(".oos-alert.delivery").show() : $(".oos-alert.delivery").hide(), $.map(t.shipments, function (e, c) {
                    l.push(e.delivery_type), d += e.shipment_total.total, a++;
                    var u = 0;
                    $.map(e.products, function (e) {
                        u += parseInt(e.quantity)
                    });
                    var p, m = new Date(e.delivery_timestamp).getDay(),
                        h = new Date(e.delivery_timestamp).getDate(),
                        f = new Date(e.delivery_timestamp).getMonth(),
                        v = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        g = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        _ = "",
                        y = "";
                    p = h == (new Date).getDate() ? 'Items Delivered <span class = "text-red shipment-day">Today</span>' : h == (new Date).getDate() + 1 ? 'Items Delivered <span class = "text-red shipment-day">Tomorrow</span>' : 'Items Delivered on <span class = "text-red shipment-day">' + v[m] + "</span>", y = e.slots ? e.slots[0].express_value : "EXPRESS" == e.delivery_type && "" != e.express_message ? 'Delivered in <span class = "text-red">' + e.express_message + "</span>" : 'Delivered in <span class = "text-red">90 minutes</span>', _ = "EXPRESS" == e.delivery_type && "" != e.express_message ? 'Delivered in <span class = "text-red">' + e.express_message + "</span>" : h == (new Date).getDate() ? 0 == s.length ? '<span class = "text-red">Select the delivery slot</span>' : s.indexOf(e.id) > -1 ? "Today (" + h + g[f] + ") <span class = 'text-red'>" + e.delivery_time + "</span>" : '<span class = "text-red">Select the delivery slot</span>' : h == (new Date).getDate() + 1 ? 0 == s.length ? '<span class = "text-red">Select the delivery slot</span>' : s.indexOf(e.id) > -1 ? "Tomorrow (" + h + g[f] + ") <span class = 'text-red'>" + e.delivery_time + "</span>" : '<span class = "text-red">Select the delivery slot</span>' : 0 == s.length ? '<span class = "text-red">Select the delivery slot</span>' : s.indexOf(e.id) > -1 ? v[m] + " (" + h + g[f] + ") <span class = 'text-red'>" + e.delivery_time + "</span>" : '<span class = "text-red">Select the delivery slot</span>';
                    var b = '<div class="shipment"><div class="shipment-header"><div class="shipment-title"><span class = "text-red item-numbers">' + u + "</span> " + p + " ( " + h + " " + g[f] + ' )</div><div class="shipment-no">Delivery <span class = "text-red">' + a + '</span> of <span class = "text-red">' + t.shipments.length + '</span></div></div><div class="slots-container"><div class="slots-dropdown"><div class="slots-selector unchecked slots-selector-' + e.id + '" data-shipid="' + e.id + '" data-type="' + e.delivery_type + '">' + _ + '</div><div class = "slots-screen"></div><div class="slots-layout"><div class="this-header hide"><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/scooter.png" alt=""><span class = "text-red"></span></div><div class="times-of-day"><ul><li><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/morning.png" alt="Morning Slot"></li><li><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/noon.png" alt="Morning Slot"></li><li><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/evening.png" alt="Morning Slot"></li><li><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/sundown.png" alt="Morning Slot"></li><li><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/night.png" alt="Morning Slot"></li></ul></div><div class = "slots-holder"></div></div></div><div class="pricing-info"><ul><li>' + e.shipment_total.key + ': <span class = "rupee">' + parseFloat(e.shipment_total.total).toFixed(2) + "</span></li><li>" + e.shipment_delivery_charge.key + ': <span class = "rupee">' + parseFloat(e.shipment_delivery_charge.total).toFixed(2) + ' <sup>*</sup></span></li></ul></div></div><div class="items-holder items-holder-' + e.id + '"></div>';
                    "EXPRESS" == r[c].delivery_type ? ($(".shipment-container.details .shipment-head-block1").append(b), $(".shipment-container.details .shipment-head-block1").css("display", "block"), $(".slots-selector-" + e.id).removeClass("unchecked"), $(".slots-selector-" + e.id).addClass("checked"), s.indexOf(e.id) == -1 && (s.push(e.id), localStorage.setItem("DeliverySlots", JSON.stringify(s)))) : ($(".shipment-container.details .shipment-head-block2").append(b), $(".shipment-container.details .shipment-head-block2").css("display", "block"), o = !0, s.indexOf(e.id) != -1 && ($(".slots-selector-" + e.id).removeClass("unchecked"), $(".slots-selector-" + e.id).addClass("checked"))), $(".items-holder-" + e.id).html(""), $.map(e.products, function (t) {
                        i.push(t.product_id), n.push(t.product_name);
                        var a, o = "" != t.pieces ? t.pieces : t.weight;
                        return a = "" != t.shipment_info_message ? t.quantity != t.total_quantity ? "bubble" : "" : t.quantity != t.total_quantity ? "text-red" : "", item = '<div class="item ' + t.product_id + '"><img src="' + t.image + '" alt="' + t.product_name + '"><div class="item-details"><p class="item-name">' + t.product_name + '</p><p class = "item-desc"><span>' + o + '</span><span class = "rupee bold">' + parseFloat(t.base_price).toFixed(2) + '</span><span class = "bold">Qty : <i class = "' + a + '">' + t.shipment_quantity + "<span>" + t.shipment_info_message + '</span></i><b class="delProd" data-prname="' + t.product_name + '" data-amount="' + parseFloat(t.base_price).toFixed(2) + '" data-prid="' + t.product_id + '" data-shipmentid="' + e.id + '" data-quantity="' + t.quantity + '">Delete</b></span></p></div></div>', $(".items-holder-" + e.id).append(item), !1
                    })
                }), s.length != r.length && 1 == o ? $(".oos-header.delivery").show() : $(".oos-header.delivery").hide(), $(".delProd").on("click", function (e) {
                    e.stopImmediatePropagation(), product_delId = $(this).data("prid"), shipId = $(this).data("shipmentid"), amt = $(this).data("amount"), prname = $(this).data("prname"), quantity = Number($(this).data("quantity"));
                    $(this).offset().top;
                    $(".alert-screen-slots.remove-item").css("display", "block"), $("body").addClass("noscroll")
                }), $(".btn.remove-item-no").on("click", function (e) {
                    $(".alert-screen-slots.remove-item").css("display", "none"), $("body").removeClass("noscroll")
                }), $(".btn.remove-item-yes").on("click", function (e) {
                    e.stopImmediatePropagation(), $("body").removeClass("noscroll"), 1 == shipId ? $(".shipment-head-block1").addClass("loader-div") : $(".shipment-head-block2").addClass("loader-div"), $(".alert-screen-slots.remove-item").css("display", "none"), fn.checkout_oos.deleteShipmentItem(product_delId, shipId, prname, amt, quantity)
                });
                var u = document.querySelector(".main-cta-continue.mar-15");
                u.offsetTop + 75 > window.innerHeight + $(window).scrollTop() ? $(".main-cta-continue.mar-15").find(".cta-continue").addClass("fixed") : $(".main-cta-continue.mar-15").find(".cta-continue").removeClass("fixed"), $(window).on("scroll load resize", function () {
                    var e = document.querySelector(".main-cta-continue.mar-15");
                    e.offsetTop + 75 > window.innerHeight + $(window).scrollTop() ? $(".main-cta-continue.mar-15").find(".cta-continue").addClass("fixed") : $(".main-cta-continue.mar-15").find(".cta-continue").removeClass("fixed")
                }), Object.assign(checkoutStart, {
                    "Shipping Information": localStorage.getItem("default_addr"),
                    "Product ID": i,
                    "Product Name": n,
                    "Delivery Type": l,
                    "Cart Value": Number(d),
                    "City Name": localStorage.getItem("city_name"),
                    "Hub ID": Number($(".hubId_main").val())
                })
            },
            renderShipmentSummary: function (e) {
                var t = JSON.parse(e);
                localStorage.setItem("cart_value", t.cart_summary.total.value), fn.checkout_oos.renderShipmentSummaryProduct(t);
                var a = t.cart_summary,
                    o = '<li>Subtotal <span class = "rupee">' + parseFloat(a.total.value).toFixed(2) + '</span></li><li>Delivery Charge <span class = "rupee">' + parseFloat(a.shipping.value).toFixed(2) + '</span></li><li class = "text-red">Discount <span class = "rupee">' + parseFloat(a.discount.value).toFixed(2) + '</span></li><li class = "amt-total">Amount to pay<span class = "rupee">' + parseFloat(a.subtotal.value).toFixed(2) + "</span></li>";
                $(".delivery-summary .total-overview").html(o), fn.checkout_oos.setFinalPayment(a.subtotal.value)
            },
            renderShipmentSummaryProduct: function (e) {
                var t = 0;
                $(".shipment-container.summary").html(""), $.map(e.shipments, function (e) {
                    t++;
                    var a = new Date(e.delivery_timestamp).getDay(),
                        o = new Date(e.delivery_timestamp).getDate(),
                        s = new Date(e.delivery_timestamp).getMonth(),
                        r = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        i = "";
                    i = "EXPRESS" == e.delivery_type && "" != e.express_message ? "in " + e.express_message : e.delivery_time, o == (new Date).getDate() ? todomo = 'Delivered <span class = "text-red shipment-day">Today</span>' : o == (new Date).getDate() + 1 ? todomo = 'Delivered <span class = "text-red shipment-day">Tomorrow</span>' : todomo = 'Delivered on <span class = "text-red shipment-day">' + r[a] + "</span>";
                    var l = '<div class="shipment"><div class="shipment-header"><div class="shipment-title">' + todomo + " ( " + o + " " + n[s] + " ) " + i + '</div></div><div class="items-holder items-holder-' + e.id + '"></div><div class="pricing-info"><ul><li>' + e.shipment_total.key + ': <span class = "rupee">' + parseFloat(e.shipment_total.total).toFixed(2) + "</span></li><li>" + e.shipment_delivery_charge.key + ': <span class = "rupee">' + parseFloat(e.shipment_delivery_charge.total).toFixed(2) + " <sup>*</sup></span></li></ul></div></div>";
                    $(".shipment-container.summary").append(l), $.map(e.products, function (t) {
                        var a = "",
                            o = "",
                            s = "",
                            r = "";
                        a = "" != t.pieces ? t.pieces : t.net_wt, void 0 != t.product_type && "COMP" == t.product_type ? (o = "comp_product", s = "text-red", r = "Free") : (o = "", s = "rupee", r = parseFloat(t.base_price).toFixed(2));
                        var n = '<div class="item ' + o + '"><img src="' + t.image + '" alt="' + t.product_name + '"><div class="item-details"><p class="item-name">' + t.product_name + '</p><p class = "item-desc"><span class = "bold ' + s + '">' + r + '</span><span class = "bold">Qty : <i>' + t.quantity + "</i></span></p></div></div>";
                        return void 0 != t.product_type && "COMP" == t.product_type ? $(".shipment-container.summary").find(".items-holder-" + e.id).prepend(n) : $(".shipment-container.summary").find(".items-holder-" + e.id).append(n), !1
                    })
                })
            },
            getShipmentSummary: function () {
                localStorage.setItem("cart_value", ""), $(".coupon-apply .coupon-status").html(" ");
                var e = $(".get-shipmentsummary-url").data("url");
                fn.checkout_oos.ajaxForm({}, "GET", e).done(function (e) {
                    localStorage.setItem("current_coupon", ""), fn.checkout_oos.renderShipmentSummary(e), fn.checkout_oos.applyCoupon(), fn.checkout_oos.resetCoupon()
                })
            },
            confirm_shipments: function () {
                $(".checkout-shipment-summary").on("click", function (e) {
                    var t = this;
                    e.stopImmediatePropagation();
                    var a = JSON.parse(localStorage.getItem("DeliverySlots")),
                        o = JSON.parse(localStorage.getItem("DeliveryInfo")),
                        s = !1;
                    if (s = a.length == o.length, 1 == s) {
                        var r, n, i;
                        ! function () {
                            var e = function (e) {
                                    fn.checkout_oos.showAlert(e, "change", "addr"), fn.checkout_oos.updateCartLocation(n, i), fn.checkout_oos.changeAddressAlert(), $(".pages.delivery-details").removeClass("loader-div complete"), r.css("opacity", "1"), r.prop("disabled", !1)
                                },
                                a = function () {
                                    fn.checkout_oos.ajaxForm({}, "POST", "/checkout_oos/lock-shipment").done(function (e) {
                                        var t = JSON.parse(e);
                                        "success" == t.status ? ($(".pages.delivery-details").addClass("complete"), setTimeout(function () {
                                            fn.checkout_oos.navigate(fn.checkout_oos.summary_page), $(".delivery-addr").find(".close-change-addr").hide(), $(".delivery-addr").find(".change-addr").show(), $(".delivery-addr").find(".addr-container").hide()
                                        }, 500)) : "OOS_ERROR" == t.status && (fn.checkout_oos.showAlert(t.message, "goto", "items"), fn.checkout_oos.gotoCart())
                                    }).always(function () {
                                        setTimeout(function () {
                                            $(".pages.delivery-details").removeClass("loader-div complete"), r.css("opacity", "1"), r.prop("disabled", !1)
                                        }, 600)
                                    })
                                };
                            r = $(t), n = localStorage.getItem("default_addr_lat"), i = localStorage.getItem("default_addr_lng"), $(".pages.delivery-details").addClass("loader-div"), r.css("opacity", "0.5").prop("disabled", !0), fn.checkout_oos.verifyService(n, i).done(function (t) {
                                var o = JSON.parse(t);
                                200 == o.code ? e(o.message) : "ERROR" == o.status || "LOCATION_CHANGED" == o.status ? e(o.message) : "SERVICABLE" == o.status && null != o.data ? fn.checkout_oos.ajaxForm({
                                    location: o.data.address,
                                    lat: o.data.lat,
                                    lng: o.data.lng,
                                    clearcart: "false"
                                }, "POST", "/get-location").done(function (e) {
                                    "success" == e.result && (fn.checkout_oos.getShipments(), $(".location-name").html(o.data.address), $(".location-name").attr("title", o.data.address), fn.checkout_oos.hideAlert(), a())
                                }) : a()
                            })
                        }()
                    } else $(".alert-screen-slots.select-slot").css("display", "block"), $("body").addClass("noscroll"), $(".btn.slots-button").on("click", function (e) {
                        var t = JSON.parse(localStorage.getItem("DeliverySlots")),
                            a = JSON.parse(localStorage.getItem("DeliveryInfo"));
                        $(".alert-screen-slots.select-slot").css("display", "none"), $("body").removeClass("noscroll");
                        var o = !1,
                            s = -1;
                        $.map(a, function (e, a) {
                            if (t.indexOf(e.id) == -1) {
                                var r = $(".slots-selector-" + e.id);
                                r.css("border", "1px solid #de1e36"), 0 == o && (o = !0, s = e.id)
                            }
                        }), $(window).scrollTop($(".slots-selector-" + s).offset().top - 100)
                    })
                })
            },
            editShipments: function () {
                $(".edit-shipments").on("click", function () {
                    fn.checkout_oos.navigate(fn.checkout_oos.delivery_page)
                })
            },
            resetCoupon: function () {
                $(".coupon-wrapper").removeClass("validate"), $(".coupon-wrapper").removeClass("error"), $(".coupon-wrapper").removeClass("coupon-applied"), $(".coupon-wrapper").removeClass("coupon-removed"), $(".coupon-wrapper").find(".applyCoupon").show(), $(".coupon-wrapper").find(".coupon-code").val(""), $(".coupon-wrapper").find(".removeCoupon").hide()
            },
            setFinalPayment: function (e) {
                $(".checkout-payment-btn.cod").html("Place Order &#8377; " + parseFloat(e).toFixed(2)), $(".checkout-payment-btn.cod").attr("data-finalamt", parseFloat(e).toFixed(2)), $(".checkout-payment-btn").val("Pay now Rs. " + parseFloat(e).toFixed(2)), $(".checkout-payment-btn").attr("data-finalamt", parseFloat(e).toFixed(2)), $("#citrusAmount").val(parseInt(100 * e)), $(".set-finalPay").data("val", parseFloat(e).toFixed(2))
            },
            applyCoupon: function () {
                $(".coupon-wrapper").find(".applyCoupon").on("click", function (e) {
                    e.stopImmediatePropagation();
                    var t, a = $(".coupon-wrapper").find(".coupon-code").val(),
                        o = "/checkout_oos/apply-coupon/" + a;
                    "" == a ? $(".coupon-wrapper").addClass("validate") : fn.checkout_oos.ajaxForm({}, "POST", o).done(function (e) {
                        var o = JSON.parse(e);
                        if (t = "<span>" + o.message + "</span>", $(".freedelivery-wrapper .freedelivery-text").html(o.message), $(".freedelivery-wrapper").addClass("show"), setTimeout(function () {
                                $(".freedelivery-wrapper").removeClass("show")
                            }, 5e3), "success" == o.status) {
                            var s = '<li>Subtotal<span class = "rupee">' + parseFloat(o.cart.total).toFixed(2) + '</span></li><li>Delivery Charge <span class = "rupee">' + parseFloat(o.cart.shipping).toFixed(2) + '</span></li><li class = "text-red">Discount <span class = "rupee">' + parseFloat(o.cart.discount).toFixed(2) + '</span></li><li class = "amt-total" data-amount="' + parseFloat(o.cart.subtotal).toFixed(2) + '">Amount to pay<span class = "rupee">' + parseFloat(o.cart.subtotal).toFixed(2) + "</span></li>";
                            $(".citrusAmount").val(parseInt(100 * o.cart.subtotal)), $(".delivery-summary").find(".total-overview").html(s), localStorage.setItem("current_coupon", o.cart.coupon), localStorage.setItem("cart_value", o.cart.total - o.cart.discount), $(".coupon-wrapper").removeClass("validate"), $(".coupon-wrapper").find(".applyCoupon").hide(), $(".coupon-wrapper").find(".removeCoupon").show(), fn.checkout_oos.setFinalPayment(o.cart.subtotal), fn.checkout_oos.renderShipmentSummaryProduct(o.cart), fn.checkout_oos.removeCoupon(), clevertap.event.push("Coupon Applied", {
                                "Coupon Code": a,
                                "Total Amount": o.cart.total,
                                Discount: o.cart.discount,
                                "Payable Amount": o.cart.subtotal
                            })
                        } else $(".coupon-apply").hasClass("coupon-status") ? ($(".coupon-wrapper").removeClass("validate"), $(".coupon-wrapper").find(".coupon-code").val("").focus()) : ($(".coupon-wrapper").find(".applyCoupon").show(), $(".coupon-wrapper").find(".removeCoupon").hide(), $(".coupon-wrapper").removeClass("validate"), $(".coupon-wrapper").find(".coupon-code").val("").focus())
                    })
                })
            },
            removeCoupon: function () {
                $(".coupon-wrapper").find(".removeCoupon").on("click", function (e) {
                    e.stopImmediatePropagation();
                    var t, a = $(".coupon-wrapper").find(".coupon-code").val(),
                        o = "/checkout_oos/remove-coupon";
                    $(".amt-total").data("amount");
                    fn.checkout_oos.ajaxForm({}, "POST", o).done(function (e) {
                        $(".checkout-payment-btn").removeAttr("disabled").removeClass("disabled-btn");
                        var o = JSON.parse(e);
                        if (t = "<span>" + o.message + "</span>", $(".freedelivery-wrapper .freedelivery-text").html(o.message), $(".freedelivery-wrapper").addClass("show"), setTimeout(function () {
                                $(".freedelivery-wrapper").removeClass("show")
                            }, 5e3), "success" == o.status) {
                            var s = '<li>Subtotal <span class = "rupee">' + parseFloat(o.data.cart.total).toFixed(2) + '</span></li><li>Delivery Charge <span class = "rupee">' + parseFloat(o.data.cart.shipping).toFixed(2) + '</span></li><li class = "text-red">Discount <span class = "rupee">' + parseFloat(o.data.cart.discount).toFixed(2) + '</span></li><li class = "amt-total" data-amount="' + parseFloat(o.data.cart.subtotal).toFixed(2) + '">Amount to pay<span class = "rupee">' + parseFloat(o.data.cart.subtotal).toFixed(2) + "</span></li>";
                            $(".citrusAmount").val(parseInt(100 * o.data.cart.subtotal)), $(".delivery-summary").find(".total-overview").html(s), $(".coupon-wrapper").removeClass("coupon-applied"), localStorage.setItem("current_coupon", ""), localStorage.setItem("cart_value", o.data.cart.total), $(".coupon-wrapper").find(".applyCoupon").show(), $(".coupon-wrapper").find(".removeCoupon").hide(), $(".coupon-wrapper").find(".coupon-code").val("").focus(), fn.checkout_oos.setFinalPayment(o.data.cart.subtotal), fn.checkout_oos.renderShipmentSummaryProduct(o.data.cart), clevertap.event.push("Coupon Removed", {
                                "Coupon Code": a,
                                "Total Amount": o.data.cart.total,
                                Discount: o.data.cart.discount,
                                "Payable Amount": o.data.cart.subtotal
                            })
                        } else $(".coupon-wrapper").hasClass("coupon-status") ? ($(".coupon-wrapper").removeClass("validate"), $(".coupon-wrapper").find(".coupon-code").val("").focus()) : $(".coupon-wrapper").find(".coupon-code").val("").focus()
                    })
                })
            },
            confirm_order: function () {
                $(".proceed-payment").on("click", function () {
                    var e = $(this);
                    $(".pages.delivery-summary").addClass("loader-div"), $(".coupon-apply .coupon-status").html(" "), e.css("opacity", "0.5").prop("disabled", !0), fn.checkout_oos.ajaxForm({}, "POST", "/checkout_oos/lock-shipment").done(function (e) {
                        var t = JSON.parse(e);
                        "success" == t.status ? ($(".pages.delivery-summary").addClass("complete"), setTimeout(function () {
                            fn.checkout_oos.navigate(fn.checkout_oos.payment_page), $(".delivery-addr").find(".close-change-addr").hide(), $(".delivery-addr").find(".change-addr").show(), $(".delivery-addr").find(".addr-container").hide()
                        }, 500)) : "OOS_ERROR" == t.status && (fn.checkout_oos.showAlert(t.message, "goto", "items"), fn.checkout_oos.gotoCart())
                    }).always(function () {
                        setTimeout(function () {
                            $(".pages.delivery-summary").removeClass("loader-div complete"), e.css("opacity", "1").prop("disabled", !1)
                        }, 600)
                    })
                })
            },
            getOrderHistory: function () {
                var e = "/checkout_oos/get-order-history";
                fn.checkout_oos.ajaxForm({}, "GET", e).done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status && ($(".order-history-container").html(""), $(".order-count").html(t.orders.length), $.map(t.orders, function (e, t) {
                        var a = e.created_at.split(/[^0-9]/),
                            o = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]),
                            s = o.getDate(),
                            r = o.getMonth(),
                            n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            i = o.getFullYear(),
                            l = o.getHours(),
                            d = l < 12 ? "AM" : "PM",
                            l = l % 12;
                        l = l ? l : 12, hours = l < 10 ? "0" : "", minute = o.getMinutes(), min = minute < 10 ? "0" : "", selected = 0 == t ? "active" : "", order = ' <div class="parent-order" data-orderid="' + e.order_id + '" data-itemcount="' + e.items + '"><div class="order-header"><div class="status-icon ' + e.status.replace(" ", "-").toLowerCase() + '"></div><div class="order-details"><div class="order-placed">Order Placed On: <span class = "text-red">' + s + " " + n[r] + " " + i + " (" + hours + l + ":" + min + minute + " " + d + ")</span> (Items " + e.items + ')</div><div class="order-status">STATUS : <span class="text-red">' + e.status + '</span></div></div><a href =" /order-status/' + e.order_id + '" class="track-btn">Track Order</a></div>', $(".order-history-container").append(order)
                    })), fn.checkout_oos.getOrderShipments()
                })
            },
            getOrderShipments: function (e) {
                $(".parent-order").click(function () {
                    var e = $(this),
                        t = e.data("orderid"),
                        a = "/checkout_oos/get-order-shipments/" + t,
                        o = e.data("itemcount");
                    $(".parent-order").removeClass("active"), fn.checkout_oos.ajaxForm({}, "GET", a).done(function (t) {
                        var a = JSON.parse(t);
                        if ("success" == a.status) {
                            e.find(".shipments-history").html(""), $.map(a.orders, function (t, a) {
                                var s = 0;
                                $.map(t.items, function (e) {
                                    s += e.quantity
                                });
                                var r = new Date(t.order_processing_date).getDate(),
                                    n = new Date(t.order_processing_date).getMonth(),
                                    i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    l = new Date(t.order_processing_date).getFullYear(),
                                    d = (new Date(t.order_processing_date).getHours(), new Date(t.order_processing_date).getMinutes(), 1 == t.express ? t.express_message : t.sheduled_time),
                                    c = '<div class="shipment"><div class="status-icon ' + t.status.replace(" ", "-").toLowerCase() + '"></div><div class="shipment-details"><div class="shipment-header"><div class="shipment-title">Delivery Date <span class="text-red">' + r + " " + i[n] + " " + l + "(" + d + ')</span><span class = "text-small"> ( Items ' + s + " of " + o + ' )</span></div><div class="shipment-status">STATUS:  <span class="text-red">' + t.status + '</span></div><div class="order-number">Order Number:' + t.order_id + '</div></div><ul class="products ' + t.order_id + '"></ul><div class="delivery-timeline ' + t.status + '"><div class = "milestone op"><span>Order Placed</span></div><div class = "milestone oa"><span>Order Accepted</span></div><div class = "milestone dv"><span>Out for Delivery</span></div><div class = "milestone dd"><span>Delivered</span></div></div><div class="delivery-value"><ul><li>Delivery Value <span class = "rupee">' + parseFloat(t.subtotal_with_key.value).toFixed(2) + '</span></li><li>Delivery Charge <span class = "rupee">' + parseFloat(t.shipping_charges).toFixed(2) + "</span></li></ul></div></div></div>";
                                e.find(".shipments-history").append(c), $.map(t.items, function (e) {
                                    var t = '<li><img src="' + e.pr_image + '"alt="' + e.pr_name + '"><div class="product-details"><div class="product-name">' + e.pr_name + '</div><div class="product-price"> <span class = "rupee">' + e.price + '</span> <span class = "">Qty ' + e.quantity + "</span></div></div></li>";
                                    $(".products." + e.order_id).append(t)
                                })
                            });
                            var s = '<li>Subtotal <span class = "rupee">' + a.order_summary.total.value + '</span></li><li>Delivery Charge <span class = "rupee">' + a.order_summary.shipping.value + '</span></li><li class="text-red">Discount <span class = "rupee">' + a.order_summary.discount.value + '</span></li><li class="total-amt">Amount Paid <span class = "rupee">' + a.order_summary.grand_total.value + "</span></li>";
                            e.find(".total-shipemnt-value ul").html(s), e.addClass("active")
                        }
                    }).always(function () {})
                })
            },
            getWalletInfo: function () {
                fn.checkout_oos.ajaxForm({}, "POST", "/checkout_oos/get-wallet-info").done(function (e) {
                    var t = JSON.parse(e);
                    if ("success" == t.status) {
                        var a = t.data.wallet,
                            o = '<div class="modal-head h-lato-bold">Know your Wallet</div><ul><li>Licious cash+<div class="right h-ssp-semi-bold">' + a.licious_cashp + '</div></li><li>Licious cash<div class="right h-ssp-semi-bold">' + a.licious_cash + '</div></li><li class="li-border-top">Total Amount<div class="right h-ssp-semi-bold">' + a.payable_wallet_amount + "</div></li></ul>",
                            s = '<li>Your Licious Cash+ balance is<div class="right">' + a.promotional_balance + '</div></li><li>Your Licious Cash balance is <div class="right">' + a.transactional_balance + "</div></li>";
                        $(".wallet-details").html(o), $(".licious-summary").html(s), $(".lc-wallet-amount.balance").html("&#8377;" + a.payable_wallet_amount)
                    }
                })
            },
            ajaxForm: function (e, t, a) {
                return $.ajax({
                    url: a,
                    type: t,
                    data: e,
                    timeout: 2e5,
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
                    }
                })
            },
            ajaxFormNC: function (e, t, a) {
                return $.ajax({
                    url: a,
                    type: t,
                    data: e,
                    timeout: 2e4
                })
            },
            navigate: function (e) {
                var t = window.location.href;
                t = t.replace(location.hash, ""), window.location.href = t + "#" + e, $(window).scrollTop(0, 0)
            },
            codEligible: 0,
            codEligibleMsg: "",
            run: function () {
                fn.checkout_oos.showSlots(), fn.checkout_oos.setPageInit(), fn.checkout_oos.confirm_items(), fn.checkout_oos.confirm_shipments(), fn.checkout_oos.confirm_order(), fn.checkout_oos.addAddr(), fn.checkout_oos.closeChangeAddress()
            }
        },
        userLogin: {
            validateUser: function (e) {
                $(".user-form .btn.submitForm").on("click", function (e) {
                    e.stopImmediatePropagation();
                    var t = $(this),
                        a = t.data("type"),
                        o = $(".user-form." + t.data("form")),
                        s = /^[6789]\d{9}$/,
                        r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        n = /^[a-zA-Z ]{2,30}$/,
                        i = o.find(".name").val(),
                        l = o.find(".email").val(),
                        d = o.find(".mobileno").val(),
                        c = o.find(".password").val(),
                        u = !1,
                        p = {
                            name: {
                                val: i
                            },
                            email: {
                                val: l
                            },
                            mobile: {
                                val: d
                            },
                            password: {
                                val: c
                            }
                        };
                    if ($.each(p, function (e, t) {
                            if ("" == t.val) {
                                switch (u = !1, e) {
                                    case "name":
                                        "" == t.val ? o.find(".name").parent().find("span").html("Required Field") : o.find(".name").parent().find("span").html("");
                                        break;
                                    case "email":
                                        "" == t.val ? o.find(".email").parent().find("span").html("Required Field") : o.find(".email").parent().find("span").html("");
                                        break;
                                    case "mobile":
                                        "" == t.val ? o.find(".mobileno").parent().find("span").html("Required Field") : o.find(".mobileno").parent().find("span").html("");
                                        break;
                                    case "password":
                                        "" == t.val ? o.find(".password").parent().find("span").html("Required Field") : o.find(".password").parent().find("span").html("")
                                }
                                return !1
                            }
                            switch (e) {
                                case "name":
                                    n.test(t.val) ? (o.find(".name").parent().find("span").html(""), u = !0) : (o.find(".name").parent().find("span").html("Name should not contain numbers and special characters"), u = !1);
                                    break;
                                case "email":
                                    r.test(t.val) ? (o.find(".email").parent().find("span").html(""), u = !0) : (o.find(".email").parent().find("span").html("Please provide with valid email id"), u = !1);
                                    break;
                                case "mobile":
                                    s.test(t.val) ? (o.find(".mobileno").parent().find("span").html(""), u = !0) : (o.find(".mobileno").parent().find("span").html("Mobile number should start with 6/7/8/9 and have 10 digits only"), u = !1)
                            }
                        }), u) switch (o.find("div span").html(""), $(this).prop("disabled", !0), $(this).addClass("disabled"), a) {
                        case "save-user":
                            fn.userLogin.userSignup(p, o)
                    }
                })
            },
            userSignup: function (e, t) {
                $(".cat-list").addClass("loader-div spaced"), t.find(".btn").prop("disabled", !0), t.find(".btn").addClass("disabled"), fn_home.ajaxForm({
                    name: e.name.val,
                    email: e.email.val,
                    phone: e.mobile.val,
                    password: e.password.val
                }, "POST", "/customer/signup").done(function (e) {
                    var a = JSON.parse(e);
                    "success" == a.status ? fn.userLogin.sendOTP(a.data.phone, a.data.customer_key) : ($(".cat-list").addClass("complete"), Materialize.toast(a.message, 3e3), setTimeout(function () {
                        $(".cat-list").removeClass("complete spaced loader-div")
                    }, 1e3), t.find(".btn").prop("disabled", !1), t.find(".btn").removeClass("disabled"))
                })
            },
            sendOTP: function (e, t) {
                fn_home.ajaxForm({
                    phone: e,
                    customer_id: t
                }, "POST", "/customer/send-otp").done(function (e) {
                    var t = JSON.parse(e);
                    "success" == t.status ? ($(".cat-list").addClass("complete"), localStorage.setItem("OTP", t.otp), window.location.href = "/customer/verify-otp-page") : (Materialize.toast(t.message, 3e3), setTimeout(function () {
                        $(".cat-list").removeClass("complete spaced loader-div")
                    }, 1e3))
                })
            },
            requestOTP: function () {
                var e = $(".request-otp-form"),
                    t = /^[6789]\d{9}$/;
                e.find(".request-otp").on("click", function () {
                    var a = e.find(".request-otp-number").val();
                    null == a || "" == a ? e.find(".otp-error").html("Please provide your mobile number") : (e.find(".otp-error").html(""), t.test(a) ? ($(".cat-list").addClass("loader-div spaced"), fn_home.ajaxForm({
                        phone: a
                    }, "POST", "/customer/request-otp").done(function (e) {
                        var t = JSON.parse(e);
                        "success" == t.status ? ($(".cat-list").addClass("complete"), localStorage.setItem("OTP", t.otp), window.location.href = "/customer/verify-otp-page") : (Materialize.toast(t.message, 3e3), setTimeout(function () {
                            $(".cat-list").removeClass("complete spaced loader-div")
                        }, 1e3))
                    }), e.find(".otp-error").html("")) : e.find(".otp-error").html("Mobile number should start with 6/7/8/9 and have 10 digits only"))
                })
            },
            verifyOTP: function () {
                var e = $(".verify-otp-form"),
                    t = /^[0-9]$/;
                e.find(".btn.verify-otp").on("click", function () {
                    var a = e.find(".cust_number").val(),
                        o = e.find(".otp_number").val();
                    null == o || "" == o ? e.find(".otp-error").html("Please input with OTP sent on your above mobile number") : t.test(o) ? e.find(".otp-error").html("OTP can be a number between 0-9 only") : ($(".cat-list").addClass("loader-div spaced"), fn_home.ajaxForm({
                        phone: a,
                        otp: o
                    }, "POST", "/customer/verify-otp").done(function (e) {
                        if ("success" == e.status) switch ($(".cat-list").addClass("complete"), e.redirect) {
                            case "loadmoney":
                                window.location.href = "/user/profile";
                                break;
                            case "checkout":
                                window.location.href = "/user/checkout";
                                break;
                            case "profile":
                                window.location.href = "/user/profile";
                                break;
                            default:
                                window.location.href = "/"
                        } else {
                            var t = JSON.parse(e);
                            $(".cat-list").addClass("complete"), Materialize.toast(t.message, 3e3), setTimeout(function () {
                                $(".cat-list").removeClass("complete spaced loader-div")
                            }, 1e3)
                        }
                    }))
                })
            },
            userLogin: function () {
                $(".user-form .btn.login").on("click", function (e) {
                    var t = $(".user-login"),
                        a = t.find(".user-id").val(),
                        o = t.find(".user-password").val(),
                        s = !1,
                        r = /^\d+$/,
                        n = /^[6789]\d{9}$/,
                        i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    "" == a || "" == o ? Materialize.toast("Please provide with login details", 3500) : (r.test(a) ? n.test(a) ? s = !0 : (s = !1, Materialize.toast("Mobile number should start with 6/7/8/9 and have 10 digits only", 3500)) : i.test(a) ? s = !0 : (s = !1, Materialize.toast("Please provide with valid email id", 3500)), s ? ($(".cat-list").addClass("loader-div spaced"), fn_home.ajaxForm({
                        userId: a,
                        password: o
                    }, "POST", "/customer/login").done(function (e) {
                        var t = e;
                        if ("success" == t.status) switch ($(".cat-list").addClass("complete"), e.redirect) {
                            case "loadmoney":
                                window.location.href = "/user/profile";
                                break;
                            case "checkout":
                                window.location.href = "/user/checkout";
                                break;
                            case "profile":
                                window.location.href = "/user/profile";
                                break;
                            default:
                                window.location.href = "/"
                        } else "verify-otp" == t.status ? window.location.href = "/customer/verify-otp-page" : ($(".cat-list").addClass("complete"), Materialize.toast(e.message, 3e3), setTimeout(function () {
                            $(".cat-list").removeClass("complete spaced loader-div")
                        }, 1e3))
                    })) : Materialize.toast("Please provide valid login creds", 3500))
                })
            },
            resetPass: function () {
                $(".reset-pass").on("click", function () {
                    var e = $(".reset-pass-container").find(".reset-num").val(),
                        t = /^[6789]\d{9}$/;
                    "" == e ? Materialize.toast("Please enter your mobile number", 3e3) : t.test(e) ? fn_home.ajaxForm({
                        phone: e
                    }, "POST", "/customer/reset-pass").done(function (e) {
                        var t = JSON.parse(e);
                        "success" == t.status ? (Materialize.toast(t.message, 3e3), window.location.href = "/signin/profile") : Materialize.toast(t.message, 3e3)
                    }) : Materialize.toast("Please provide a valid mobile number", 3e3)
                })
            },
            run: function () {
                this.validateUser(), this.userLogin(), this.resetPass()
            }
        },
        run: function () {
            fn.address.run(), fn.checkout.run(), fn.user.run(), fn.userLogin.run(), fn.add_message.close()
        }
    }, fn.run()
}), $(document).ready(function () {
    $("#reviewSubmitPopup").click(function (e) {
        e.preventDefault();
        var t, a;
        t = document.getElementById("rating-input-1-5").checked ? 5 : document.getElementById("rating-input-1-4").checked ? 4 : document.getElementById("rating-input-1-3").checked ? 3 : document.getElementById("rating-input-1-2").checked ? 2 : document.getElementById("rating-input-1-1").checked ? 1 : 0, a = document.getElementById("rating0-input-1-5").checked ? 5 : document.getElementById("rating0-input-1-4").checked ? 4 : document.getElementById("rating0-input-1-3").checked ? 3 : document.getElementById("rating0-input-1-2").checked ? 2 : document.getElementById("rating0-input-1-1").checked ? 1 : 0;
        var o = document.getElementById("review_text").value,
            s = document.getElementById("product_id").value,
            r = $("h3").attr("data-productname"),
            n = $("#username").text(),
            i = {
                delivery_rating: a,
                product_id: s,
                product_rating: t,
                review_text: o,
                productName: r,
                username: n
            };
        console.log(i), $.ajax({
            url: "/send/reviews",
            type: "post",
            headers: {
                "X-CSRF-Token": $("input[name=_token]").attr("value")
            },
            data: i,
            success: function (e) {
                "success" == e ? ($("#reviewSubmitPopup").prop("disabled", !0), Materialize.toast("Review Added. Thank you for your valuable feedback :)", 2e3), setTimeout(function () {
                    location.reload()
                }, 3e3)) : ($("#reviewSubmitPopup").prop("disabled", !1), Materialize.toast("It seems theres some problem adding your review. Please Try again later:)", 2e3))
            }
        })
    }), $("#ingredientsbtn").click(function () {
        $("#methoddiv").addClass("hidden"), $("#ingredientsdiv").removeClass("hidden"), $("#ingredientsbtn").addClass("lec-redfont"), $("#methodbtn").removeClass("lec-redfont"), $("#methodbtn").addClass("black-text")
    }), $("#methodbtn").click(function () {
        $("#methoddiv").removeClass("hidden"), $("#ingredientsdiv").addClass("hidden"), $("#methodbtn").addClass("lec-redfont"), $("#ingredientsbtn").removeClass("lec-redfont"), $("#ingredientsbtn").addClass("black-text")
    })
});
var response_data = {},
    DELIVERY_CLASS = "delivery",
    PRODUCTS_CLASS = "products";
ratingEventData = {}, ratingEventData.prod_rate = [], rr_fn = {
    rating_response: {},
    getReviewRating: function (e, t) {
        if ($(".rating-wrap").show(), "Home page" === e) var a = "/home_page/get-reviewrating",
            o = "",
            s = "GET";
        else var a = "/get-reviewratingbyid",
            o = {
                shipment_id: t
            },
            s = "POST";
        rr_fn.ajaxForm(o, s, a).done(function (t) {
            try {
                var a = JSON.parse(t),
                    o = !0;
                if (200 === a.statusCode) {
                    var o = !0;
                    if (console.log("www"), o) {
                        var s = a.data.basic_info,
                            r = '<div class="review-call-title">' + s.call_customer_care_text + '<img class="call-icon" src="/img/callback.svg" /></div>',
                            n = "Home page" === e ? '<div class="review-cross"></div>' : "",
                            i = '<div class="rr-wrap"><div class="review-top"><div class="review-img-wrap"><div class="review-prod-image"><a href="/review-ratings/' + a.data.shipment_id + '"><img src="' + s.item_images[0] + '"></a></div></div><div class="review-wrapper">' + n + '<a href="/review-ratings/' + a.data.shipment_id + '"><div class="review-head">' + s.rating_title + '<img src="/img/arrow.png" /></div><div class="review-title1">' + s.items_message + ' </div><div class="review-title2"><span>Shipment ID: ' + a.data.shipment_id + '</span> <span class="pipe"> | </span> <span>' + s.delivery_date + '</span></div></a></div></div><div class="review-bottom">' + r + "</div></div>";
                        $(document).on("click", ".review-call-title", function (e) {
                            r = '<a href="tel:' + s.phone + '" class="rating-clicktocall"><div class="review-call-title2">Not received your order? Call:' + s.phone + '<img class="call-icon" src="/img/callback.svg" /></div></a>', $(".review-bottom").html(r)
                        }), $(".review-rating-modal").html(i);
                        var l = {},
                            d = a.data.event_info;
                        l.from_module = e, l.shipment_id = a.data.shipment_id, l.shipment_type = d.shipment_type, l.split = d.split.toString(), l.city = d.city, l.hub = s.hub, l.user_type = d.customer_type, l.item_count = s.item_list.length, l.item_list = s.item_list.map(function (e) {
                            return e.pr_name
                        }).join(), l.category_list = d.category_list, l.amount = d.amount.toString(), l.discount = d.discount.toString();
                        var c = new Date(d.delivered_date.split("T")[0]);
                        l.delivered_date = c.toLocaleDateString().replace(/\//g, "-");
                        var u = new Date(d.order_date.split("T")[0]);
                        l.order_date = u.toLocaleDateString().replace(/\//g, "-"), $(".rating-clicktocall").click(function (e) {
                            var t = new Date;
                            l.submit_date = t.getDate() + "-" + (t.getMonth() + 1) + "-" + t.getFullYear(), l.Source = "rate_order"
                        }), $(".review-cross").click(function (e) {
                            $(".review-rating-wrapper").addClass("hide"), console.log("rate_close - " + JSON.stringify(l)), $(".review-rating-container").hide(), fn_home.ajaxForm({
                                shipment_id: a.data.shipment_id
                            }, "POST", "/ignore-reviewrating").done(function (e) {})
                        })
                    }
                    $(".review-rating-container").show()
                }
            } catch (p) {
                console.log(p)
            }
        })
    },
    filterAttributesByrateLevel: function (e, t, a) {
        var o = [];
        return o = t == PRODUCTS_CLASS ? rr_fn.products_attributes.filter(function (t) {
            return t.level == e && t.pr_id == a
        }).map(function (e) {
            return {
                option_id: e.option_id,
                value: e.value
            }
        }) : rr_fn.delivery_attributes.filter(function (t) {
            return t.level == e
        }).map(function (e) {
            return {
                option_id: e.option_id,
                value: e.value
            }
        }), console.log(o), o
    },
    removeUnreviewedItems: function (e) {
        return e.map(function (e) {
            var t = [];
            e["class"] == PRODUCTS_CLASS ? e.product_data.map(function (a, o) {
                null != a.response_rateRange && (a.attributes || (t = rr_fn.filterAttributesByrateLevel(a.response_rateRange, e["class"], a.product_id), e.product_data[o].attributes = t))
            }) : null != e.response_rateRange && (e.attributes || (t = rr_fn.filterAttributesByrateLevel(e.response_rateRange, e["class"], null), e.attributes = t))
        }), e.map(function (e) {
            e["class"] == PRODUCTS_CLASS && null != e.product_data && "undefined" != typeof e.product_data && e.product_data.length > 0 && (e.product_data = e.product_data.filter(function (e) {
                return null != e.response_rateRange
            }))
        }), e
    },
    delivery_attributes: [],
    products_attributes: [],
    validateproductClassObject: function (e, t) {
        return !!(rr_fn && rr_fn.rating_response && rr_fn.rating_response.response_data && rr_fn.rating_response.response_data[e] && rr_fn.rating_response.response_data[e].product_data && rr_fn.rating_response.response_data[e].product_data[t])
    },
    validateResponseData: function (e, t) {
        return "undefined" != typeof e && null != e && "undefined" != typeof t && null != t
    },
    validatedeliveryClassObject: function (e) {
        return !!(rr_fn && rr_fn.rating_response && rr_fn.rating_response.response_data && rr_fn.rating_response.response_data[e])
    },
    filterSelectedOptions: function (e, t, a, o) {
        var s = [];
        a === PRODUCTS_CLASS ? (s = rr_fn.products_attributes.filter(function (t) {
            return t.level == e && o == t.pr_id
        }).map(function (e) {
            return e.option_id == t && (e.value = !0), {
                option_id: e.option_id,
                value: e.value
            }
        }), rr_fn.validateproductClassObject(a, o) && (rr_fn.rating_response.response_data[a].product_data[o].attributes = s)) : (s = rr_fn.delivery_attributes.filter(function (t) {
            return t.level == e
        }).map(function (e) {
            return e.option_id == t && (e.value = !0), {
                option_id: e.option_id,
                value: e.value
            }
        }), rr_fn.validatedeliveryClassObject(a) && (rr_fn.rating_response.response_data[a].attributes = s))
    },
    setRating: function (e, t) {
        var a = $(e).attr("index"),
            o = Number(a.split("-")[2]),
            s = a.split("-")[0];
        if ($(".quest-main-" + s + " .level-quest").hide(), $(".submit-button").addClass("active"), $(".submit-button").attr("disabled", !1), $(".rating-card").removeClass("disable-card"), s.toLowerCase() == PRODUCTS_CLASS) {
            var r = $(e).attr("pr_id");
            rr_fn.rating_response.response_data[s].product_data[r].response_rateRange = o, $("#litab-" + r).attr("rateval", o)
        } else rr_fn.rating_response.response_data[s].response_rateRange = o;
        if (o <= 3 && 0 == rr_fn.rating_response.showReceiveCall && (rr_fn.rating_response.showReceiveCall = !0, $(".rate-check-cc").removeClass("hide")), $(".quest-main-" + s + " .levelQ-" + $(e).attr("index")).show(), "undefined" != typeof t)
            if (s.toLowerCase() == PRODUCTS_CLASS) {
                var n = Number(a.split("-")[1]) + 1;
                ratingEventData.prod_rate[n] = $(e).attr("data-prname") + o, console.log(ratingEventData.prod_rate), ratingEventData.product_rating = ratingEventData.prod_rate.join(), rr_fn.eventsTracking("rate_screen_choose_product", t, {
                    product_rating: ratingEventData.product_rating,
                    product_position: n
                })
            } else ratingEventData.delivery_rating = o, rr_fn.eventsTracking("ratescreen_choosedelivery", t, {
                delivery_rating: o
            })
    },
    ajaxForm: function (e, t, a) {
        return $.ajax({
            url: a,
            type: t,
            data: e,
            timeout: 2e4,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content"),
                "Cache-Control": "private, no-cache, no-store, must-revalidate",
                Expires: "-1",
                Pragma: "no-cache"
            }
        })
    },
    getReviewRatingPopup: function (e) {
        rr_fn.ajaxForm({
            shipment_id: e
        }, "POST", "/get-reviewratingbyid").done(function (e) {
            try {
                var t = JSON.parse(e);
                if (200 === t.statusCode) {
                    var a = t.data;
                    rr_fn.rating_response.shipment_id = a.shipment_id, rr_fn.rating_response.customer_key = a.customer_key, rr_fn.rating_response.receive_call_from_chc = !1, rr_fn.rating_response.response_textQuestion = "";
                    var o = [];
                    rr_fn.rating_response.showReceiveCall = !1;
                    var s = a.basic_info,
                        r = '<div class="review-top"><div class="review-img-wrap"><div class="review-prod-image"><img src="' + s.item_images[0] + '"></div></div><div class="review-wrapper"><div class="review-head">' + s.items_message + '</div><div class="review-title2">Shipment ID: ' + a.shipment_id + ' <span class="pipe"> | </span>' + s.delivery_date + "</div></div></div>";
                    $.map(a.feedbackItems, function (e, t) {
                        try {
                            response_data = {
                                "class": e["class"],
                                feedback_id: e.feedback_id
                            };
                            var a = e["class"].toLowerCase() == PRODUCTS_CLASS ? "disable-card" : "";
                            if (r += '<div class="rating-card ' + a + '"><div class="rating-heading">' + e.classQuestion + "</div>", e["class"].toLowerCase() == PRODUCTS_CLASS) {
                                var s = rateContent = "",
                                    n = [];
                                $.map(e.product_data, function (t, a) {
                                    s += "<li " + (0 == a ? 'class="active"' : "") + ' id="litab-' + t.product_id + '" index="' + a + '" rateval="0">' + t.pr_name + "</li>", rateContent += '<div id="' + t.product_id + '" class="prod-rate-box pr-rate-main-' + a + '" ' + (0 != a ? 'style="display:none"' : "") + '><div class="rate">';
                                    for (var o = t.rateRange; o > 0; o--) rateContent += '<input type="radio" id="product_star-' + o + "-" + t.product_id + '" name="rate-products" value="' + o + '" /><label class="rate-star-label" for="product_star-' + o + "-" + t.product_id + '" index="' + e["class"].toLowerCase() + "-" + a + "-" + o + '" pr_id="' + t.product_id + '" data-prname="' + t.pr_name + '"></label>';
                                    rateContent += "</div>", rateContent += rr_fn.getRatingReviewQuestions(t.rateLevel, e["class"].toLowerCase(), a, t.product_id, t.pr_name), rateContent += "</div>", n[t.product_id] = {
                                        product_id: t.product_id
                                    }, response_data.product_data = n
                                }), r += '<div class="pr-rate"><div class="pr-tab"><ul>' + s + "</ul></div>" + rateContent + "</div>"
                            } else {
                                r += '<div class="rate">';
                                for (var i = e.rateRange; i > 0; i--) r += '<input type="radio" id="delivery_star' + i + '" name="rate-delivery" value="' + i + '" /><label for="delivery_star' + i + '" class="rate-star-label" index="' + e["class"].toLowerCase() + "-0-" + i + '" ></label>';
                                r += "</div> ", r += rr_fn.getRatingReviewQuestions(e.rateLevel, e["class"].toLowerCase(), 0, null, null)
                            }
                            r += "</div>", o[e["class"]] = response_data, rr_fn.rating_response.response_data = o, console.log(rr_fn.rating_response), console.log({
                                del: rr_fn.delivery_attributes
                            }), console.log({
                                pro: rr_fn.products_attributes
                            })
                        } catch (l) {
                            console.log(l)
                        }
                    }), r += '<div class="rating-card disable-card"><div class=""><span class="rating-heading"> ' + s.textQuestion + ' </span><textarea id="story" name="story" rows="2" cols="36" placeholder="Leave a comment" class="txtArea"></textarea></div></div><div class="bottom-margin"></div>', r += '<footer class="rate-bottom"><button type="submit" class="submit-button" disabled = true value="Submit"><div>Submit</div></button></footer>', $(".review-rating-main").html(r), $(".rate-star-label").on("click", function () {
                        rr_fn.setRating(this, a)
                    }), $(".pr-tab li").click(function (e) {
                        rr_fn.clickProductTab(this)
                    }), $("#receiveCall").click(function () {
                        rr_fn.rating_response.receive_call_from_chc = !0
                    }), console.log("====" + JSON.stringify(o)), $(".submit-button").on("click", function () {
                        rr_fn.submitReview(t.data)
                    }), $("#story").change(function (e) {
                        e.stopImmediatePropagation(), rr_fn.rating_response.response_textQuestion = e.target.value.substr(0, 50), console.log(rr_fn.rating_response.response_textQuestion)
                    }), $(".checkmark").on("click", function () {
                        rr_fn.setOptionCheckMark(this, t.data)
                    })
                } else $(".review-rating-main").html('<div class="rr-message">' + t.data + "</div>");
                $(".close-button").on("click", function () {
                    window.history.go(-1), rr_fn.eventsTracking("ratescreen_close", t.data)
                })
            } catch (n) {
                console.log(n)
            }
        })
    },
    clickProductTab: function (e) {
        var t = $(e).attr("index");
        $(".pr-tab li").removeClass("active"), $(".pr-tab li[index='" + t + "']").addClass("active"), $(".prod-rate-box").css("display", "none"), $(".pr-rate-main-" + t).css("display", "block");
        var a = $(e).attr("id");
        if (0 != $("#" + a).attr("rateval") && "undefined" != typeof $("#" + a).attr("rateval")) {
            var o = a.split("-")[1],
                s = $("#" + o + ' .rate label[for="product_star-' + $("#" + a).attr("rateval") + "-" + o + '"]');
            $("#product_star-" + $("#" + a).attr("rateval") + "-" + o).click(), rr_fn.setRating(s)
        }
    },
    setOptionCheckMark: function (e, t) {
        var a = $(e).attr("index"),
            o = a.split("-")[0],
            s = a.split("-")[1],
            r = a.split("-")[2],
            n = null;
        if (o === PRODUCTS_CLASS && (n = $(e).attr("pr_id")), "false" === $(e).attr("check-val"))
            if (o === PRODUCTS_CLASS) {
                Number(a.split("-")[1]) + 1;
                ratingEventData.delivery_attr += $(e).attr("value"), rr_fn.eventsTracking("ratescreen_choose_product_att", t, {
                    level: s,
                    attrValue: $(e).attr("value")
                })
            } else rr_fn.eventsTracking("rate_screen_choose_delivery_att", t, {
                level: s,
                attrValue: $(e).attr("value")
            });
        var i = "true" === $(e).attr("check-val") ? "false" : "true";
        $(e).attr("check-val", i), rr_fn.filterSelectedOptions(s, r, o, n), console.log(rr_fn.rating_response)
    },
    submitReview: function (e) {
        var t = [],
            a = [];
        window.scrollTo(0, 0), rr_fn.validateResponseData(rr_fn.rating_response.response_data[DELIVERY_CLASS], rr_fn.rating_response.response_data[PRODUCTS_CLASS]) && (Object.keys(rr_fn.rating_response.response_data[PRODUCTS_CLASS].product_data).map(function (e) {
            a.push(rr_fn.rating_response.response_data[PRODUCTS_CLASS].product_data[e])
        }), rr_fn.rating_response.response_data[PRODUCTS_CLASS].product_data = a, t.push(rr_fn.rating_response.response_data[DELIVERY_CLASS]), t.push(rr_fn.rating_response.response_data[PRODUCTS_CLASS]), rr_fn.rating_response.response_data = t), finalResponseObject = rr_fn.removeUnreviewedItems(t), rr_fn.rating_response.response_data = finalResponseObject, console.log(rr_fn.rating_response), rr_fn.ajaxForm({
            payload: JSON.stringify(rr_fn.rating_response)
        }, "POST", "/submit-review").done(function (t) {
            try {
                var t = JSON.parse(t);
                if (200 === t.statusCode) {
                    rr_fn.eventsTracking("rate_submit", e);
                    var a = '<img class="close-icon" src="/img/close-icon.png" /> <div class="rr-succ-box"><span>' + t.data.badge_message + '</span></div><div class="rr-succ-img"><img src="' + t.data.response_image + '"></div><div class="rr-succ-h1">' + t.data.response_title + "</div>";
                    "undefined" != typeof t.data.response_info && (a += '<div class="rr-succ-h2">' + t.data.response_info + "</div>"), t.data.app_store_flag && (a += '<div class="rate-app-cont"><div class="rate-app-text" style="text-align: center;">' + t.data.button_text + '</div><a href="https://play.google.com/store/apps/details?id=com.licious&hl=en"> <button style="width:90%;height:42px;border-radius:3px;background-color: #e41d36;font-family: Lato;margin: 15px 20px;font-size: 18px;color: #ffffff;font-weight: bold;;">Rate us on Play Store</button> </a><a href="https://itunes.apple.com/in/app/fresh-meat-online-licious/id1052440342?mt=8"> <button style="width:90%;height:42px;border-radius:3px;background-color: #e41d36;font-family: Lato;margin: 5px 20px;font-size: 18px;color: #ffffff;font-weight: bold;;">Rate us on App Store</button> </a></div>'), $(".review-rating-container").css("padding", "50px 0px"), $(".review-rating-succ-msg").html(a), $(".review-rating-succ-msg").removeClass("hide"), $(".review-rating-main").addClass("hide")
                }
            } catch (o) {
                console.log(o), location.reload()
            }
        })
    },
    getRatingReviewQuestions: function (e, t, a, o, s) {
        var r = '<div class="rate-ques-main quest-main-' + t + '">';
        return $.map(e, function (e, n) {
            r += '<div class="level-quest levelQ-' + t + "-" + a + "-" + e.level + '" style="display:none">', $.map(e.levelRateQuestion, function (a, n) {
                r += '<div class="rateQues-h1">' + a.subClassQuestion + '</div><div class="multiQ-opt">', $.map(a.attributes, function (a, n) {
                    t === PRODUCTS_CLASS ? (rr_fn.products_attributes.push({
                        level: e.level,
                        option_id: a._id,
                        value: !1,
                        pr_id: o
                    }), r += '<label class="multiQ-container"><input type="checkbox" value="' + a.option + '"><span class="multi-option"> ' + a.option + ' </span><span class="checkmark" index="' + t + "-" + e.level + "-" + a._id + '" pr_id="' + o + '" value="' + a.option + '" check-val="false" data-prname="' + s + '"></span></label>') : (rr_fn.delivery_attributes.push({
                        level: e.level,
                        option_id: a._id,
                        value: !1
                    }), r += '<label class="multiQ-container"><input type="checkbox" value="' + a.option + '" name="' + t + "-" + e.level + '"><span class="multi-option"> ' + a.option + ' </span><span class="checkmark" index="' + t + "-" + e.level + "-" + a._id + '" value="' + a.option + '" check-val="false"></span></label>')
                }), r += "</div>"
            }), r += "</div>"
        }), r += "</div>"
    },
    eventsTracking: function (e, t, a) {
        var o = {};
        o.Source = "rate_order", o.shipment_id = t.shipment_id, o.shipment_type = t.event_info.shipment_type, o.split = t.event_info.split.toString(), o.city = t.event_info.city, o.hub = t.basic_info.hub, o.user_type = t.event_info.customer_type, o.item_count = t.basic_info.item_list.length.toString(), o.item_list = t.basic_info.item_list.map(function (e) {
            return e.pr_name
        }).join(), o.category_list = t.event_info.category_list, o.amount = t.event_info.amount.toString(), o.discount = t.event_info.discount.toString(), o.delivered_date = t.basic_info.delivered_date.toString();
        var s = new Date(t.order_date.split("T")[0]);
        o.order_date = s.toLocaleDateString().replace(/\//g, "-");
        var r = new Date,
            n = r.getDate() + "-" + (r.getMonth() + 1) + "-" + r.getFullYear();
        switch (e) {
            case "ratescreen_close":
                break;
            case "ratescreen_choosedelivery":
                o.delivery_rating = a.delivery_rating.toString(), o.samedayrating = n == t.basic_info.delivered_date ? "true" : "false", o.rated_date = n.toString();
                break;
            case "rate_screen_choose_delivery_att":
                o.delivery_rating = a.level, o.delivery_attributes = a.attrValue, o.samedayrating = n == t.basic_info.delivered_date ? "true" : "false", o.rated_date = n;
                break;
            case "rate_screen_choose_product":
                o.delivery_rating = ratingEventData.delivery_rating, o.samedayrating = n == t.basic_info.delivered_date ? "true" : "false", o.rated_date = n, o.product_position = a.product_position, o.product_rating = a.product_rating;
                break;
            case "ratescreen_choose_product_att":
                o.delivery_rating = ratingEventData.delivery_rating, o.samedayrating = n == t.basic_info.delivered_date ? "true" : "false", o.rated_date = n.toString(), o.product_position = a.product_position.toString(), o.product_rating = ratingEventData.product_rating, o.product_attribute = a.attrValue;
                break;
            case "rate_submit":
                o.delivery_rating = ratingEventData.delivery_rating, o.product_list = t.basic_info.item_list.map(function (e) {
                    return e.pr_name
                }).join();
                for (var i = [], l = 1, d = 0; l <= t.basic_info.item_list.length; l++, d++) "undefined" == typeof ratingEventData.prod_rate[l] ? i[d] = t.basic_info.item_list[l - 1].pr_name + " NA" : i[d] = ratingEventData.prod_rate[l];
                ratingEventData.product_rating = i.join(), o.product_rating = ratingEventData.product_rating, o.samedayrating = n == t.basic_info.delivered_date ? "true" : "false", o.rated_date = n;
                var c = 1,
                    u = 0;
                rr_fn.rating_response.response_data.map(function (e) {
                    e["class"] == PRODUCTS_CLASS ? e.product_data.map(function (e) {
                        u += e.response_rateRange
                    }) : u += e.response_rateRange, c++
                }), o.overall_rating = (u / c).toString(), ratingEventData.overall_rating = o.overall_rating.toString();
                break;
            case "rate_download":
                o.delivery_rating = ratingEventData.delivery_rating, o.samedayrating = n == t.basic_info.delivered_date, o.rated_date = n, o.product_rating = ratingEventData.product_rating, o.overall_rating = ratingEventData.overall_rating, o.Platform = a.platform
        }
        console.log("eventName - " + e), console.log("events-" + JSON.stringify(o)), $(document).on("click", ".close-icon", function (e) {
            window.location.href = "/"
        })
    }
}, fn_paypal = {
    renderStaticTemplate: function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? "link" : arguments[1],
            a = arguments.length <= 2 || void 0 === arguments[2] ? "profile" : arguments[2];
        fn_main.showloader(), fn_home.ajaxForm({}, "POST", "/checkout/get-paypal-page").done(function (o) {
            var s = JSON.parse(o);
            if (s.statusCode) {
                var r = '\n            <div class="paypal-link-header">\n                <img id="paypal-img" src="' + s.data.logo + '" />\n                <div class="paypal-header-text">\n                    ' + s.data.sub_title + '\n                </div>\n            </div>\n            <div class="paypal-link-body-container">\n              ' + s.data.content + '\n            </div>\n            <div style="color:blue; text-align:center;">\n                ' + s.data.offer + '\n            </div>\n            <div class="paypal-link-body-footer" style="padding-right: 139px !important;">\n                <div>\n                    <button style="width: 233%; background-color: #E41D36; color: #fff; display: inline-block; border-radius: 3px;vertical-align: middle; font-size: 20px; text-align: center; border: none;" id="paypal-link-now-button" data-scope="' + a + '" data-action="' + t + '">' + ("unlink" == t ? s.data.button_text_unlink : s.data.button_text_link) + "</button>\n                </div>\n            </div>";
                e.html(r), s.data.isBAPresent ? $("#paypal-link-now-button").html("UN-LINK NOW").attr("data-action", "unlink") : $("#paypal-link-now-button").html("LINK NOW").attr("data-action", "link")
            }
        }).always(function (e) {
            fn_main.hideloader()
        })
    },
    renderUnlinkComponents: function () {
        $("#paypal-link-now-button").html("UN-LINK NOW").attr("data-action", "unlink"), $(".paypal-link-body-container").html(""), $(".paypal-link-body-header .paypal-header-text").html("To unlink please click on Unlink Button "), $('a[href="#paypal-link-view"]').click()
    },
    redirectToOrderStatusPage: function (e) {
        window.location.href = window.location.origin + "/order-status/" + e
    },
    updatePaymentStatus: function (e) {
        console.log("updatePaymentStatus paypal");
        var t = JSON.parse(localStorage.getItem("paypal_order")),
            a = JSON.parse(localStorage.getItem("isreinitiate"));
        fn_main.showloader();
        var o = localStorage.getItem("CreateOrderApiResponse");
        o = JSON.parse(o);
        var s = o.order_id,
            r = localStorage.getItem("fetchWalletApi");
        r = JSON.parse(r);
        var n = r.licious_wallet.total_payble_without_wallet;
        $(".lic-btn.enabled.checked").length > 0 && (n = r.licious_wallet.total_payble_after_wallet);
        var i = {
            type: "paypal",
            id: "1234",
            amount: n,
            status: e,
            secondry_action: "",
            order_id: s
        };
        fn_home.ajaxForm(i, "POST", "/checkout/update-payment-paypal", 6e4).done(function (e) {
            var o = JSON.parse(e);
            if (fn_main.hideloader(), console.log("update-payment-paypalllll", o.status), 200 === o.status || 424 === o.status) {
                if (console.log("update-payment-paypal", o.status), 200 === o.status) {
                    var r;
                    ! function () {
                        var e = t.order_id,
                            s = t.address_id,
                            n = t.orderDetails || {},
                            i = n.cart_value,
                            l = n.discount_amount,
                            d = n.currency,
                            c = n.product_ids,
                            u = n.product_names,
                            p = n.prices,
                            m = n.delivery_type,
                            h = n.delivery_slots,
                            f = n.hub_id,
                            v = parseFloat(localStorage.getItem("wallet_used")),
                            g = localStorage.getItem("coupon_used"),
                            _ = (localStorage.getItem("method"), localStorage.getItem("pay_source")),
                            y = fn_ll.getterSS("customer_type"),
                            b = {
                                Source: "Purchase",
                                "Total Amount": Number(i),
                                "Coupon Name": g,
                                "Coupon Type": localStorage.getItem("coupon_type"),
                                "City Name": localStorage.getItem("city_name"),
                                "Hub ID": f,
                                Discount: l,
                                "Licious wallet Amount": v,
                                "Charged ID": e,
                                Currency: d,
                                "Payment Method": _,
                                "Product ID": c ? c.toString() : "",
                                "Product Name": u ? u.toString() : "",
                                "Category ID": JSON.parse(localStorage.getItem("allitem")).category_id,
                                Price: p ? p.toString() : "",
                                Quantity: localStorage.getItem("product_quantity"),
                                ShipmentIDs: localStorage.getItem("shipmentCount"),
                                ShipmentTypes: m,
                                ShipmentTime: h,
                                AddressID: s,
                                "Transaction ID": o.razorpay_payment_id,
                                Checkout_Flow: null !== sessionStorage.getItem("checkout_flow") && "" !== sessionStorage.getItem("checkout_flow") ? sessionStorage.getItem("checkout_flow") : "old_checkout",
                                user_type: y
                            };
                        fn_main.assignIncomingSource(b), fn_home.sendBranchChargedEvent(b, e);
                        ({
                            Charged: "Yes",
                            "Total Amount": Number(i),
                            City: localStorage.getItem("city_name"),
                            "Payment Method": _,
                            "Charged ID": e
                        });
                        ga("ecommerce:addTransaction", {
                            id: e,
                            revenue: Number(i)
                        }), r = localStorage.getItem("product_quantity"), r = r.split(","), $.map(u, function (t, a) {
                            ga("ecommerce:addItem", {
                                id: e,
                                name: t,
                                sku: c[a],
                                price: p[a],
                                quantity: r[a]
                            })
                        });
                        var k = "false" === localStorage.getItem("pay-later-scenario"),
                            C = !a || a && k;
                        C && (window.dataLayer && window.dataLayer.push({
                            event: "debug-charged",
                            "ga-category": "debug-charged",
                            "ga-action": "Logging debug charged",
                            "ga-label": t.orderDetails ? JSON.stringify(t.orderDetails) : "orderDetails not available"
                        }), pushEEPurchases(parsePushEEPurchaseEvent({
                            product_names: u,
                            product_ids: c,
                            prices: p,
                            pr_qty: r,
                            currency: d,
                            order_id: e,
                            transactionId: e,
                            cart_value: i,
                            delivery_type: m,
                            delivery_slots: h,
                            address_id: s,
                            coupon_used: g,
                            charged: b
                        }))), fn_cart.gaAddRemoveEvent("Charged", "Charged", JSON.stringify(b)), clevertap.event.push("Charged", b)
                    }()
                }
                var n = location.href.search("/order-status/") !== -1;
                if (n) return void window.location.reload();
                fn_paypal.redirectToOrderStatusPage(s)
            }
        })
    },
    createBillingAgreement: function (e, t) {
        var a = {
            token: e
        };
        fn_home.ajaxForm(a, "POST", "/user/create-billing-agreement-paypal").done(function (e) {
            var a = JSON.parse(e);
            if (201 === a.statusCode) {
                if ("payments" === t) fn_paypal.updateGetConfigLSData(!0), $(".payment-cta").removeClass("disabled"), $("#paypal-link-now-button").hide(), $(".init-pay").click(), console.log("thisisis", $(".payment-cta")), fn_main.hideloader(), console.log("t", document.getElementsByClassName(".payment-cta")), fn_paypal.updateGetConfigLSData(!0);
                else if ("profile" === t) {
                    var o = new URLSearchParams(window.location.href),
                        s = o.get("ba_token"),
                        r = {
                            token: s
                        };
                    fn_main.showloader(), console.log("#paypal-link-view-success#paypal-link-view-success", r), fn_paypal.updateGetConfigLSData(!0), $("#paypal-profile-tab").click()
                }
            } else fn_main.hideloader(), $("#paypal-text").html("Billing Token Not accepted."), $(".paypal-popup-container").children("img").attr("src", "https://d2407na1z3fc0t.cloudfront.net/Banner/payment-fail.png"), $(".custom-btn-1").css("display", "none"), $(".custom-btn-2").html("Close"), $(".custom-btn-2").click(function () {
                $(".custom-paypal-popup").removeClass("show"), $(".custom-btn-1").css("display", "inline-block")
            }), $(".custom-paypal-popup").addClass("show")
        }).fail(function (e) {
            console.log(e), fn_main.hideloader(), $("#paypal-text").html("Billing Token Not accepted."), $(".custom-btn-1").css("display", "none"), $(".paypal-popup-container").children("img").attr("src", "https://d2407na1z3fc0t.cloudfront.net/Banner/payment-fail.png"), $(".custom-btn-2").html("Close"), $(".custom-btn-2").click(function () {
                $(".custom-paypal-popup").removeClass("show"), $(".custom-btn-1").css("display", "inline-block")
            }), $(".custom-paypal-popup").addClass("show")
        })
    },
    getBillingAgreementToken: function (e, t, a) {
        var o = arguments.length <= 3 || void 0 === arguments[3] ? 500 : arguments[3];
        console.log("getBillingAgreementToken", e, t, a);
        var s = {
            return_url: e,
            cancel_url: t
        };
        fn_home.ajaxForm(s, "POST", "/user/get-billing-agreement-token-paypal").done(function (e) {
            var t = JSON.parse(e);
            if (200 === t.statusCode) {
                if (t.data && t.data.links) {
                    var s = function () {
                        var e = t.data.links[0].href,
                            s = t.data.token_id,
                            r = window.open(e, "_blank", "Secure payment");
                        if (!r || r.closed || "undefined" == typeof r.closed) return Materialize.toast("PopUp Blocked. Please allow Popup in Settings and try again", 4e3), fn_main.hideloader(), {
                            v: void 0
                        };
                        var n = setInterval(function () {
                            console.log("polling..."), null !== r && r.closed && (clearInterval(n), fn_paypal.createBillingAgreement(s, a))
                        }, o)
                    }();
                    if ("object" == typeof s) return s.v
                }
            } else fn_main.hideloader(), Materialize.toast("Something went wrong. Please try again after sometime", 4e3)
        }).fail(function () {
            fn_main.hideloader(), Materialize.toast("Something went wrong. Please try again after sometime", 4e3)
        })
    },
    getBillingAgreementStatus: function () {
        return fn_paypal.getConfig().then(function (e) {
            return console.log("getBillingAgreementStatus", e), e
        })
    },
    getConfig: function () {
        var e = new Promise(function (e, t) {
            fn_home.ajaxForm({}, "GET", "/home_page/get-config").done(function (t) {
                e(t)
            })
        });
        return e
    },
    updateGetConfigLSData: function (e) {
        var t = JSON.parse(localStorage.getItem("configApiResponse"));
        void 0 !== t && null !== t && t.hasOwnProperty("data") && t.data.hasOwnProperty("paypal") && t.data.paypal.hasOwnProperty("isBAPresent") || (t = {
            data: {
                paypal: {
                    isBAPresent: ""
                }
            }
        }), t.data.paypal.isBAPresent = e, localStorage.setItem("configApiResponse", JSON.stringify(t))
    },
    updateUIviaPaypal: function (e) {
        e <= 2e3 ? ($("#paypal_auto_pay").removeClass("disabled"), $("#paypal_auto_pay").addClass("enabled"), $("#paypal_auto_pay").css("opacity", " 1"), "true" == localStorage.getItem("is_ba_present") && $("#paypal_one_time_pay").css("display", "none")) : ($("#paypal_auto_pay").removeClass("enabled"), $("#paypal_auto_pay").addClass("disabled"), $("#paypal_auto_pay").css("opacity", " 0.4"), $("#paypal_autocheck_inp").parent().parent().parent().css("opacity", "0.4"), $("#paypal_one_time_pay").css("display", "block")), $("#paypal_auto_pay").removeClass("selected"), $("#paypal_one_time_pay").removeClass("selected")
    }
}, $(document).on("click", "#paypal-link-now-button", function (e) {
    var t = e.target.getAttribute("data-action"),
        a = e.target.getAttribute("data-scope");
    if ("link" === t) {
        var o;
        ! function () {
            var e = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : ""),
                t = "",
                s = "";
            "profile" === a ? (t = e + "/user/profile#paypal-link-view-success", s = e + "/user/profile#paypal-link-view-success") : (t = e + "/checkout/paypal-billing-agreement?state=success", s = e + "/checkout/paypal-billing-agreement?state=failure");
            var r = window.location.href;
            r.includes("profile") ? (fn_main.showloader(), fn_paypal.getBillingAgreementToken(t, s, "profile")) : (o = '<h4 style="font-size: 20px"> The safe way to pay, just became faster.</h4><hr style="margin-top: 10px;"><h3 style="margin-top: 5px; color: #000000;font-size: 18px;">Set up automatic payments on Licious</h3><ul style="border-radius: 4px;color: #000000;margin-top: 9px;font-size: 12px;text-align: left;border: 1px solid grey;padding: 4px;"><li>1. Once your opt-in via OPT, you can skip OTP & CVV for future purchases on Licious (valid for purchases under Rs. 2000. Credit Cards Only)</li><li>2. Your money, details and purchases are protected by PayPal.</li><li>3. You can manage and cancel automatic payments anytime.</li></ul>', $("#paypal-text").html(o), $(".paypal-popup-container").children("img").attr("src", "https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"), $(".custom-btn-1").html("continue"), $(".custom-btn-2").html("Close"), $(".custom-btn-2").click(function () {
                $(".custom-paypal-popup").removeClass("show"), $(".custom-btn-1").css("display", "inline-block")
            }), $(".custom-btn-1").click(function () {
                fn_main.showloader(), fn_paypal.getBillingAgreementToken(t, s, "payments")
            }), $(".custom-paypal-popup").addClass("show"))
        }()
    } else $("#paypal-text").html("Are you sure you want to cancel the Billing Agreement?"), $(".custom-btn-1").html("Continue"), $(".custom-btn-2").html("Cancel"), $(".custom-btn-2").click(function () {
        $(".custom-paypal-popup").removeClass("show")
    }), $(".custom-btn-1").click(function () {
        fn_main.showloader(), fn_home.ajaxForm({}, "POST", "/user/cancel-billing-agreement-paypal").done(function (e, t, a) {
            console.log("responsestatus", a.status);
            var o = JSON.parse(e);
            201 === o.statusCode && (console.log("renderStaticTemplate called"), fn_paypal.renderStaticTemplate($(".paypal-link-container")), fn_paypal.updateGetConfigLSData(!1))
        }).fail(function (e) {
            $("#paypal-text").html("Something went wrong! Try again Later"), $(".custom-btn-1").css("display", "none"), $(".custom-btn-2").html("Close"), $(".custom-btn-2").click(function () {
                $(".custom-paypal-popup").removeClass("show"), $(".custom-btn-1").css("display", "inline-block")
            }), $(".custom-paypal-popup").addClass("show")
        }).always(function () {
            $(".custom-paypal-popup").removeClass("show"), fn_main.hideloader()
        })
    }), $(".custom-paypal-popup").addClass("show")
}), $(function () {
    if ("undefined" !== location.hash) {
        var e = location.hash.split("?")[0];
        "#paypal-link-view-success" === e ? window.close() : "#paypal-order-success" === e ? ($(".pay-method.paypal").css("display", "none"), $("#paypal-order-success").css("display", "block"), console.log("capturing order")) : "#paypal-billing-agreement-success" === e ? console.log("billing argreeement success") : "#paypal-link-view" === e && $("#paypal-profile-tab").click()
    }
    var t = localStorage.getItem("configApiResponse");
    if (t) {
        var a = JSON.parse(t);
        a.data && a.data.paypal && void 0 !== a.data.paypal.isBAPresent && a.data.paypal.isBAPresent && console.log("configApiResponseif")
    }
}), $(document).on("click", ".payment-options-list > [data-payname=paypal]", function () {
    console.log("paypal clicked")
}), $(document).on("click", ".payment-options-list,.paypal-payment-options", function () {
    var e = $(".payment-options-list > ul > [data-payname=paypal]").hasClass("active"),
        t = $(".paypal-payment-options.enabled.selected").attr("data-paymentcode"),
        a = e && "paypal_auto_pay" === t;
    if (console.log("check", e, t), console.log("check2", e && "paypal_auto_pay" === t), a) {
        var o = JSON.parse(localStorage.getItem("configApiResponse"));
        if (o.data.paypal.isBAPresent === !1) {
            $(".payment-cta").hide(), console.log("configApiResponseconfigApiResponse true");
            var s = $("<button>").attr("id", "paypal-link-now-button");
            s.attr("data-scope", "payments"), s.attr("data-action", "link"), s.html("Link Now & Pay"), $("#paypal-link-now-button").length || $(".payment-options-holder").append(s), $(".init-pay").css("display", "none")
        }
    } else $(".payment-cta").show(), $(".init-pay").css("display", "block"), console.log("configApiResponseconfigApiResponse false"), $("#paypal-link-now-button").remove()
}), $(document).on("click", "#paypal-profile-tab", function () {
    console.log("paypal clicked tab");
    var e = localStorage.getItem("configApiResponse");
    e = JSON.parse(e);
    var t = e.data.paypal.isBAPresent;
    t === !0 ? fn_paypal.renderStaticTemplate($(".paypal-link-container"), "unlink", "profile") : fn_paypal.renderStaticTemplate($(".paypal-link-container"), "link", "profile")
});
var LoyaltyBanners = function () {
        function e() {
            _classCallCheck(this, e)
        }
        return _createClass(e, [{
            key: "ajaxForm",
            value: function (e, t, a) {
                return $.ajax({
                    url: a,
                    type: t,
                    data: e,
                    timeout: 2e4,
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
                    }
                })
            }
        }, {
            key: "getHomePageAPIData",
            value: function () {
                return fn_home.ajaxForm({}, "GET", "/loyalty/get-user-loyalty-details")
            }
        }, {
            key: "getLoyaltyBanner",
            value: function (e) {
                var t = this;
                this.ajaxForm({}, "GET", "/loyalty/get-user-loyalty-details").done(function (a) {
                    var o = JSON.parse(a);
                    200 === o.statusCode && o.data.is_eligible && (o.data.is_subscribed && null != o.data.subscribed && !o.data.subscribed.is_expired ? document.querySelector(".header-logo").innerHTML = '<a href="/"><img src="/img/loyalty_licious_logo.svg" alt="licious"></a>' : document.querySelector(".header-logo").innerHTML = '<a href="/"><img src="https://d2407na1z3fc0t.cloudfront.net/Banner/web_licious_logo.png" alt="licious"></a>', fn_ll.populateLoyaltyBannerData(o.data), t.handleBannerRenderCases(o.data, e))
                }).fail(function () {
                    console.log("res")
                }).always(function () {})
            }
        }, {
            key: "handleBannerRenderCases",
            value: function (e, t) {
                e.is_subscribed ? e.subscribed.is_expired ? null !== e.cart_loyalty ? this.renderLoyaltyInCartBanner(e.cart_loyalty, t, "bottom") : this.renderMembershipExpiredBanner(e.subscribed, t) : this.renderMemberBanner(e.subscribed, t) : null !== e.cart_loyalty ? this.renderLoyaltyInCartBanner(e.cart_loyalty, t, "top") : this.renderNonMemberBanner(e, t)
            }
        }, {
            key: "renderMemberBanner",
            value: function (e, t) {
                if ("up" === t) {
                    var a = document.querySelector("." + t + "-ll-badge-placeholder");
                    a.innerHTML = '\n        <div class="loyalty-badge">\n          <img src="/img/loyalty_licious_logo.svg" class="loyalty-badge-logo">\n        </div>', document.querySelector(".col.s2.lec-rightborder-grey").insertAdjacentHTML("afterbegin", '<img src="/img/confetti.svg" class="confetti">'), $(".left.customer-pic1.circle.responsive-img").css({
                        "margin-top": "-128px",
                        "border-color": "#ffdc93"
                    }), $(".center.lec-profile-textalign.h-lato-bold").css({
                        "padding-top": "0px",
                        "margin-top": "0"
                    });
                    var o = '\n        <div>\n          <button class="' + t + '-ll-m-banner">MY MEATOPIA PLAN</button>\n        </div>\n      ';
                    $(".row.grey.lighten-5.user-profile-header").append(o), this.bindBannerClick("m", t)
                } else if ("mc" !== t) {
                    var a = document.querySelector("." + t + "-ll-bottom-banner-placeholder");
                    a.innerHTML = '\n      <!-- Loyalty Member Banner -->\n      <div class="' + t + '-ll-m-banner">\n        <img src="/img/loyalty_licious_logo.svg" class="' + t + '-ll-banner-licious-m-logo">\n        <div class="' + t + '-ll-m-banner-separator"></div>\n        <div class="' + t + '-ll-m-info">\n          <div class="' + t + '-ll-m-expiry-info">' + (e.days_left <= 1 ? e.expiry_message : e.plan_info_msg) + '</div>\n          <div class="' + t + '-ll-m-savings-info">\n            <span class="' + t + '-ll-m-orders"><span class="' + t + '-ll-m-noo">' + e.order_count + '</span> orders placed</span>\n            <span class="' + t + '-ll-m-info-separator"></span>\n            <span class="' + t + '-ll-m-savings"><span class="' + t + '-ll-m-s-amt">₹' + e.total_saving + "</span> total savings</span>\n          </div>\n        </div>\n      </div>"
                }
                if ("hp" === t && $(".profile-drop") && !$(".profile-drop").find('[data-eventlabel="Loyalty"]').length) {
                    var s = '\n        <li class="pd-ll-banner m">\n          <a href="/loyalty/licious-meatopia" data-eventlabel="Loyalty">\n            <div class="pd-ll-b-container">\n              <img class="loyalty-logo" data-lazy="/img/loyalty_licious_logo.svg">\n              <div class="expiry-info">' + (e.days_left <= 1 ? e.expiry_message : e.plan_info_msg) + "</div>\n            </div>\n          </a>\n        </li>";
                    $(".ll-m-badge").show(), document.querySelector(".profile-drop").insertAdjacentHTML("afterbegin", s), fn_home.getAllDOMImages()
                }
            }
        }, {
            key: "renderMembershipExpiredBanner",
            value: function (e, t) {
                var a = document.querySelector("." + t + "-ll-" + ("up" === t || "mc" === t ? "top" : "bottom") + "-banner-placeholder");
                a.innerHTML = "\n    <!-- Loyalty Membership Expired Banner -->\n    " + ("mc" === t || "os" === t ? '\n        <div class="' + t + '-ll-me-banner-title">\n          ' + e.renew_message + "\n        </div>\n      " : "") + '\n    <div class="' + t + '-ll-me-banner">\n      <img data-lazy="/img/loyalty_licious_logo.svg" class="' + t + '-ll-banner-licious-me-logo"><div class="' + t + '-ll-me-banner-separator"></div>\n          <div class="' + t + '-ll-me-info">\n            <div class="' + t + '-ll-me-expiry-info">' + e.expiry_message + '</div>\n            <div class="' + t + '-ll-me-savings-info">\n              <span class="' + t + '-ll-me-orders"><span class="' + t + '-ll-me-noo">' + e.order_count + '</span> orders placed </span>\n              <span class="' + t + '-ll-me-info-separator"></span>\n              <span class="' + t + '-ll-me-savings"><span class="' + t + '-ll-me-s-amt">₹' + e.total_saving + '</span> total savings</span>\n            </div>\n          </div>\n          <div class="' + t + '-ll-me-banner-rtext">\n            <span>RENEW</span>\n            <img src="/img/chevron.svg" class="' + t + '-ll-rchevron">\n          </div>\n        </div>\n        ' + ("mc" === t ? "<hr>" : ""), fn_home.getAllDOMImages(), "mc" === t ? (this.bindBannerClick("me", t), $(".li-crossell-wrapper").css("box-shadow", "none"), $("." + t + "-ll-top-banner-placeholder").show()) : this.openRenewPopup("me", t)
            }
        }, {
            key: "renderNonMemberBanner",
            value: function (e, t) {
                var a = e.non_subscribed,
                    o = document.querySelector("." + t + "-ll-top-banner-placeholder");
                if (o.innerHTML = "\n    " + ("hp" === t ? '\n      <div class="' + t + '-ll-nm-banner">\n        <div class="' + t + '-ll-nm-banner-top">\n          <img data-lazy="/img/loyalty_licious_logo.svg" class="' + t + '-ll-banner-licious-nm-logo">\n          <button>JOIN NOW</button>\n          </div>\n          <hr>\n          <div class="' + t + '-ll-nm-banner-bottom">\n            ' + e.bannerMessage + "\n          </div> \n        </div>\n      </div>" : ("mc" === t || "os" === t ? '\n        <div class="' + t + '-ll-nm-banner-title">\n          ' + a.message + "\n        </div>\n      " : "") + '\n        <div class="' + t + '-ll-nm-banner">\n        ' + ("mc" !== t && "os" !== t ? '\n          <div class="' + t + '-ll-nm-banner-top">' : "") + '\n            <img src="/img/loyalty_licious_logo.svg" class="' + t + '-ll-banner-licious-nm-logo">\n            <div class="' + t + '-ll-nm-banner-rtext">\n              <span>JOIN NOW</span>\n              <img src="/img/chevron.svg" class="' + t + '-ll-rchevron">\n            </div>\n        ' + ("mc" !== t && "os" !== t ? '\n          </div>\n          <hr>\n          <div class="' + t + '-ll-nm-banner-bottom">\n            ' + this.renderBenefitList(a.benefits, t) + "\n          </div> \n        </div>" : "") + "\n      </div>\n      " + ("mc" === t ? "<hr>" : "")), "mc" === t && ($(".li-crossell-wrapper").css("box-shadow", "none"), window.location.href.includes("/loyalty/") || $("." + t + "-ll-top-banner-placeholder").show()), "hp" === t && !e.cart_loyalty && $(".profile-drop") && !$(".profile-drop").find('[data-eventlabel="Loyalty"]').length) {
                    var s = '\n        <li class="pd-ll-banner nm">\n          <a href="/loyalty/licious-meatopia" data-eventlabel="Loyalty">\n            <div class="pd-ll-b-container">\n              <img class="loyalty-logo" data-lazy="/img/loyalty_licious_logo.svg">\n              <div class="join-now">JOIN NOW</div>\n            </div>\n          </a>\n        </li>';
                    document.querySelector(".profile-drop").insertAdjacentHTML("afterbegin", s)
                }
                this.bindBannerClick("nm", t)
            }
        }, {
            key: "renderLoyaltyInCartBanner",
            value: function (e, t, a) {
                if ("os" !== t && "mc" !== t) {
                    var o = document.querySelector("." + t + "-ll-" + ("up" === t ? "top" : a) + "-banner-placeholder");
                    o.innerHTML = '\n      <!-- Loyalty In Cart Banner -->\n      <div class="' + t + '-ll-ic-banner">\n        <img data-lazy="/img/loyalty_licious_logo.svg" class="' + t + '-ll-banner-licious-ic-logo">\n        <div class="' + t + '-ll-ic-banner-separator"></div>\n        <div class="' + t + '-ll-ic-info">\n          <div class="' + t + '-ll-ic-pic">' + e.loyalty_title + '</div>\n          <div class="' + t + '-ll-ic-pm">' + e.loyalty_subtitle + "</div>\n        </div>\n      </div>", this.bindBannerClick("ic", t)
                }
            }
        }, {
            key: "renderBenefitList",
            value: function (e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? "popup" : arguments[1],
                    a = "";
                return e.map(function (o, s) {
                    s < 2 ? a += '<span class="' + t + '-ll-nm-banner-benefits">' + o.name + "</span>\n                  " + (s !== e.length - 1 ? '<span class="' + t + '-ll-dot"></span>' : "") : 2 == s && (a += s !== e.length - 1 ? '<span class="' + t + '-ll-nm-banner-benefits">\n        ' + o.name + " & MORE</span>" : '<span class="' + t + '-ll-nm-banner-benefits">' + o.name)
                }), a
            }
        }, {
            key: "renderPopupBenefits",
            value: function (e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1];
                "mc" === t ? document.querySelector("#loyalty-plans .popup-benefits").innerHTML = "" + this.renderBenefitList(e.non_subscribed.benefits) : document.querySelector(".popup-benefits").innerHTML = "" + this.renderBenefitList(e.non_subscribed.benefits)
            }
        }, {
            key: "bindBannerClick",
            value: function (t, a) {
                var o = "";
                "mc" === a ? o = "cart" : "hp" === a ? o = "homepage" : "os" === a ? o = "order-status" : "cat" === a && (o = localStorage.getItem("activeCatName")), "ic" === t ? $("." + a + "-ll-" + t + "-banner").on("click", function () {
                    fn_cart.miniCart()
                }) : "mc" === a ? ! function () {
                    var s = new HandleLoyaltyPlans,
                        r = new e;
                    $("." + a + "-ll-" + t + "-banner").on("click", function () {
                        $("#cart-ll").show(), s.getLoyaltyPlans.call(s, !0), document.getElementById("loyalty-plans").className = "show", $(".buy_plan").attr("id", "normal-add-to-cart"), $(".buy_plan button").on("click", function (e) {
                            if (document.getElementById("loyalty-plans").className = "hide", s.addLoyalty.call(s), "normal-add-to-cart" === $(".buy_plan").attr("id")) {
                                var t = s.getPlanDetailText.call(s, s.getCheckedPlan.call(s));
                                fn_ll.sendAnalyticsData("selectplan_loyaltycart", _extends({}, fn_ll.loyalty_banners_obj, fn_ll.loyalty_cart_obj, {
                                    source: "loyalty",
                                    list: "cart",
                                    selected_plan: t
                                })), localStorage.setItem("loyalty_cartflow", t)
                            }
                            $("#cart-ll").hide()
                        }), document.body.addEventListener("change", function (e) {
                            s.handlePlanChange.call(s, e, !0, "cart_page")
                        }), $(".close-loyalty-icon").on("click", function (e) {
                            document.getElementById("loyalty-plans").className = "hide", $("#cart-ll").hide()
                        }), $("#cart-ll").on("click", function () {
                            document.getElementById("loyalty-plans").className = "hide", $("#cart-ll").hide()
                        }), $(".cart-screen").on("click", function () {
                            document.getElementById("loyalty-plans").className = "hide", $("#cart-ll").hide()
                        }), r.getHomePageAPIData().done(function (e) {
                            var t = JSON.parse(e);
                            t.data.is_subscribed || r.renderPopupBenefits(t.data, "mc")
                        }), "mc" === a ? fn_ll.sendAnalyticsData("cartbanner", _extends({}, fn_ll.loyalty_banners_obj, fn_ll.loyalty_cart_obj, {
                            source: "click",
                            list: "" + o
                        })) : fn_ll.sendAnalyticsData("Banner", _extends({}, fn_ll.loyalty_banners_obj, {
                            source: "click",
                            list: "" + o
                        }))
                    })
                }() : document.querySelector("." + a + "-ll-" + t + "-banner").addEventListener("click", function (e) {
                    e.preventDefault(), e.stopPropagation(), fn_ll.sendAnalyticsData("Banner", _extends({}, fn_ll.loyalty_banners_obj, {
                        source: "click",
                        list: "" + o
                    })), window.location.href = "/loyalty/licious-meatopia", setTimeout(function () {
                        window.location.href = "/loyalty/licious-meatopia"
                    }, 1e3)
                })
            }
        }, {
            key: "openRenewPopup",
            value: function (t, a) {
                var o = "";
                "mc" === a ? o = "cart" : "hp" === a ? o = "homepage" : "os" === a ? o = "order-status" : "cat" === a && (o = localStorage.getItem("cat_slug")), document.querySelector("." + a + "-ll-" + t + "-banner").addEventListener("click", function () {
                    fn_ll.sendAnalyticsData("renewplan_loyalty", _extends({}, fn_ll.loyalty_banners_obj, {
                        source: "loyalty",
                        list: "" + o,
                        expired_plan: fn_ll.loyalty_expired_plan
                    })), $(".loc-screen").addClass("show");
                    var t = new HandleLoyaltyPlans;
                    "show" === document.getElementById("popupp").className ? (document.getElementById("popupp").className = "hide", $(".loc-screen").removeClass("show"), $(".loc-screen").addClass("hide")) : "hide" === document.getElementById("popupp").className && (document.getElementById("popupp").className = "show", $(".loc-screen").removeClass("hide"), $(".loc-screen").addClass("show")), t.getLoyaltyPlans.call(t, !0, "renew"), document.body.addEventListener("change", function (e) {
                        t.handlePlanChange.call(t, e, !0, "renew-popup")
                    }), $(".buy_plan button").on("click", function (s) {
                        t.addLoyalty.call(t, "true").then(function (s) {
                            document.getElementById("loyalty-renew-popup-plans").className = "hide", fn_ll.sendAnalyticsData("confirmrenew_loyalty", _extends({}, fn_ll.loyalty_banners_obj, {
                                source: "loyalty",
                                list: "" + o,
                                expired_plan: fn_ll.loyalty_expired_plan,
                                new_plan: t.getPlanDetailText(t.getCheckedPlan())
                            })), document.getElementById("loyalty-renew-popup-plans").className = "hide", $(".loc-screen").removeClass("show"), $(".loc-screen").addClass("hide");
                            var r = new e;
                            r.getLoyaltyBanner(a)
                        })
                    }), $(".loc-screen").on("click", function (e) {
                        document.getElementById("popupp").className = "hide", $(".loc-screen").removeClass("show"), $(".loc-screen").addClass("hide")
                    }), document.body.addEventListener("change", function (e) {
                        t.handlePlanChange.call(t, e, !0)
                    }), $(".close-loyalty").on("click", function (e) {
                        document.getElementById("popupp").className = "hide", $(".loc-screen").removeClass("show"), $(".loc-screen").addClass("hide")
                    })
                })
            }
        }]), e
    }(),
    HandleLoyaltyPlans = function () {
        function e() {
            _classCallCheck(this, e), this.currentPlan = "", this.planName = "", this.APIData = {}
        }
        return _createClass(e, [{
            key: "getLoyaltyPlans",
            value: function (e) {
                var t = this,
                    a = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1];
                fn_home.ajaxForm({}, "GET", "/loyalty/get-loyalty-plans").done(function (o) {
                    var s = JSON.parse(o);
                    t.APIData = s.data, fn_ll.populateLoyaltyLandingData(s.data), $(".meatopian-text").html(s.data.benefit_header), t.planName = s.data.sub_programs.filter(function (e) {
                        return e.is_recommended === !0
                    })[0].buy_plan_text, e ? (t.currentPlan = t.getRecommendedPlan(!0), t.renderPlanDetails(s.data, !0, a), t.planName = s.data.sub_programs.filter(function (e) {
                        return e.id === t.currentPlan
                    })[0].buy_plan_text, $(".buy_plan button").html("" + t.planName), $(".buy_loyalty button").html("" + t.planName)) : (t.currentPlan = t.getRecommendedPlan(!1), t.renderPlanDetails(s.data, !1, a)), localStorage.setItem("loyalty_recommended", t.getRecommendedPlan(!1)), localStorage.setItem("loyalty_total_plans", s.data.sub_programs.length)
                }).fail(function () {}).always(function () {
                    fn_main.hideloader()
                })
            }
        }, {
            key: "getCheckedPlan",
            value: function () {
                for (var e = "", t = document.querySelectorAll(".loyalty_plan"), a = 0; a < t.length; a++) t[a].checked === !0 && (e = parseInt(t[a].value));
                return e
            }
        }, {
            key: "getRecommendedPlan",
            value: function (e) {
                var t = this;
                if (e === !1) {
                    var a = [],
                        o = "";
                    return a = this.APIData.sub_programs.filter(function (e) {
                        return e.is_recommended === !0
                    }), Array.isArray(a) && a.length ? o = this.APIData.sub_programs.filter(function (e) {
                        return e.is_recommended === !0
                    })[0].id : Array.isArray(this.APIData.sub_programs) && this.APIData.sub_programs.length > 0 && (o = this.APIData.sub_programs[0].id), o
                }
                var s = function () {
                    for (var e = document.querySelectorAll(".loyalty_plan"), a = "", o = function (o) {
                            e[o].checked === !0 && (a = t.APIData.sub_programs.filter(function (t) {
                                return t.id === parseInt(e[o].value)
                            })[0].id)
                        }, s = 0; s < e.length; s++) o(s);
                    if ("" === a) {
                        var r = [],
                            n = "";
                        return r = t.APIData.sub_programs.filter(function (e) {
                            return e.is_recommended === !0
                        }), Array.isArray(r) && r.length ? n = t.APIData.sub_programs.filter(function (e) {
                            return e.is_recommended === !0
                        })[0].id : Array.isArray(t.APIData.sub_programs) && t.APIData.sub_programs.length > 0 && (n = t.APIData.sub_programs[0].id), {
                            v: n
                        }
                    }
                    return {
                        v: a
                    }
                }();
                if ("object" == typeof s) return s.v
            }
        }, {
            key: "renderPlanDetails",
            value: function (e) {
                var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
                    a = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2];
                if (t)
                    if ("renew" === a) {
                        var o = document.querySelector("#loyalty-renew-popup-plans .plan-section");
                        o.innerHTML = "\n                " + this.renderAllPlans(e.sub_programs, !0) + "\n                "
                    } else {
                        var o = document.querySelector("#loyalty-plans .plan-section");
                        o.innerHTML = "\n                " + this.renderAllPlans(e.sub_programs, !0) + "\n                "
                    }
                else {
                    var o = document.querySelector(".ll-container .plan-section");
                    o.innerHTML = "\n            " + this.renderAllPlans(e.sub_programs, !1) + "\n            "
                }
            }
        }, {
            key: "renderBenefitList",
            value: function (e) {
                var t = document.querySelector(".ll-container .benefitsContainer");
                t.innerHTML = "\n            " + this.renderBenefit(e) + "\n        "
            }
        }, {
            key: "renderBenefit",
            value: function (e) {
                var t = "";
                return e.length % 2 === 0 && e.length % 3 !== 0 ? e.map(function (e, a) {
                    var o = e.name.split(" ").splice(0, 2).join(" ");
                    t += '\n                <div class="benefitViewShow">\n                    <div class="benefitImage"><img src=' + e.imageUrl + '></div>\n                    <div class="benefitText">\n                    ' + o + "\n                    </div>\n                </div>\n            "
                }) : e.map(function (e, a) {
                    var o = e.name.split(" ").splice(0, 2).join(" ");
                    t += '\n                    <div class="benefitView">\n                        <div class="benefitImage"><img src=' + e.imageUrl + '></div>\n                        <div class="benefitText">\n                        ' + o + "\n                        </div>\n                    </div>\n                "
                }), t
            }
        }, {
            key: "renderAllPlans",
            value: function (e, t) {
                var a = this,
                    o = "";
                return e.map(function (e, s) {
                    o += '<label class="contain">\n                                <div class="single-plan" ' + (t ? a.currentPlan === e.id ? 'style="border: solid 1px #e41d36;"' : 'style="border: none"' : (e.is_recommended, 'style="border:none"')) + '>\n                                    <div class="left">\n                                        <label class="contain">\n                                            <span class="plan_text"">' + e.name + '</span>\n                                            <input type="radio" value=' + e.id + ' id="plan_' + (s + 1) + '" name="' + e.buy_plan_text + '" class="loyalty_plan" ' + (t ? e.id === a.currentPlan ? "checked" : "" : (e.is_recommended, "")) + '>\n                                            <span class="checkmark"></span>\n                                        </label>\n                                        ' + (e.is_recommended ? '<div class="recommended"> <div> LIMITED PERIOD</div></div>' : "") + '\n                                    </div>\n                                    <div class="right">\n                                        <div class="act_price"> ' + (e.price - e.discounted_price === 0 ? "" : "&#8377 " + e.price) + ' </div>\n                                        <div class="discount_price">₹ ' + e.discounted_price + "</div>\n                                    </div>\n                                </div> \n                            </label>\n    "
                }), o
            }
        }, {
            key: "filterBenefit",
            value: function (e) {
                var t = this.APIData.sub_programs.filter(function (t) {
                    return t.id === e
                })[0].benefits;
                return t
            }
        }, {
            key: "handlePlanChange",
            value: function (e) {
                var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
                    a = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2],
                    o = document.querySelectorAll(".loyalty_plan");
                if (e.target.classList.contains("loyalty_plan")) {
                    for (var s = 0; s < o.length; s++) e.target.id === o[s].id ? (o[s].checked = !0, o[s].parentNode.parentNode.parentNode.style.border = "solid 1px #e41d36", this.currentPlan = e.target.value) : (o[s].checked = !1, o[s].parentNode.parentNode.parentNode.style.border = "none");
                    this.planName = e.target.name, $(".ll-footer").show(), $(".ll-footer div").html("" + this.planName), $(".buy_loyalty button").html("" + this.planName), this.currentPlan = parseInt(e.target.value), "loyalty_landing" === a && fn_ll.sendAnalyticsData("selectplan_loyaltyhome", {
                        source: "loyalty",
                        selected_plan: "" + this.getPlanDetailText(this.currentPlan),
                        list: "loyalty_landing"
                    })
                }
                t && ($(".buy_plan button").html("" + this.planName), $(".ll-footer div").html("" + this.planName))
            }
        }, {
            key: "addLoyalty",
            value: function () {
                var e = this,
                    t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0];
                return new Promise(function (a, o) {
                    fn_home.ajaxForm({
                        program_id: 1,
                        subprogram_id: e.currentPlan
                    }, "POST", "/loyalty/add-loyalty").done(function (e) {
                        a(e), "true" !== t && fn_cart.miniCart(), (window.location.href.includes("/favourite-items") || window.location.href.includes("/past-orders")) && fn_home.quickCheckout()
                    }).fail(function () {
                        o("failed")
                    }).always(function () {})
                })
            }
        }, {
            key: "getLoyaltySubsrcibedPage",
            value: function (e) {
                var t = document.querySelector(".details-view");
                t.innerHTML = '\n            <div class="days-left">' + (0 !== e.days_left ? e.plan_info_msg : e.expiry_message) + '</div>\n            <div class="validity">' + this.getDate(e.start_date) + " to " + this.getDate(e.end_date) + "</div>\n            ", document.querySelector(".savings").innerHTML = " <span> ₹" + e.total_saving + "</span> <br /> total savings", document.querySelector(".order-and-savings  .orders-count").innerHTML = " <span> " + e.order_count + "</span> <br /> orders placed"
            }
        }, {
            key: "renderSubBenefitList",
            value: function (e) {
                var t = document.querySelector(".benefits-section .benefits-list");
                e.map(function (a, o) {
                    t.innerHTML += '\n            <div class="single-benefit">\n                <img src="' + a.image_url + '" />\n                <div class="right-view">\n                    <div class="title">' + a.name + '</div>\n                    <div class="description">' + a.description + "</div>\n                </div>\n            </div>\n            " + (o !== e.length - 1 ? "<hr/>" : "")
                })
            }
        }, {
            key: "getDate",
            value: function (e) {
                var t = new Date(e);
                if (isNaN(t.getTime())) return e;
                var a = new Array;
                a[0] = "Jan", a[1] = "Feb", a[2] = "Mar", a[3] = "Apr", a[4] = "May", a[5] = "Jun", a[6] = "Jul", a[7] = "Aug", a[8] = "Sept", a[9] = "Oct", a[10] = "Nov", a[11] = "Dec";
                var o = t.getDate();
                return o < 10 && (o = "0" + o), o + "-" + a[t.getMonth()] + "-" + t.getFullYear()
            }
        }, {
            key: "getExpiryDate",
            value: function (e) {
                document.querySelector(".validity-text").innerHTML = "Your plan is valid till " + this.getDate(e)
            }
        }, {
            key: "buyLoyalty",
            value: function (e) {
                "loyalty-landing" === $(".ll-footer").attr("id") && fn_ll.sendAnalyticsData("get_loyalty", {
                    source: "loyalty",
                    selected_plan: this.getPlanDetailText(this.getCheckedPlan())
                }), localStorage.setItem("loyalty_directflow", this.getPlanDetailText(this.currentPlan)), "true" === e ? (localStorage.setItem("from_loyalty", !0), window.addEventListener("unload", function () {
                    localStorage.setItem("from_loyalty", !1)
                }), localStorage.setItem("loyalty_selected_plan_id", this.currentPlan), $(".user-onboarding-wrapper").addClass("show"), $(".search-screen").show().css("background", "rgba(0,0,0,0.5)")) : (localStorage.setItem("loyaltyPaymentState", "purchase_loyalty"),
                    window.location.href = "/loyalty/payment/" + this.currentPlan)
            }
        }, {
            key: "getPlanDetailText",
            value: function (e) {
                var t = "";
                if (Array.isArray(this.APIData.sub_programs) && this.APIData.sub_programs.length > 0) {
                    var a = this.APIData.sub_programs[0];
                    t = a.name + ", " + (a.price - a.discounted_price <= 0 ? "0" : " " + a.price) + ",  " + a.discounted_price
                }
                var o = this.APIData.sub_programs.filter(function (t) {
                    return t.id.toString() === e.toString()
                });
                if (o.length) {
                    t = o[0].id.toString();
                    var a = o[0];
                    t = a.name + ", " + (a.price - a.discounted_price <= 0 ? "0" : " " + a.price) + ",  " + a.discounted_price
                }
                return fn_ll.loyalty_selected_plan = t.toString(), t.toString()
            }
        }]), e
    }();
ll_fn = {
    getFAQaftSubscription: function () {
        fn_home.ajaxForm({}, "GET", "/loyalty/get-FAQ").done(function (e) {
            e = JSON.parse(e), data = e.data.program_details.faqs, faqsSorted = [].concat(_toConsumableArray(data));
            var t = document.querySelector(".FAQ_placeHolder");
            faqsSorted.sort(function (e, t) {
                return e.sequence_number < t.sequence_number
            }), "false" === $(".show-more-faqs").attr("up") ? (t.innerHTML = "", faqsSorted.slice(0, 3).map(function (e) {
                e.answer = e.answer.replace(/\n/g, "<br/>"), t.innerHTML += '\n                <div class="single-faq">\n                    <div class="faq-ques">' + e.question + '</div>\n                    <div class="faq-ans">' + e.answer + "</div>\n                </div>\n                "
            }), document.querySelector(".show-more-faqs").innerHTML = 'Read all FAQs<span><img src="/img/arrow.png"></span>') : (t.innerHTML = "", faqsSorted.slice(0, faqsSorted.length).map(function (e) {
                e.answer = e.answer.replace(/\n/g, "<br/>"), t.innerHTML += '\n                <div class="single-faq">\n                    <div class="faq-ques">' + e.question + '</div>\n                    <div class="faq-ans">' + e.answer + "</div>\n                </div>\n                "
            }), document.querySelector(".show-more-faqs").innerHTML = 'show less<span><img style="-webkit-transform: rotate(-90deg);transform: rotate(-90deg);" src="/img/arrow.png"></span>')
        }).always(function () {
            fn_main.hideloader()
        })
    }
};
var HandleBenefitBannersFAQ = function () {
    function e() {
        _classCallCheck(this, e), this.APIData = {}
    }
    return _createClass(e, [{
        key: "getAPIBannerFAQ",
        value: function () {
            var e = this;
            fn_home.ajaxForm({}, "GET", "/loyalty/get-loyalty-banner-FAQ").done(function (t) {
                var a = JSON.parse(t);
                e.APIData = a.data, e.renderBenefitCaraousel(), e.renderFAQ(a.data.program_details.faqs)
            }).fail(function () {}).always(function () {
                fn_main.hideloader()
            })
        }
    }, {
        key: "getFAQs",
        value: function () {
            return fn_home.ajaxForm({}, "GET", "/loyalty/get-FAQ")
        }
    }, {
        key: "renderFAQ",
        value: function (e) {
            var t = document.querySelector(".FAQ_placeHolder"),
                a = [].concat(_toConsumableArray(e));
            "false" === $(".show-more-faqs").attr("up") ? (t.innerHTML = "", a.slice(0, 3).map(function (e) {
                e.answer = e.answer.replace(/\n/g, "<br/>"), t.innerHTML += '\n            <div class="single-faq">\n                <div class="faq-ques">' + e.question + '</div>\n                <div class="faq-ans">' + e.answer + "</div>\n          </div>\n            "
            }), document.querySelector(".show-more-faqs").innerHTML = 'Read all FAQs<span><img src="/img/arrow.png"></span>') : (t.innerHTML = "", a.slice(0, a.length).map(function (e) {
                e.answer = e.answer.replace(/\n/g, "<br/>"), t.innerHTML += '\n            <div class="single-faq">\n                <div class="faq-ques">' + e.question + '</div>\n                <div class="faq-ans">' + e.answer + "</div>\n            </div>\n            "
            }), document.querySelector(".show-more-faqs").innerHTML = 'show less<span><img class="rota" src="/img/arrow.png"></span>')
        }
    }, {
        key: "renderBenefitCaraousel",
        value: function () {
            var e = document.querySelector(".slider-banners");
            $(".cycle-slideshow").html(""), this.APIData.program_details.banner_urls.map(function (t, a) {
                return e.innerHTML += '\n        <img data-text="" style="width:100%;" src=' + t + ' style = "opacity: 0" alt="">'
            }), $(".slider-banners").cycle({
                slides: ">img",
                fx: "scrollHorz",
                timeout: 3e3,
                swipe: !0,
                "pause-on-hover": "true"
            })
        }
    }]), e
}();
fn_ll = {
    getterLS: function (e) {
        return null !== localStorage.getItem(e) && void 0 !== localStorage.getItem(e) ? localStorage.getItem(e) : ""
    },
    getterSS: function (e) {
        return null !== sessionStorage.getItem(e) && void 0 !== sessionStorage.getItem(e) ? sessionStorage.getItem(e) : ""
    },
    loyalty_plan_name: "Licious Meatopia",
    loyalty_expired_plan: "",
    loyalty_selected_plan: "",
    loyalty_list: "",
    loyalty_cart_value: "",
    loyalty_delivery_charges: "",
    loyalty_saved_amount: "",
    loyalty_total_items: "",
    loyalty_copy_obj: {},
    notify_me_ana_obj: {
        city: "",
        hub_id: "",
        category_name: "",
        product_name: "",
        product_id: "",
        price: "",
        discount: "",
        user_type: "",
        total_orders: "",
        email_id: "",
        product_url: "",
        product_image_url: "",
        incoming_source: ""
    },
    populateNotifyMeData: function (e) {
        fn_ll.notify_me_ana_obj.city = fn_ll.getCityFromLS(), fn_ll.notify_me_ana_obj.hub_id = fn_ll.getHubFromLS(), fn_ll.notify_me_ana_obj.user_type = fn_ll.getUserTypeFromLS(), fn_ll.notify_me_ana_obj.total_orders = fn_ll.getTotalOrdersFromLS(), fn_ll.notify_me_ana_obj.email_id = fn_ll.getEmailFromLS(), fn_ll.notify_me_ana_obj.category_name = e.category_name, fn_ll.notify_me_ana_obj.product_name = e.product_name, fn_ll.notify_me_ana_obj.product_id = e.product_id, fn_ll.notify_me_ana_obj.price = e.price, fn_ll.notify_me_ana_obj.discount = e.discount, fn_ll.notify_me_ana_obj.product_url = e.product_url, fn_ll.notify_me_ana_obj.product_image_url = e.product_image_url, fn_ll.notify_me_ana_obj.incoming_source = e.incoming_source
    },
    checkElementInViewPort: function (e) {
        var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
            a = e.getBoundingClientRect(),
            o = t ? 90 : 0;
        return "" !== e.innerHTML.trim() && a.top - o >= 0 && a.left >= 0 && a.right <= (window.innerWidth || document.documentElement.clientWidth) && a.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    },
    loyalty_banners_obj: {
        city: localStorage.getItem("city_name"),
        hub_id: localStorage.getItem("hub_id"),
        banner_url: "",
        position: "",
        banner_type: "",
        list: "",
        user_type: null !== localStorage.getItem("user_type") ? localStorage.getItem("user_type") : "",
        logged_in: "",
        total_orders: null !== localStorage.getItem("total_orders") ? localStorage.getItem("total_orders") : "",
        member_status: "",
        pr_totalsavedvalue: "",
        pr_totalorders: ""
    },
    loyalty_landing_obj: {
        name: "",
        city: "",
        hub_id: "",
        total_plans: "",
        list: "",
        member_status: "",
        recommended_plan: "",
        user_type: "",
        logged_in: "",
        total_orders: ""
    },
    loyalty_cart_obj: {
        cart_value: "",
        delivery_charge: "",
        total_items: "",
        saved_amount: ""
    },
    qc_obj: {
        city: null !== localStorage.getItem("city_name") ? localStorage.getItem("city_name") : "",
        hub_id: null !== localStorage.getItem("hub_id") ? localStorage.getItem("hub_id") : "",
        user_type: null !== localStorage.getItem("user_type") ? localStorage.getItem("user_type") : "",
        total_orders: null !== localStorage.getItem("total_orders") ? localStorage.getItem("total_orders") : ""
    },
    populateCartData: function (e) {
        var t = e.products.length + e.exotic.length;
        fn_ll.loyalty_cart_obj.cart_value = e.cart_subtotal.toString(), fn_ll.loyalty_cart_obj.delivery_charge = e.shipping.toString(), fn_ll.loyalty_cart_obj.total_items = t.toString(), fn_ll.loyalty_cart_obj.saved_amount = e.loyalty_delivery_discount ? e.loyalty_delivery_discount.toString() : "0"
    },
    populateLoyaltyBannerData: function (e) {
        fn_ll.loyalty_landing_obj.name = fn_ll.loyalty_plan_name, fn_ll.loyalty_banners_obj.banner_type = fn_ll.getLoyaltyBannerMemberType(e).bannerType, fn_ll.loyalty_banners_obj.logged_in = fn_ll.getLoginStatus(), fn_ll.loyalty_banners_obj.member_status = fn_ll.getLoyaltyBannerMemberType(e).memberType, fn_ll.loyalty_banners_obj.pr_totalsavedvalue = fn_ll.getSavingAndOrderCount(e).saved_value, fn_ll.loyalty_banners_obj.pr_totalorders = fn_ll.getSavingAndOrderCount(e).total_orders, fn_ll.loyalty_landing_obj.member_status = fn_ll.getLoyaltyBannerMemberType(e).memberType, fn_ll.loyalty_expired_plan = fn_ll.getExpiredPlanName(e)
    },
    getExpiredPlanName: function (e) {
        var t = "";
        return t = null !== e.subscribed ? e.subscribed.plan_name + ", " + e.subscribed.strike_price + ", " + e.subscribed.actual_price : "", t.toString()
    },
    populateLoyaltyLandingData: function (e) {
        fn_ll.loyalty_landing_obj.name = fn_ll.loyalty_plan_name, fn_ll.loyalty_landing_obj.city = fn_ll.getCityFromLS(), fn_ll.loyalty_landing_obj.hub_id = fn_ll.getHubFromLS(), fn_ll.loyalty_landing_obj.total_plans = e.sub_programs.length.toString(), fn_ll.loyalty_landing_obj.user_type = fn_ll.getUserTypeFromLS(), fn_ll.loyalty_landing_obj.logged_in = fn_ll.getLoginStatus(), fn_ll.loyalty_landing_obj.recommended_plan = fn_ll.getRecommendedPlan(e), fn_ll.loyalty_landing_obj.total_orders = fn_ll.getTotalOrdersFromLS()
    },
    getRecommendedPlan: function (e) {
        var t = "";
        if (Array.isArray(e.sub_programs) && e.sub_programs.length > 0) {
            var a = e.sub_programs[0];
            t = a.name + ", " + (a.price - a.discounted_price <= 0 ? "0" : " " + a.price) + ",  " + a.discounted_price
        }
        var o = e.sub_programs.filter(function (e) {
            return e.is_recommended === !0
        });
        if (o.length) {
            t = o[0].id.toString();
            var a = o[0];
            t = a.name + ", " + (a.price - a.discounted_price <= 0 ? "0" : " " + a.price) + ",  " + a.discounted_price
        }
        return t.toString()
    },
    getSavedAndOrders: function (e) {
        var t = 0,
            a = 0;
        return null !== e && void 0 !== e && (t = e.order_count, a = e.total_saving), {
            order_count: t,
            total_saving: a
        }
    },
    getCityFromLS: function () {
        return null !== localStorage.getItem("city_name") && void 0 !== localStorage.getItem("city_name") ? localStorage.getItem("city_name") : ""
    },
    getEmailFromLS: function () {
        return null !== localStorage.getItem("user_email") && void 0 !== localStorage.getItem("user_email") ? localStorage.getItem("user_email") : ""
    },
    getHubFromLS: function () {
        return null !== localStorage.getItem("hub_id") && void 0 !== localStorage.getItem("hub_id") ? localStorage.getItem("hub_id") : ""
    },
    getUserTypeFromLS: function () {
        return null !== localStorage.getItem("user_type") && void 0 !== localStorage.getItem("user_type") ? localStorage.getItem("user_type") : "visitor"
    },
    getTotalOrdersFromLS: function () {
        return null !== localStorage.getItem("total_orders") && void 0 !== localStorage.getItem("total_orders") ? localStorage.getItem("total_orders") : ""
    },
    getLoginStatus: function () {
        var e = $(".customer_key_value.master").val();
        return void 0 != e ? "true" : "false"
    },
    getMemberStatus: function () {
        return null !== $("#member_status").val() && void 0 !== $("#member_status").val() && "" !== $("#member_status").val() ? $("#member_status").val() : "non_member"
    },
    getPaytmBalance: function () {
        return null !== localStorage.getItem("paytm_amt") && void 0 !== localStorage.getItem("paytm_amt") ? localStorage.getItem("paytm_amt") : ""
    },
    getMemberDataForUserProfile: function () {
        var e = fn_ll.getMemberStatus(),
            t = e.split(","),
            a = "",
            o = "",
            s = "";
        return "undefined" != typeof t && t.length > 0 && ("3" === t.length.toString() ? (a = t[0], o = t[1], s = t[2]) : a = t[0]), {
            member_status: a,
            start_date: o,
            end_date: s
        }
    },
    getSavingAndOrderCount: function (e) {
        var t = "0",
            a = "0";
        return null !== e && void 0 !== e && null !== e.subscribed && void 0 !== e.subscribed && (t = e.subscribed.order_count.toString(), a = e.subscribed.total_saving.toString()), {
            saved_value: t,
            total_orders: a
        }
    },
    getLoyaltyBannerMemberType: function (e) {
        var t = "",
            a = "";
        return null !== e.non_subscribed && void 0 !== e.non_subscribed && Object.keys(e.non_subscribed).length > 0 ? (t = "loyalty_nonmember", a = "non-member") : fn_ll.validateLoyaltyExpiry(e) ? (t = "loyalty_renew", a = "expired") : (t = "loyalty_active", a = "active"), {
            bannerType: t,
            memberType: a
        }
    },
    validateLoyaltyExpiry: function (e) {
        var t = !1,
            a = "";
        return null !== e && void 0 !== e && null !== e.subscribed && void 0 !== e.subscribed && null !== e.subscribed.is_expired && void 0 !== e.subscribed.is_expired && (t = e.subscribed.is_expired, a = e.subscribed.plan_name + ", " + e.subscribed.strike_price + ", " + e.subscribed.actual_price), localStorage.setItem("loyalty_expired_plan", a), t
    },
    sendAnalyticsData: function (e, t) {
        var a = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
            o = {};
        switch (null !== t.source && void 0 !== t.source || (t.source = "website"), e) {
            case "notify_productOOS":
                o = Object.assign({}, t);
                break;
            case "selectplan_loyaltycart":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "changeplan_loyaltycart":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "modifyplan_loyaltycart":
                delete fn_ll.loyalty_landing_obj.selected_plan, o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "view_loyaltyhome":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "selectplan_loyaltyhome":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "readfaq_loyaltyhome":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "readtnc_loyaltyhome":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "get_loyalty":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "purchase_loyalty":
                o = _extends({}, t);
                break;
            case "retrypurchase_loyalty":
                o = _extends({}, t);
                break;
            case "member_activated":
                o = _extends({}, t);
                break;
            case "modifyplan_loyalty":
                delete fn_ll.loyalty_landing_obj.selected_plan, o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "changeplan_loyalty":
                o = Object.assign(fn_ll.loyalty_landing_obj, t);
                break;
            case "removeplan_loyaltyslot":
                o = _extends({}, t);
                break;
            case "removeplan_loyaltycart":
                o = _extends({}, t);
                break;
            case "Banner":
                o = _extends({}, t);
            case "cartbanner":
                o = _extends({}, fn_ll.loyalty_banners_obj, t);
            case "member_activatedcart":
                o = Object.assign({}, t);
            case "renewplan_loyalty":
                fn_ll.loyalty_copy_obj = fn_ll.loyalty_banners_obj, delete fn_ll.loyalty_copy_obj.banner_url, delete fn_ll.loyalty_copy_obj.position, o = _extends({}, fn_ll.loyalty_copy_obj, t);
                break;
            case "confirmrenew_loyalty":
                o = _extends({}, fn_ll.loyalty_landing_obj, t);
                break;
            case "BRANCH_ERR":
            case "BRANCH_CHARGED_EVENT":
                o = Object.assign({}, t);
                break;
            case "fav_items_visited":
            case "past_order_visited":
                o = _extends({}, fn_ll.qc_obj, t);
                break;
            default:
                o = Object.assign({}, t)
        }
        a || clevertap.event.push(e, o), ga("send", {
            hitType: "event",
            eventCategory: t.source,
            eventAction: e,
            eventLabel: JSON.stringify(o)
        })
    }
};
var page_no = 0,
    last_page = 5,
    last_scroll_pos = 0,
    param = "homepage_widget",
    PastOrderFunctions = function () {
        function e() {
            _classCallCheck(this, e), this.past_order_data = {}
        }
        return _createClass(e, [{
            key: "getReorderDetails",
            value: function () {
                return new Promise(function (e, t) {
                    fn_home.ajaxForm({}, "GET", "/reorder/get-reorder-details").done(function (t) {
                        var a = JSON.parse(t);
                        if (200 === a.statusCode) {
                            e(a);
                            var o = "";
                            Array.isArray(a.data) && a.data.length && (a.data.map(function (e) {
                                var t = "favourite_items" === e.type ? "favourite-items" : "past-orders";
                                o += "<a href = '/" + t + "?src=" + param + '\'>\n                                  <div class="fav-items" id=' + t + '>\n                                    <img class="icon" src="' + e.icon + '">\n                                    <div class="text-container">\n                                      <span class="header-text"> ' + e.header_text + '</span>\n                                      <span class="placeholder-text">' + e.place_holder_text + '</span>\n                                    </div>\n                                    <img class="right-arrow" src="/img/down-arrow.png">\n                                  </div> \n                                </a>'
                            }), document.querySelector(".reorder-placeholder").innerHTML = '<div class="reorder-details">' + o + "</div>")
                        }
                    }).fail(function () {
                        t("failed")
                    })
                })
            }
        }, {
            key: "getPastOrders",
            value: function () {
                var e = this,
                    t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return new Promise(function (a, o) {
                    0 == t && fn_main.showloader(), fn_home.ajaxForm({
                        page: t
                    }, "GET", "/reorder/get-past-orders").done(function (o) {
                        try {
                            var s = JSON.parse(o);
                            200 === s.statusCode && ! function () {
                                var a = "",
                                    o = "",
                                    r = "";
                                last_page = s.data.page_count, document.querySelector(".header-text-container").innerHTML = '<div class="header-title-desc">\n                                                                          <div class="header-text">' + s.data.info_title + '</div>\n                                                                          <div class="total-orders" id="total-orders-hide">(' + s.data.info_badge + ')</div>\n                                                                        </div>\n                                                                        <div class="header-desc">\n                                                                          <div class="description">' + s.data.info_message + '</div>\n                                                                          <div class="total-orders">(' + s.data.info_badge + ")</div>\n                                                                        </div>", Array.isArray(s.data.orders) && s.data.orders.length > 0 && s.data.orders.map(function (t) {
                                    var s = t.status.replace(/\s+/g, "-").toLowerCase();
                                    s = "rejected" !== s && "delivered" !== s ? "in-progress" : s, a = '<div class="order-details">\n                                        <div class="order-placed-details">\n                                          <div class="order-placed-date">Order placed: ' + fn_main.formatDateandTime(t.created_at).day.toUpperCase() + '</div>\n                                          <div class="order-placed-time hide}">Time: ' + fn_main.formatDateandTime(t.created_at).time.toLowerCase() + '</div>\n                                        </div>\n                                        <div class="order-shipment-details">\n                                          <div class="order-id hide}">Shipment ID: ' + t.shipment_id + '</div>\n                                          <div class="order-process hide">\n                                              <img class="tick" src="/img/past-order-' + s + '.png">\n                                              <span class="order-process-text ' + s + '">' + t.status + "</span>\n                                          </div>\n                                        </div>\n                                      </div>";
                                    var n = "notify_me" === t.button_type.toLowerCase(),
                                        i = fn_home.validateCookieForProduct(t.shipment_id);
                                    e.productPayload(t, n);
                                    var l = !t.availability && "repeat_order" == t.button_type,
                                        d = e.renderProductsList(t.products, t.shipment_id, n, l),
                                        c = '<div class="reorder-btn"',
                                        u = '<div class="reorder-btn disabled"',
                                        p = '<div class="notify-me-btn"',
                                        m = '<div class="notify-me-btn notified"';
                                    o = '<div class="bottom-div">\n                              ' + (n || l ? "" : '<img class="scooter-img" src="/img/express_delivery.svg">') + '\n                              <div class="availability-text ' + (n || l ? i ? "notified" : "oos" : "") + '">' + (i && (n || l) ? fn_home.getNotifiedMsg() : t.slot_message) + "</div>\n                              " + (n ? i ? m : p : l ? u : c) + ' data-ship-id="' + t.shipment_id + '">' + (n ? i ? '<img src="/img/tick_symbol.svg" class="alarm">' : '<img src="/img/alarm.svg" class="alarm">' : "") + t.button_text + "</div>\n                            </div>", d = '<div class="product-details">' + (d + o) + "</div>", r += '<div class="order-tile" data-ship-id="' + t.shipment_id + '">' + (a + d) + "</div>"
                                }), t > 0 ? ($(".order-section").append(r), $(".header-text-container").addClass("squeezed"), $(".header-text-container").find(".header-desc").hide(), $(".header-text-container").find("#total-orders-hide").show()) : document.querySelector(".order-section").innerHTML = r, $(".order-section").find(".cart-btn-add").unbind("click"), $(".order-section").find(".cart-btn-delete").unbind("click"), $(".reorder-btn").unbind("click"), $(".notify-me-btn").unbind("click"), $(".cta .confirm").unbind("click"), $(".cta .cancel").unbind("click"), $(".order-section").find(".cart-btn-add").on("click", function (t) {
                                    t.stopImmediatePropagation();
                                    var a = t.target;
                                    e.modifyProductQuantity.call(e, a, "add")
                                }), $(".order-section").find(".cart-btn-delete").on("click", function (t) {
                                    t.stopImmediatePropagation();
                                    var a = t.target;
                                    e.modifyProductQuantity.call(e, a, "delete")
                                }), $(".reorder-btn").on("click", function (t) {
                                    t.stopImmediatePropagation();
                                    var a = t.target;
                                    e.repeatOrder.call(e, a)
                                }), $(".notify-me-btn").on("click", function (t) {
                                    t.stopImmediatePropagation();
                                    var a = t.target;
                                    e.notifyOrder.call(e, a)
                                }), $(".cta .confirm").on("click", function (t) {
                                    t.stopImmediatePropagation();
                                    var a = t.target;
                                    "" !== a.getAttribute("data-ship-id") && void 0 !== a.getAttribute("data-ship-id") && null !== a.getAttribute("data-ship-id") && (fn_main.showloader(), t.stopPropagation(), $(".li-alert-screen").removeClass("show"), fn_main.clearCart().then(function () {
                                        $(".profile-cart").find(".new-cart-count").removeClass("loaded"), e.repeatOrder.call(e, a)
                                    }))
                                }), $(".cta .cancel").on("click", function (e) {
                                    e.stopImmediatePropagation();
                                    var t = e.target.getAttribute("data-action");
                                    $(".li-alert-screen").removeClass("show"), "repeat-order" === t && fn_cart.miniCart()
                                })
                            }(), a(s)
                        } catch (r) {
                            console.log(r), fn_main.hideloader(), Materialize.toast("Something went wrong. please try refreshing the page", 4e3)
                        }
                    }).fail(function () {
                        o("failed")
                    }).always(function () {
                        fn_main.hideloader()
                    })
                })
            }
        }, {
            key: "getDiscountedPrice",
            value: function (e) {
                return e.product_pricing.base_price - Math.round(e.product_pricing.base_price * e.product_pricing.base_discount / 100)
            }
        }, {
            key: "getAvailableQty",
            value: function (e) {
                var t = e.product_inventory,
                    a = t.available_qt,
                    o = t.pre_ordered_quantity,
                    s = t.stock_units;
                return a ? a : o > s ? s : o
            }
        }, {
            key: "renderProductsList",
            value: function (e, t, a, o) {
                var s = this,
                    r = "";
                if (Array.isArray(e) && e.length > 0) return e.map(function (e) {
                    var n = s.getDiscountedPrice(e),
                        i = e.product_inventory.stock_units <= 0 && !a,
                        l = e.product_inventory.pre_ordered_quantity > e.product_inventory.stock_units && e.product_inventory.stock_units > 0,
                        d = !(i || a || o);
                    r += '\n                      <div class="single-product' + (i && !o ? " unavailable" : l ? " reduce-qty" : "") + '">\n                        <div class="unavailability-text' + (i && !o ? " show" : l ? " reduce-qty" : "") + '">' + e.product_inventory.unavailable_msg + '</div>\n                        <img class="product-image" src="' + e.product_merchantdising.pr_image + '" data-prod-url="/' + e.product_master.cat_slug + "/" + e.product_master.slug + '">\n                        <div class="product-desc">\n                          <div class="product-name" data-cat-name="' + e.product_master.cat_slug + '">' + e.product_master.pr_name + '</div>\n                          <div class="product-price">\n                            <div class="product-wt">' + ("Unit" !== e.product_master.uom ? e.product_master.pr_weight : e.product_master.pr_weight + " Pieces") + '</div>\n                            <div class="separator"></div>\n                            <div class="product-disc-price" data-base-price="' + e.product_pricing.base_price + '" data-discount="' + (e.product_pricing.base_price - n) + '" >₹' + n + '</div>\n                            <div class="product-actual-price">' + (e.product_pricing.base_price - n > 0 ? "₹" + e.product_pricing.base_price : "") + '</div>\n                          </div>\n                        </div>\n                        <div class="product-qty" data-product-id="' + e.product_master.product_id + '" data-count="' + s.getAvailableQty(e) + '" data-stock-units="' + e.product_inventory.stock_units + '" data-preordered-qt="' + e.product_inventory.pre_ordered_quantity + '" data-shipment-id="' + t + '">\n                          ' + (d ? '<div class="cart-btn-delete' + (1 === e.product_inventory.pre_ordered_quantity ? " disabled" : "") + '">-</div>\n                          <span class="product-count"> ' + s.getAvailableQty(e) + ' </span>\n                          <div class="cart-btn-add ' + (e.product_inventory.pre_ordered_quantity >= e.product_inventory.stock_units ? " disabled" : "") + '">+</div>' : '<div class="qty-text">Qty: ' + e.product_inventory.pre_ordered_quantity + "</div>") + "\n                        </div>\n                      </div>\n                    "
                }), r
            }
        }, {
            key: "productPayload",
            value: function (e, t) {
                var a = this;
                this.past_order_data[e.shipment_id] = [], e.products.map(function (o) {
                    t ? a.past_order_data[e.shipment_id].push({
                        customer_key: $(".customer_key_value").attr("data-custkey"),
                        phone_no: parseInt($(".user_mobile").val()),
                        hub_id: parseInt($(".hubId_main").val()),
                        product_id: o.product_master.product_id
                    }) : 0 !== o.product_inventory.stock_units && a.past_order_data[e.shipment_id].push({
                        product_id: o.product_master.product_id,
                        quantity: a.getAvailableQty(o)
                    })
                })
            }
        }, {
            key: "modifyProductPayload",
            value: function (e, t, a) {
                for (var o = this.past_order_data, s = 0; s < o[e].length; s++)
                    if (o[e][s].product_id === t) {
                        "add" === a ? o[e][s].quantity += 1 : o[e][s].quantity -= 1, this.past_order_data = o;
                        break
                    }
            }
        }, {
            key: "modifyProductQuantity",
            value: function (e, t) {
                var a = e.parentElement.getAttribute("data-shipment-id"),
                    o = e.parentElement.getAttribute("data-product-id"),
                    s = parseInt(e.parentElement.getAttribute("data-stock-units")),
                    r = parseInt(e.parentElement.getAttribute("data-count"));
                "add" === t ? r < s ? (r += 1, e.parentElement.querySelector(".product-count").innerHTML = r, e.parentElement.setAttribute("data-count", r), this.modifyProductPayload(a, o, t), e.parentElement.firstElementChild.classList.remove("disabled"), r === s && e.classList.add("disabled")) : Materialize.toast("Only " + s + " unit" + (s > 1 ? "s " : " ") + "left", 3e3) : r > 1 && (r -= 1, e.parentElement.querySelector(".product-count").innerHTML = r, e.parentElement.setAttribute("data-count", r), this.modifyProductPayload(a, o, t), e.parentElement.lastElementChild.classList.remove("disabled"), 1 === r && e.classList.add("disabled"))
            }
        }, {
            key: "repeatOrder",
            value: function (e) {
                var t = this,
                    a = e.getAttribute("data-ship-id"),
                    o = this.past_order_data[a];
                return fn_main.showloader(), new Promise(function (e, s) {
                    fn_home.ajaxForm({
                        products: o,
                        flow_key: 0
                    }, "POST", "/reorder/update-cart-reorder").done(function (o) {
                        var s = JSON.parse(o);
                        if ("success" === s.status.toLowerCase()) {
                            if (s.hasOwnProperty("button_content")) {
                                var r = s.info_msg + "text-separator" + s.title_msg + "text-separator" + a;
                                fn_checkout.alertBox(r, "", "repeat-order")
                            } else fn_home.quickCheckout(), t.addtoCartEvent(s);
                            e(s)
                        } else 400 === s.responseCode && "error" === s.status && (fn_checkout.alertBox(s.message, "", "oos"), $(".quick-checkout").removeClass("fade-in"))
                    }).fail(function () {
                        s("failed")
                    }).always(function () {
                        fn_main.hideloader()
                    })
                })
            }
        }, {
            key: "notifyOrder",
            value: function (e) {
                var t = e.getAttribute("data-ship-id"),
                    a = {
                        customers: this.past_order_data[t]
                    };
                fn_home.setNotification("", a, e, !1)
            }
        }, {
            key: "handlePagination",
            value: function () {
                var e = this,
                    t = $(document).scrollTop();
                t > last_scroll_pos && $(window).scrollTop() >= $(".order-section").offset().top + $(".order-section").outerHeight() - window.innerHeight && (page_no++, page_no < last_page && ($(".order-section").append('<div class="search-loader-div"><img src="/img/qc-loader.gif" class="search-loader"></div>'), $(window).unbind("scroll"), this.getPastOrders(page_no).then(function () {
                    $(".order-section").find(".search-loader-div").remove(), $("html, body").animate({
                        scrollTop: "+=150"
                    }, 400), $(window).on("scroll", function () {
                        fn_main.throttle(e.handlePagination(), 3e3)
                    })
                })))
            }
        }, {
            key: "addtoCartEvent",
            value: function (e) {
                var t = "past_order",
                    a = (e.total, fn_ll.getCityFromLS(), fn_ll.getHubFromLS(), ""),
                    o = "";
                e.product.map(function (s, r) {
                    var n = r != e.product.length - 1 ? "," : "";
                    a += s.product_name + n, o += s.quantity + n;
                    var i = {
                        "Product ID": s.product_id,
                        "Product Name": s.product_name,
                        Price: Number(s.base_price),
                        Quantity: Number(s.quantity),
                        incoming_source: t,
                        "Category ID": s.category_id,
                        Checkout_Flow: "quick_checkout"
                    };
                    clevertap.event.push("Added to Cart", i), fn_home.sendBranchEvent("add_to_cart", s)
                })
            }
        }]), e
    }(),
    FavouriteItems = function () {
        function e() {
            _classCallCheck(this, e)
        }
        return _createClass(e, [{
            key: "getFavouriteItems",
            value: function () {
                var e = this,
                    t = arguments.length <= 0 || void 0 === arguments[0] ? "onPageLoad" : arguments[0];
                fn_main.showloader();
                var a = {};
                "onPageLoad" !== t && (a = {
                    filter: t
                }), fn_home.ajaxForm(a, "GET", "/get-fav-items").done(function (a) {
                    try {
                        var o = JSON.parse(a);
                        if (fn_main.hideloader(), 200 === o.statusCode && o.data.products.length > 0) {
                            $(".filters-div").html(""), o.data.filters.map(function (e) {
                                var a = "";
                                a = e.type === t || "onPageLoad" === t && e.is_default ? '<div class="filter selected" data-type="' + e.type + '">' + e.title + "</div>" : e.is_enabled ? '<div class="filter" data-type="' + e.type + '">' + e.title + "</div>" : '<div>\n                          <div class="filter disabled" data-type="' + e.type + '">' + e.title + '</div>\n                          <span class="disabled-msg">' + e.disabled_msg + "</span>\n                      </div>", $(".filters-div").append(a)
                            }), $(".filter").click(function (t) {
                                e.getFavouriteItems(t.target.dataset.type)
                            }), $(".fav-item-count").html("(" + (1 === o.data.products.length ? "1 item" : o.data.products.length + " items") + ")"), $(".deals.product-list  .item-slider").html(""), o.data.products.length > 9 ? $(".fav-view-btn").html("View all").attr("data-action", "all").show() : $(".fav-view-btn").hide(), $.each(o.data.products, function (e, t) {
                                var a = (t.product_pricing.base_discount + " %OFF", t.product_pricing.base_discount > 0 ? "show" : "hide"),
                                    o = "favorite_items",
                                    s = t.product_master.cat_slug,
                                    r = fn_home.renderActionButtonandClusterMessage(t, o, "favourites-notify-me", e),
                                    n = r.actionButton,
                                    i = r.productMessageDiv,
                                    l = t.product_merchantdising.recommended ? '<div class="recommended-label">RECOMMENDED</div>' : "",
                                    d = '<a  href="/' + t.product_master.cat_slug + "/" + t.product_master.slug + '"  data-text="' + t.product_merchantdising.merchandise_name + '" data-index="' + e + '">',
                                    c = e > 8 ? "hide-prod" : "",
                                    u = d + ('<div class="favourites-page-card card ' + c + '" data-prod="' + t.product_master.product_id + '" data-cat="' + t.product_master.cat_slug + '">') + '<div class="item-img"><img src="' + t.product_merchantdising.pr_image + '" alt="" class="product-image">' + l + '<div class="item-details">' + fn_home.getItemName(t.product_merchantdising.merchandise_name) + fn_home.getProductWeightDetails(t, s) + '<div class="item-action"><div class="rate">' + fn_home.getMrpText(a, t) + '</div><div class="action"><div class="action-slider">' + n + "<p>" + fn_home.getPlusandMinusButtons(t, o, e) + ("</p></p></div></div></div></div></div>" + i + "</a>");
                                $(".deals.product-list  .item-slider").append(u)
                            }), fn_home.bindNotifyMeButton(".favourites-notify-me")
                        }
                        $(".favourites-page-card").on("click", function (e) {
                            var t = $(this).data("cat");
                            void 0 != t && null != t && "" != t && "undefined" != t && "null" != t || (e.preventDefault(), e.stopImmediatePropogation())
                        }), fn_home.getCart(), fn_home.addcart("favourites", o.data.title), fn_home.removecart("favourites")
                    } catch (s) {
                        console.log(s), fn_main.hideloader(), Materialize.toast("Something went wrong. please try refreshing the page", 4e3)
                    }
                }).fail(function () {
                    fn_main.hideloader(), Materialize.toast("Something went wrong. please try refreshing the page", 4e3)
                })
            }
        }]), e
    }();
SearchObject = {
    timerId: "",
    outOfStock: !1,
    pageNo: 1,
    noOfResults: 0,
    productIndex: 0,
    debounce: function (e, t) {
        clearTimeout(SearchObject.timerId), SearchObject.timerId = setTimeout(e, t)
    },
    makeSearchAPICall: function () {
        var e = encodeURIComponent($(".search-input").val()),
            t = $(".search-input").val();
        $(".initial-search-loader").show(), fn_home.ajaxForm({}, "GET", "/search/fetch-search-results?queryString=" + e + "&pageNo=1&perPage=22").done(function (e) {
            var a = JSON.parse(e),
                o = {
                    city: localStorage.getItem("city_name"),
                    hub: localStorage.getItem("hub_id"),
                    user_type: localStorage.getItem("user_type"),
                    customer_key: $(".customer_key").val(),
                    page_name: "search_page",
                    search_string: "",
                    no_of_results: "0"
                };
            if ("" !== $(".search-input").val() && $(".search-input").val().length > 2 && $(".search-input").val() === t) {
                if ($(".initial-search-loader").hide(), o.search_string = $(".search-input").val(), a.status && a.searchEntities && a.searchEntities.length) {
                    o.no_of_results = a.numOfRecords, SearchObject.noOfResults = a.numOfRecords;
                    var s = SearchObject.populateSectionTitle(a.searchEntities.length, "Search Results") + '\n                          <div class="search-result-body">\n                            ' + SearchObject.populateSearchResults(a.searchEntities) + "\n                          </div>";
                    $(".search-results").html(s), fn_home && fn_home.getAllDOMImages(), $(".explore-category-section").hide(), $(".search-results").show(), $(".body-content").css("overflow-y", "hidden"), $(".search-result-body").css("overflow-y", "scroll"), SearchObject.outOfStock && fn_home.bindNotifyMeButton(".search-notify-me"), SearchObject.loadMoreOnScrollEnd(), SearchObject.bindProductOnClick(), fn_home.getCart(), fn_home.addcart("search_result", "Search Page"), fn_home.removecart("search_result")
                } else SearchObject.renderNoProductFoundIllustration(), $(".search-results").show(), $(".explore-category-section").show(), $(".search-result-body").css("overflow-y", "hidden"), $(".body-content").css("overflow-y", "scroll");
                clevertap.event.push("search_triggered", o)
            }
        }).fail(function () {
            SearchObject.timerId || $(".initial-search-loader").hide()
        }).always(function () {
            SearchObject.timerId || $(".initial-search-loader").hide()
        })
    },
    loadMoreOnScrollEnd: function () {
        var e = !0;
        $(".search-result-body").on("scroll", function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight && e) {
                SearchObject.pageNo += 1, e = !1, $(".search-loader-div").length || $(".search-result-body").append('<div class="search-loader-div"><img src="/img/qc-loader.gif" class="search-loader"></div>');
                var t = encodeURIComponent($(".search-input").val());
                fn_home.ajaxForm({}, "GET", "/search/fetch-search-results?queryString=" + t + "&pageNo=" + SearchObject.pageNo + "&perPage=22").done(function (t) {
                    var a = JSON.parse(t);
                    a.status && a.searchEntities && a.searchEntities.length ? ($(".search-loader-div").remove(),
                        SearchObject.outOfStock = !1, $(".search-result-body").append(SearchObject.populateSearchResults(a.searchEntities)), fn_home && fn_home.getAllDOMImages(), SearchObject.bindProductOnClick(), fn_home.getCart(), $(".addCartBtn-home").unbind("click"), $(".add-one").unbind("click"), $(".remove-one").unbind("click"), SearchObject.outOfStock && fn_home.bindNotifyMeButton(".search-notify-me"), fn_home.addcart("search_result", "Search Page"), fn_home.removecart("search_result")) : ($(".search-loader-div").html('<div class="search-end"></div>'), $(".search-result-body").unbind("scroll")), e = !0
                }).fail(function () {}).always(function () {})
            }
        })
    },
    bindProductOnClick: function () {
        $(".product-click-container").unbind("click"), $(".product-click-container").on("click", function (e) {
            var t = {
                search_string: $(".search-input").val(),
                no_of_results: String(SearchObject.noOfResults),
                item_postion: String($(this).data("position")),
                product_name: $(this).data("text"),
                product_id: $(this).parent().data("prod"),
                city: localStorage.getItem("city_name"),
                hub: localStorage.getItem("hub_id"),
                user_type: localStorage.getItem("user_type"),
                customer_key: $(".customer_key").val(),
                page_name: "Search Page"
            };
            clevertap.event.push("search_result_clicked", t), window.location.href = $(this).data("url"), $(".search-input").val(""), console.log("clicked")
        })
    },
    renderNoProductFoundIllustration: function () {
        var e = SearchObject.populateSectionTitle(0, "Search Results") + '\n                      <div class="search-result-body">\n                        <div class="no-prod-found-container">\n                          <img class="no-prod-found-illustration" data-lazy="/img/no_prod_found_illustration.svg">\n                          <div class="no-prod-found-message">Oops, we couldn’t find any search results</div>\n                          <div class="no-prod-found-suggestion">\n                            Try refining your search or explore from the below suggestions\n                          </div>\n                        </div>\n                      </div>';
        $(".search-results").html(e), fn_home && fn_home.getAllDOMImages()
    },
    populateExploreCategorySection: function () {
        fn_home.ajaxForm({}, "POST", "/home_page/get-explore-home").done(function (e) {
            if (e = JSON.parse(e), "success" == e.status) {
                var t = " " + SearchObject.populateSectionTitle(e.data.length, e.title) + '\n                          <div class="s-exp-categories">\n                            ' + SearchObject.populateCategoryList(e.data) + "\n                          </div>";
                $(".explore-category-section").html(t)
            } else $(".explore-category-section").hide();
            fn_home && fn_home.getAllDOMImages()
        }).always(function () {})
    },
    populateSectionTitle: function (e, t) {
        var a = '<div class="section-header">\n                            <span class="section-title">' + t + '</span>\n                            <span class="count">' + (e > 20 ? "20+" : e) + "</span>\n                          </div>";
        return a
    },
    populateCategoryList: function (e) {
        var t = "";
        return e.length > 10 ? e.length % 8 === 0 || e.length % 8 === 7 ? noOfCatPerRow = 8 : e.length % 7 === 0 || e.length % 7 === 6 ? noOfCatPerRow = 7 : noOfCatPerRow = 6 : e.length % 5 === 0 ? noOfCatPerRow = 5 : e.length % 4 === 0 ? noOfCatPerRow = 4 : noOfCatPerRow = 3, $.each(e, function (e, a) {
            t += (e % noOfCatPerRow === 0 ? '<ul class="categories">' : "") + '\n                    <li>\n                      <a href="/' + a.slug + '" class="enabled">\n                        <img class="cat-icon" data-lazy="' + a.web_icon + '" icon-active="' + a.web_icon_active + '">\n                        ' + a.cat_name + "\n                      </a>\n                    </li>\n                  " + ((e + 1) % noOfCatPerRow === 0 ? "</ul>" : "") + "\n                  "
        }), t
    },
    populateSearchResults: function (e) {
        var t = "";
        return $.each(e, function (e, a) {
            try {
                var o = '<div class="product-click-container"  data-url="/' + a.categoryDetails.slug + "/" + a.item_slug + '"  \n                              data-text="' + a.merchandise_name + '" data-position="' + (SearchObject.productIndex + 1) + '">',
                    s = a.productPricing.base_discount > 0,
                    r = "",
                    n = "",
                    i = a.productMerchantdising.is_combo,
                    l = "";
                a.productInventory.stock_units > 0 ? 2 === a.productInventory.slot_available ? (l = "hide", r = '<button class="add-to-cart addCartBtn-home disabled" data-cat = "' + a.categoryDetails.slug + '" \n                                    data-amt="' + SearchObject.discountedPrice(a.productPricing.base_price, a.productPricing.base_discount) + '"\n                                    data-text="' + a.merchandise_name + '" data-index="' + SearchObject.productIndex + '"\n                                    data-prid="' + a.item_id + '" data-qty="' + a.productInventory.stock_units + '">\n                              Add To Cart\n                            </button>', n = '<div class="product-message oos">\n                                  ' + a.productInventory.slot_custom_message + "\n                                </div>") : (r = '<button class="add-to-cart addCartBtn-home" data-cat = "' + a.categoryDetails.slug + '" \n                                    data-amt="' + SearchObject.discountedPrice(a.productPricing.base_price, a.productPricing.base_discount) + '"\n                                    data-text="' + a.merchandise_name + '" data-index="' + SearchObject.productIndex + '"\n                                    data-prid="' + a.item_id + '" data-qty="' + a.productInventory.stock_units + '">\n                              Add To Cart\n                            </button>', n = '<div class="product-message no-message"></div>') : (l = "hide", fn_home.validateCookieForProduct(a.item_id) ? (r = '<button type="button" data-pr-id="' + a.item_id + '"\n                                    class="search-notify-me notify-me notified">\n                              <img data-lazy="/img/tick_symbol.svg" class="alarm"/>\n                              <span class="notify-me-text">NOTIFY ME</span>\n                            </button>', n = '<div class="product-message notified">\n                                  ' + (localStorage.getItem("notified-msg") ? localStorage.getItem("notified-msg") : "Once available, you will be notified") + "\n                                </div>") : (SearchObject.outOfStock = !0, r = '<button type="button" data-price="' + a.productPricing.base_price + '"\n                                    data-discount="' + SearchObject.discountedPrice(a.productPricing.base_price, a.productPricing.base_discount) + '"\n                                    data-cat="' + a.categoryDetails.slug + '" data-pr-id="' + a.item_id + '"\n                                    class="search-notify-me notify-me">\n                              <img data-lazy="/img/alarm.svg" class="alarm"/>\n                              <span class="notify-me-text">NOTIFY ME</span>\n                            </button>', n = '<div class="product-message oos">\n                                  ' + (a.productInventory.next_available_by ? a.productInventory.next_available_by : "Out of Stock") + "\n                                </div>"));
                var d = "";
                d = a.productInventory.product_delivery_type && "express" === a.productInventory.product_delivery_type.toLowerCase() || a.productInventory.live_inventory_at_source ? "/img/express_delivery.svg" : "/img/scheduled_delivery.svg", productCard = ' <div class="search-item" data-prod="' + a.item_id + '">\n                            ' + o + '\n                              <div class="product-card">\n                                <img class="product-img" data-lazy="' + a.item_image + '" alt="">\n                                <div class="product-info">\n                                  <div class="product-name-description">\n                                    ' + a.merchandise_name + " \n                                    " + (a.productMerchantdising.no_of_piceces && "N/A" !== a.productMerchantdising.no_of_piceces && "Unit" !== a.uom ? " | " + a.productMerchantdising.no_of_piceces + " pieces" : "") + '\n                                  </div>\n                                  <div class="weight-price-action">\n                                    <div class="weight-price">\n                                      <span class="weight">' + (i ? '<span style="font-weight: bold">COMBO</span>' : a.pr_weight + ("Unit" === a.uom ? " pieces" : "")) + '</span>\n                                      <div class="weight-price-separator"></div>\n                                      <div class="price">\n                                        ' + SearchObject.getMRPText(s, a.productPricing) + '\n                                      </div>\n                                    </div>\n                                    <div class="del-icon-action">\n                                      <img class="del-icon ' + l + '" data-lazy=' + d + '>\n                                      <div class="action">\n                                        <div class="action-slider">\n                                          ' + r + '\n                                          <p>\n                                            <span class = "cart-btns remove-one"data-cat = "' + a.categoryDetails.slug + '" \n                                                  data-prid="' + a.item_id + '" data-qty="' + a.productInventory.stock_units + '" \n                                                  data-amt="' + SearchObject.discountedPrice(a.productPricing.base_price, a.productPricing.base_discount) + '" \n                                                  data-index="' + SearchObject.productIndex + '" data-text="' + a.merchandise_name + '">\n                                            </span>\n                                            <span class = "item-qty">0</span>\n                                            <span class = "cart-btns add-one ' + (2 === a.productInventory.slot_available ? "disabled" : "") + '"\n                                                  data-cat = "' + a.categoryDetails.slug + '" \n                                                  data-prid="' + a.item_id + '" data-qty="' + a.productInventory.stock_units + '" \n                                                  data-amt="' + SearchObject.discountedPrice(a.productPricing.base_price, a.productPricing.base_discount) + '" \n                                                  data-index="' + SearchObject.productIndex + '" data-text="' + a.merchandise_name + '">\n                                            </span>\n                                          </p>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                              </div>\n                            </div>\n                            ' + n + "\n                          </div>\n                      ", t += productCard, SearchObject.productIndex++
            } catch (c) {
                console.log(c)
            }
        }), t
    },
    getMRPText: function (e, t) {
        var a = "";
        return a = e ? '<span class="selling-price">&#8377;' + SearchObject.discountedPrice(t.base_price, t.base_discount) + '</span>\n               <span class="marked-price">&#8377;' + t.base_price + "</span>" : '<span class="selling-price">&#8377;' + t.base_price + "</span>"
    },
    discountedPrice: function (e, t) {
        return Math.round(e - e * t / 100)
    }
};